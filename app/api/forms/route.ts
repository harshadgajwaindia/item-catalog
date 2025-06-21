// app/api/forms/route.ts

import prisma from '@/lib/prisma';
import cloudinary from '@/lib/cloudinary';
import { NextRequest } from 'next/server';

export async function GET() {
  const forms = await prisma.form.findMany({
    orderBy: { createdAt: 'desc' }, // optional: latest first
  });
  return Response.json(forms);
}

// your existing POST logic remains unchanged below
export async function POST(req: NextRequest) {
  const formData = await req.formData();

  const name = formData.get('name') as string;
  const type = formData.get('type') as string;
  const description = formData.get('description') as string;
  const coverImageBlob = formData.get('coverImage') as Blob;
  const additionalImagesBlobs = formData.getAll('additionalImages') as Blob[];

  const bufferFromBlob = async (blob: Blob): Promise<Buffer> => {
    const arrayBuffer = await blob.arrayBuffer();
    return Buffer.from(arrayBuffer);
  };

  const uploadToCloudinary = (buffer: Buffer, folder: string): Promise<any> => {
    return new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { folder, resource_type: 'auto' },
        (error, result) => {
          if (error) return reject(error);
          resolve(result);
        }
      );
      stream.end(buffer);
    });
  };

  const coverImageBuffer = await bufferFromBlob(coverImageBlob);
  const coverImageUpload = await uploadToCloudinary(coverImageBuffer, 'my-app');

  const additionalImageUrls: string[] = [];
  for (const blob of additionalImagesBlobs) {
    const buffer = await bufferFromBlob(blob);
    const upload = await uploadToCloudinary(buffer, 'my-app');
    additionalImageUrls.push(upload.secure_url);
  }

  const newForm = await prisma.form.create({
    data: {
      name,
      type,
      description,
      coverImage: coverImageUpload.secure_url,
      additionalImages: additionalImageUrls,
    },
  });

  return Response.json({ message: 'Item successfully added', form: newForm });
}

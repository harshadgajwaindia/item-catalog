import prisma from "@/lib/prisma";
import { Mail } from "lucide-react";
import { notFound } from "next/navigation";
import { Key } from "react";

interface Props {
  params: { id: string };
}

export default async function FormDetailPage({ params }: Props) {
  const form = await prisma.form.findUnique({
    where: { id: params.id },
  });

  if (!form) return notFound();

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-xl shadow-md mt-10">
      <h1 className="text-3xl font-bold text-indigo-700 mb-2">{form.name}</h1>
      {form.additionalImages.length > 0 && (
        <>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
            {form.additionalImages.map(
              (url: string | Blob | undefined, idx: Key | null | undefined) => (
                <img
                  key={idx}
                  src={url}
                  className="w-full h-40 object-cover rounded-lg shadow-sm"
                />
              )
            )}
          </div>
        </>
      )}
      <p className="text-md text-gray-500 mb-1">
        <span className="font-medium text-gray-700">Type:</span> {form.type}
      </p>
      <p className="text-gray-700 mb-6 leading-relaxed">{form.description}</p>

      <button className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-2 rounded-full flex items-center gap-2 hover:scale-105 transition-transform">
        <Mail className="w-4 h-4" />
        Enquire
      </button>
    </div>
  );
}

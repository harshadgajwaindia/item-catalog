"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Eye } from "lucide-react";
import { ViewItemSkeleton } from "@/components/ViewItemsSkeleton";

type Form = {
  id: string;
  name: string;
  coverImage: string;
};

export default function ViewItemsPage() {
  const [forms, setForms] = useState<Form[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchForms() {
      try {
        const res = await fetch("/api/forms");
        const data = await res.json();
        setForms(data);
      } catch (error) {
        console.error("Failed to fetch forms:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchForms();
  }, []);

  return (
    <div className="p-6 max-w-6xl mx-auto">
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <ViewItemSkeleton key={i} />
          ))}
        </div>
      ) : forms.length === 0 ? (
        <p className="text-center text-gray-500 text-lg">No items found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {forms.map((form) => (
            <Link
              key={form.id}
              href={`/viewItems/${form.id}`}
              className="bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition duration-200 overflow-hidden"
            >
              <img
                src={form.coverImage}
                alt={form.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h2 className="text-lg font-semibold text-gray-800 truncate">
                  {form.name}
                </h2>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

"use client";

import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Plus } from "lucide-react";

export default function AddItemPage() {
  const [form, setForm] = useState<{
    name: string;
    type: string;
    description: string;
    coverImage: File | null;
    additionalImages: File[];
  }>({
    name: "",
    type: "",
    description: "",
    coverImage: null,
    additionalImages: [],
  });

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("name", form.name);
      formData.append("type", form.type);
      formData.append("description", form.description);

      if (form.coverImage) {
        formData.append("coverImage", form.coverImage);
      }

      form.additionalImages.forEach((img) =>
        formData.append("additionalImages", img)
      );

      const res = await fetch("/api/forms", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      toast.success(data.message);
    } catch (err) {
      toast.error("Failed to submit item");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto bg-white rounded-lg shadow-md mt-6">
      <ToastContainer position="top-right" autoClose={3000} />
      <h1 className="text-2xl font-bold flex items-center gap-2 text-indigo-700">
        <Plus className="w-5 h-5" /> Add New Item
      </h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-6 mt-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Item Name:
          </label>
          <input
            type="text"
            placeholder="Item Name"
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder-gray-500 text-base"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Item Type:
          </label>
          <select
            onChange={(e) => setForm({ ...form, type: e.target.value })}
            required
            className={`w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-base ${
              form.type === "" ? "text-gray-500" : "text-gray-900"
            }`}
          >
            <option disabled hidden>
              Select
            </option>
            <option value="Shirt">Shirt</option>
            <option value="Pant">Pant</option>
            <option value="Shoes">Shoes</option>
            <option value="Sports Gear">Sports Gear</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description:
          </label>
          <textarea
            placeholder="Enter item details..."
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            required
            rows={4}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder-gray-500 text-base"
          />
        </div>

        <div>
          <label className="w-full flex items-center px-4 py-2 bg-white text-gray-500 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition">
            <span>Select Cover Image</span>
            <input
              type="file"
              accept="image/*"
              required
              onChange={(e) =>
                setForm({ ...form, coverImage: e.target.files?.[0] || null })
              }
              className="hidden"
            />
          </label>
        </div>

        <div>
          <label className="w-full flex items-center px-4 py-2 bg-white text-gray-500 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition">
            <span>Select Additional Images</span>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={(e) =>
                setForm({
                  ...form,
                  additionalImages: Array.from(e.target.files || []),
                })
              }
              className="hidden"
            />
          </label>
        </div>

        <button
          type="submit"
          className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition disabled:opacity-50"
          disabled={loading}
        >
          {loading ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
}

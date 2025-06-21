import './globals.css';
import Link from 'next/link';
import { Plus, Eye } from 'lucide-react';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gradient-to-br from-indigo-100 via-violet-100 to-indigo-200 text-gray-900 font-sans">
        {/* Header */}
        <header className="bg-gradient-to-r from-indigo-700 via-purple-600 to-pink-500 shadow-lg top-0 z-50">
          <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
            <Link
              href="/"
              className="text-2xl font-bold text-white tracking-tight hover:opacity-90 transition duration-200"
            >
              Item Catalog
            </Link>
            <nav className="flex gap-4">
              <Link
                href="/addItem"
                className="flex items-center gap-2 px-4 py-2 bg-white text-indigo-700 font-medium rounded-full shadow-sm hover:bg-indigo-50 transition"
              >
                <Plus className="w-4 h-4" />
                Add Item
              </Link>
              <Link
                href="/viewItems"
                className="flex items-center gap-2 px-4 py-2 bg-white text-violet-700 font-medium rounded-full shadow-sm hover:bg-violet-50 transition"
              >
                <Eye className="w-4 h-4" />
                View Items
              </Link>
            </nav>
          </div>
        </header>

       <main className="min-h-screen bg-gradient-to-br from-indigo-50 to-pink-50 px-4 py-8">
  {children}
</main>

      </body>
    </html>
  );
}

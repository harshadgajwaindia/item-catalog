export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center px-4">
      <h2 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 text-transparent bg-clip-text animate-fade-in mb-4">
        Welcome to Item Catalog ✨
      </h2>
      <p className="text-gray-700 text-lg mb-8 max-w-xl">
        Upload and showcase items like shirts, shoes, or gear. Manage your catalog with ease using our smooth interface.
      </p>
     
    </div>
  );
}

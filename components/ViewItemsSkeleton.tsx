export function ViewItemSkeleton() {
  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden animate-pulse">
      <div className="h-48 bg-gray-200" />
      <div className="p-4">
        <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
      </div>
    </div>
  );
}
"use client";

export function SkeletonCard() {
  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-sm animate-pulse">
      <div className="h-40 bg-turtle-gray" />
      <div className="p-3 space-y-2">
        <div className="h-4 bg-turtle-gray rounded w-3/4" />
        <div className="h-3 bg-turtle-gray rounded w-1/2" />
        <div className="h-3 bg-turtle-gray rounded w-2/3" />
        <div className="h-3 bg-turtle-gray rounded w-1/3" />
      </div>
    </div>
  );
}

export function SkeletonText({ width = "full" }: { width?: string }) {
  return (
    <div
      className={`h-4 bg-turtle-gray rounded animate-pulse`}
      style={{ width }}
    />
  );
}

export function SkeletonRestaurantGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {Array.from({ length: 6 }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  );
}

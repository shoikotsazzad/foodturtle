"use client";

import { Star } from "lucide-react";

interface RatingStarsProps {
  rating: number;
  count?: number;
  size?: "sm" | "md";
}

export default function RatingStars({ rating, count, size = "sm" }: RatingStarsProps) {
  const starSize = size === "sm" ? 12 : 16;
  return (
    <span className="inline-flex items-center gap-0.5">
      <Star
        size={starSize}
        className="fill-turtle-yellow text-turtle-yellow"
      />
      <span className={`font-semibold text-turtle-dark ${size === "sm" ? "text-xs" : "text-sm"}`}>
        {rating.toFixed(1)}
      </span>
      {count !== undefined && (
        <span className={`text-turtle-gray-2 ${size === "sm" ? "text-xs" : "text-sm"}`}>
          ({count > 500 ? "500+" : count})
        </span>
      )}
    </span>
  );
}

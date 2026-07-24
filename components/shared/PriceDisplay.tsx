"use client";

interface PriceDisplayProps {
  price: number;
  originalPrice?: number;
  prefix?: string;
  size?: "sm" | "md" | "lg";
}

export default function PriceDisplay({
  price,
  originalPrice,
  prefix = "Tk",
  size = "md",
}: PriceDisplayProps) {
  const sizeClass =
    size === "sm" ? "text-xs" : size === "lg" ? "text-lg" : "text-sm";

  return (
    <span className="inline-flex items-baseline gap-1.5">
      <span className={`font-bold text-turtle-pink ${sizeClass}`}>
        {prefix} {price}
      </span>
      {originalPrice && originalPrice > price && (
        <s className={`text-turtle-gray-2 ${size === "sm" ? "text-xs" : "text-xs"}`}>
          {prefix} {originalPrice}
        </s>
      )}
    </span>
  );
}

"use client";

import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

const CUISINES = [
  { image: "https://images.unsplash.com/photo-1642821373181-696a54913e93?w=200&q=75", labelKey: "cuisine_biryani" as const, value: "Biryani" },
  { image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=200&q=75", labelKey: "cuisine_pizza" as const, value: "Pizza" },
  { image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=200&q=75", labelKey: "cuisine_burger" as const, value: "Burger" },
  { image: "https://images.unsplash.com/photo-1631292784640-2b24be784d5d?w=200&q=75", labelKey: "cuisine_kacchi" as const, value: "Kacchi" },
  { image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=200&q=75", labelKey: "cuisine_fuchka" as const, value: "Fuchka" },
  { image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=200&q=75", labelKey: "cuisine_bangladeshi" as const, value: "Bangladeshi" },
  { image: "https://images.unsplash.com/photo-1552566626-52f8b828add9?w=200&q=75", labelKey: "cuisine_fast_food" as const, value: "Fast Food" },
  { image: "https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?w=200&q=75", labelKey: "cuisine_kebab" as const, value: "Kebab" },
  { image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=200&q=75", labelKey: "cuisine_bakery" as const, value: "Bakery" },
  { image: "https://images.unsplash.com/photo-1551024506-0bccd828d307?w=200&q=75", labelKey: "cuisine_dessert" as const, value: "Dessert" },
  { image: "https://images.unsplash.com/photo-1509785307050-d4066910ec1e?w=200&q=75", labelKey: "cuisine_cafe" as const, value: "Cafe" },
  { image: "https://images.unsplash.com/photo-1585032226651-759b368d7246?w=200&q=75", labelKey: "cuisine_chinese" as const, value: "Chinese" },
];

interface CuisineGridProps {
  onFilter: (cuisine: string) => void;
  active: string;
}

export default function CuisineGrid({ onFilter, active }: CuisineGridProps) {
  const { t } = useLanguage();
  const scrollerRef = useRef<HTMLDivElement>(null);

  const scrollBy = (dir: 1 | -1) => {
    scrollerRef.current?.scrollBy({ left: dir * 320, behavior: "smooth" });
  };

  return (
    <section className="mb-6 relative">
      <h2 className="text-lg font-bold text-turtle-dark mb-3">
        {t("section_favourite_cuisines")}
      </h2>

      <div className="relative">
        <button
          onClick={() => scrollBy(-1)}
          aria-label="Scroll left"
          className="flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-3 z-10 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white border border-gray-200 shadow items-center justify-center hover:bg-turtle-gray transition-colors"
        >
          <ChevronLeft size={16} className="text-turtle-dark" />
        </button>
        <button
          onClick={() => scrollBy(1)}
          aria-label="Scroll right"
          className="flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-3 z-10 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white border border-gray-200 shadow items-center justify-center hover:bg-turtle-gray transition-colors"
        >
          <ChevronRight size={16} className="text-turtle-dark" />
        </button>

        <div ref={scrollerRef} className="flex gap-5 overflow-x-auto scrollbar-hide pb-1 scroll-smooth snap-x snap-proximity">
          {CUISINES.map(({ image, labelKey, value }) => (
            <button
              key={value}
              onClick={() => onFilter(active === value ? "" : value)}
              className="flex flex-col items-center gap-2 shrink-0 group snap-start"
            >
              <div
                className={`w-28 h-28 rounded-2xl overflow-hidden border-2 transition-colors ${
                  active === value ? "border-turtle-pink" : "border-transparent"
                }`}
              >
                <img src={image} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
              </div>
              <span
                className={`text-sm font-medium whitespace-nowrap ${
                  active === value ? "text-turtle-pink font-semibold" : "text-turtle-dark"
                }`}
              >
                {t(labelKey)}
              </span>
            </button>
          ))}
          <div className="w-1 shrink-0" aria-hidden />
        </div>
      </div>
    </section>
  );
}

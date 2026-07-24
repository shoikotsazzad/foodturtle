"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export interface FilterState {
  sort: "relevance" | "fastest" | "distance" | "top_rated";
  ratings4Plus: boolean;
  acceptsVouchers: boolean;
  cuisines: string[];
  maxPrice: number;
}

interface FilterControlsProps {
  filters: FilterState;
  onChange: (f: FilterState) => void;
}

const CUISINES = [
  "American", "Asian", "Bakery", "Bangladeshi", "Bengali", "Beverage",
  "Biryani", "Breakfast", "Burgers", "Cafe", "Cakes", "Chicken",
  "Chinese", "Chotpoti & Fuchka", "Curry", "Dessert", "Doi", "Dumpling",
  "Faluda", "Fast Food", "Fish", "Fried Chicken", "Healthy", "Ice Cream",
  "Indian", "Italian", "Japanese", "Juice Corner", "Kashmiri", "Kebab",
  "Price Match", "Korean", "Lebanese", "Meat", "Mediterranean", "Mexican",
  "Middle Eastern", "Noodles", "Pasta", "Pizza", "Rice Dishes", "Sandwiches",
  "Seafood", "Shawarma", "Snacks", "Soups", "Steak", "Sushi", "Sweets",
  "Thai", "Turkish", "Vegetarian", "Western", "Wraps",
];

export function FilterControls({ filters, onChange }: FilterControlsProps) {
  const { t } = useLanguage();
  const [showAllCuisines, setShowAllCuisines] = useState(false);
  const [cuisineSearch, setCuisineSearch] = useState("");

  const displayedCuisines = CUISINES.filter((c) =>
    c.toLowerCase().includes(cuisineSearch.toLowerCase())
  );
  const visibleCuisines = showAllCuisines ? displayedCuisines : displayedCuisines.slice(0, 8);

  const toggleCuisine = (c: string) => {
    const next = filters.cuisines.includes(c)
      ? filters.cuisines.filter((x) => x !== c)
      : [...filters.cuisines, c];
    onChange({ ...filters, cuisines: next });
  };

  return (
    <div className="space-y-5">
      {/* Sort by */}
      <div>
        <p className="text-sm font-bold text-turtle-dark mb-2">{t("filter_sort_by")}</p>
        <div className="space-y-1.5">
          {(["relevance", "fastest", "distance", "top_rated"] as const).map((val) => (
            <label key={val} className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="sort"
                value={val}
                checked={filters.sort === val}
                onChange={() => onChange({ ...filters, sort: val })}
                className="accent-turtle-pink"
              />
              <span className="text-sm text-turtle-dark">
                {t(`filter_sort_${val}` as any)}
              </span>
            </label>
          ))}
        </div>
      </div>

      <hr className="border-gray-100" />

      {/* Quick filters */}
      <div>
        <p className="text-sm font-bold text-turtle-dark mb-2">{t("filter_quick")}</p>
        <button
          onClick={() => onChange({ ...filters, ratings4Plus: !filters.ratings4Plus })}
          className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${
            filters.ratings4Plus
              ? "bg-turtle-pink text-white border-turtle-pink"
              : "border-gray-200 text-turtle-dark hover:border-turtle-pink"
          }`}
        >
          {t("filter_ratings")}
        </button>
      </div>

      <hr className="border-gray-100" />

      {/* Offers */}
      <div>
        <p className="text-sm font-bold text-turtle-dark mb-2">{t("filter_offers")}</p>
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={filters.acceptsVouchers}
            onChange={() => onChange({ ...filters, acceptsVouchers: !filters.acceptsVouchers })}
            className="accent-turtle-pink"
          />
          <span className="text-sm text-turtle-dark">{t("filter_vouchers")}</span>
        </label>
      </div>

      <hr className="border-gray-100" />

      {/* Cuisines */}
      <div>
        <p className="text-sm font-bold text-turtle-dark mb-2">{t("filter_cuisines")}</p>
        <div className="relative mb-2">
          <Search size={13} className="absolute left-2.5 top-2.5 text-turtle-gray-2" />
          <input
            type="text"
            value={cuisineSearch}
            onChange={(e) => setCuisineSearch(e.target.value)}
            placeholder={t("filter_search_cuisines")}
            className="w-full pl-7 pr-3 py-2 text-xs border border-gray-200 rounded-lg focus:outline-none focus:border-turtle-pink"
          />
        </div>
        <div className="space-y-1.5">
          {visibleCuisines.map((c) => (
            <label key={c} className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={filters.cuisines.includes(c)}
                onChange={() => toggleCuisine(c)}
                className="accent-turtle-pink"
              />
              <span className="text-sm text-turtle-dark">{c}</span>
            </label>
          ))}
        </div>
        {displayedCuisines.length > 8 && (
          <button
            onClick={() => setShowAllCuisines(!showAllCuisines)}
            className="mt-2 text-xs text-turtle-pink font-medium hover:underline"
          >
            {showAllCuisines ? t("filter_show_less") : t("filter_show_more")} ▾
          </button>
        )}
      </div>

      <hr className="border-gray-100" />

      {/* Price slider */}
      <div>
        <p className="text-sm font-bold text-turtle-dark mb-2">{t("filter_price")}</p>
        <input
          type="range"
          min={0}
          max={2000}
          value={filters.maxPrice}
          onChange={(e) => onChange({ ...filters, maxPrice: Number(e.target.value) })}
          className="w-full"
        />
        <div className="flex justify-between text-xs text-turtle-gray-2 mt-1">
          <span>Tk 0</span>
          <span>Tk {filters.maxPrice === 2000 ? "2000+" : filters.maxPrice}</span>
        </div>
      </div>
    </div>
  );
}

export default function Sidebar({ filters, onChange }: FilterControlsProps) {
  return (
    <aside className="w-56 shrink-0 sticky top-[7rem] h-[calc(100vh-7rem)] overflow-y-auto pb-6 scrollbar-hide">
      <FilterControls filters={filters} onChange={onChange} />
    </aside>
  );
}

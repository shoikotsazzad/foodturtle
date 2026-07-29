"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";
import { Restaurant } from "@/types";
import { FilterState } from "@/components/layout/Sidebar";
import RestaurantCard from "./RestaurantCard";
import { SkeletonRestaurantGrid } from "@/components/shared/LoadingSkeleton";

interface RestaurantGridProps {
  restaurants: Restaurant[];
  loading: boolean;
  filters: FilterState;
  cuisineFilter: string;
  showWalkTime?: boolean;
}

function RestaurantGridInner({
  restaurants,
  loading,
  filters,
  cuisineFilter,
  showWalkTime,
}: RestaurantGridProps) {
  const { t } = useLanguage();
  const search = useSearchParams().get("q") ?? "";

  if (loading) return <SkeletonRestaurantGrid />;

  let filtered = restaurants.filter((r) => r.is_active);

  if (search) {
    const q = search.toLowerCase();
    filtered = filtered.filter(
      (r) =>
        r.name_en.toLowerCase().includes(q) ||
        r.name_bn.includes(search) ||
        r.cuisine_en.some((c) => c.toLowerCase().includes(q))
    );
  }

  if (cuisineFilter) {
    filtered = filtered.filter((r) =>
      r.cuisine_en.some((c) => c.toLowerCase().includes(cuisineFilter.toLowerCase()))
    );
  }

  if (filters.cuisines.length > 0) {
    filtered = filtered.filter((r) =>
      filters.cuisines.some((fc) =>
        r.cuisine_en.some((rc) => rc.toLowerCase().includes(fc.toLowerCase()))
      )
    );
  }

  if (filters.ratings4Plus) {
    filtered = filtered.filter((r) => r.rating >= 4);
  }

  if (filters.maxPrice < 2000) {
    filtered = filtered.filter((r) => r.min_order <= filters.maxPrice);
  }

  if (filters.sort === "fastest") {
    filtered = [...filtered].sort((a, b) => a.delivery_time_min - b.delivery_time_min);
  } else if (filters.sort === "distance") {
    filtered = [...filtered].sort((a, b) => a.distance_km - b.distance_km);
  } else if (filters.sort === "top_rated") {
    filtered = [...filtered].sort((a, b) => b.rating - a.rating);
  }

  if (filtered.length === 0) {
    return (
      <div className="text-center py-16">
        <img src="/logo.png" alt="Food Turtle" className="w-16 h-16 object-contain mb-4 opacity-60 mx-auto" />
        <p className="text-turtle-dark font-semibold">{t("no_restaurants_found")}</p>
        <p className="text-sm text-turtle-gray-2 mt-1">{t("no_restaurants_found_subtitle")}</p>
      </div>
    );
  }

  return (
    <section>
      <h2 className="text-lg font-bold text-turtle-dark mb-3">
        {t("section_all_restaurants")}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((r) => (
          <RestaurantCard key={r.id} restaurant={r} showWalkTime={showWalkTime} />
        ))}
      </div>
    </section>
  );
}

export default function RestaurantGrid(props: RestaurantGridProps) {
  return (
    <Suspense fallback={<SkeletonRestaurantGrid />}>
      <RestaurantGridInner {...props} />
    </Suspense>
  );
}

"use client";

import { useLanguage } from "@/context/LanguageContext";
import { Restaurant } from "@/types";
import RestaurantCard from "./RestaurantCard";
import { SkeletonCard } from "@/components/shared/LoadingSkeleton";

interface PopularForGroupsProps {
  restaurants: Restaurant[];
  loading?: boolean;
}

export default function PopularForGroups({ restaurants, loading }: PopularForGroupsProps) {
  const { t } = useLanguage();

  const popular = [...restaurants]
    .sort((a, b) => b.review_count - a.review_count)
    .slice(0, 8);

  if (loading) {
    return (
      <section className="mb-6">
        <h2 className="text-lg font-bold text-turtle-dark mb-3">
          {t("section_popular_groups")}
        </h2>
        <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-1">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="w-52 shrink-0">
              <SkeletonCard />
            </div>
          ))}
        </div>
      </section>
    );
  }

  if (popular.length === 0) return null;

  return (
    <section className="mb-6">
      <h2 className="text-lg font-bold text-turtle-dark mb-3">
        {t("section_popular_groups")}
      </h2>
      <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-1">
        {popular.map((r) => (
          <div key={r.id} className="w-52 shrink-0">
            <RestaurantCard restaurant={r} compact />
          </div>
        ))}
      </div>
    </section>
  );
}

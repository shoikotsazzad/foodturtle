"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Sidebar, { FilterState } from "@/components/layout/Sidebar";
import MobileFilterSheet from "@/components/layout/MobileFilterSheet";
import RestaurantGrid from "@/components/home/RestaurantGrid";
import CuisineGrid from "@/components/home/CuisineGrid";
import CartBottomBar from "@/components/cart/CartBottomBar";
import PageTitle from "@/components/shared/PageTitle";
import { useRestaurants } from "@/lib/hooks";
import { useLanguage } from "@/context/LanguageContext";

const RestaurantMapModal = dynamic(() => import("@/components/pickup/RestaurantMapModal"), { ssr: false });

const DEFAULT_FILTERS: FilterState = {
  sort: "relevance",
  ratings4Plus: false,
  acceptsVouchers: false,
  cuisines: [],
  maxPrice: 2000,
};

export default function PickupPage() {
  const { t } = useLanguage();
  const { restaurants, loading } = useRestaurants();
  const [filters, setFilters] = useState<FilterState>(DEFAULT_FILTERS);
  const [cuisineFilter, setCuisineFilter] = useState("");
  const [showMap, setShowMap] = useState(false);

  return (
    <>
      <PageTitle title="Food Turtle · Pick-up" />
      <Navbar />
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-6 pb-20 sm:pb-6">
        <div className="flex gap-6">
          <div className="hidden lg:block">
            <Sidebar filters={filters} onChange={setFilters} />
          </div>
          <div className="flex-1 min-w-0">
            {/* Hero map */}
            <div className="relative overflow-hidden rounded-2xl mb-6 bg-gradient-to-br from-blue-50 to-green-50 border border-gray-100 h-48">
              <svg className="absolute inset-0 w-full h-full opacity-20" viewBox="0 0 600 200">
                <rect x="0" y="80" width="600" height="6" fill="#aaa" />
                <rect x="0" y="140" width="600" height="4" fill="#aaa" />
                <rect x="60" y="0" width="6" height="200" fill="#aaa" />
                <rect x="200" y="0" width="6" height="200" fill="#aaa" />
                <rect x="350" y="0" width="4" height="200" fill="#aaa" />
                <rect x="480" y="0" width="4" height="200" fill="#aaa" />
                <rect x="10" y="10" width="40" height="60" rx="3" fill="#d1d5db" />
                <rect x="75" y="10" width="115" height="60" rx="3" fill="#d1d5db" />
                <rect x="215" y="10" width="125" height="60" rx="3" fill="#d1d5db" />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <div className="text-4xl mb-2">📍</div>
                <h2 className="text-lg font-bold text-turtle-dark">{t("pickup_explore")}</h2>
                <button
                  onClick={() => setShowMap(true)}
                  className="mt-2 bg-turtle-pink text-white text-sm px-4 py-1.5 rounded-full font-medium hover:bg-turtle-pink-light transition-colors"
                >
                  {t("pickup_show_map")}
                </button>
              </div>
            </div>

            <div className="lg:hidden">
              <MobileFilterSheet filters={filters} onChange={setFilters} />
            </div>

            <CuisineGrid onFilter={setCuisineFilter} active={cuisineFilter} />
            <RestaurantGrid
              restaurants={restaurants}
              loading={loading}
              filters={filters}
              cuisineFilter={cuisineFilter}
              showWalkTime
            />
          </div>
        </div>
      </main>
      <Footer />
      <CartBottomBar />
      {showMap && <RestaurantMapModal restaurants={restaurants} onClose={() => setShowMap(false)} />}
    </>
  );
}

"use client";

import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Sidebar, { FilterState } from "@/components/layout/Sidebar";
import MobileFilterSheet from "@/components/layout/MobileFilterSheet";
import HeroBanner from "@/components/home/HeroBanner";
import PromoBanner from "@/components/home/PromoBanner";
import CuisineGrid from "@/components/home/CuisineGrid";
import PopularForGroups from "@/components/home/PopularForGroups";
import RestaurantGrid from "@/components/home/RestaurantGrid";
import CartBottomBar from "@/components/cart/CartBottomBar";
import PageTitle from "@/components/shared/PageTitle";
import { useRestaurants } from "@/lib/hooks";

const DEFAULT_FILTERS: FilterState = {
  sort: "relevance",
  ratings4Plus: false,
  acceptsVouchers: false,
  cuisines: [],
  maxPrice: 2000,
};

export default function HomePage() {
  const { restaurants, loading } = useRestaurants();
  const [filters, setFilters] = useState<FilterState>(DEFAULT_FILTERS);
  const [cuisineFilter, setCuisineFilter] = useState("");

  return (
    <>
      <PageTitle title="Food Turtle · Delivery" />
      <Navbar />
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-6 pb-20 sm:pb-6">
        <div className="flex gap-6">
          {/* Sidebar — desktop only */}
          <div className="hidden lg:block">
            <Sidebar filters={filters} onChange={setFilters} />
          </div>

          {/* Main content */}
          <div className="flex-1 min-w-0">
            <HeroBanner
              onCuisineFilter={setCuisineFilter}
              activeCuisine={cuisineFilter}
            />
            <div className="lg:hidden">
              <MobileFilterSheet filters={filters} onChange={setFilters} />
            </div>
            <PromoBanner restaurants={restaurants} loading={loading} />
            <CuisineGrid onFilter={setCuisineFilter} active={cuisineFilter} />
            <PopularForGroups restaurants={restaurants} loading={loading} />
            <RestaurantGrid
              restaurants={restaurants}
              loading={loading}
              filters={filters}
              cuisineFilter={cuisineFilter}
            />
          </div>
        </div>
      </main>
      <Footer />
      <CartBottomBar />
    </>
  );
}

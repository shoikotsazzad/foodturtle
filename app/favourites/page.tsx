"use client";

import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import RestaurantCard from "@/components/home/RestaurantCard";
import PageTitle from "@/components/shared/PageTitle";
import { useLanguage } from "@/context/LanguageContext";
import { useUser } from "@/context/UserContext";
import { useRestaurants } from "@/lib/hooks";

export default function FavouritesPage() {
  const { t } = useLanguage();
  const { favourites } = useUser();
  const { restaurants } = useRestaurants();

  const favRestaurants = restaurants.filter((r) => favourites.includes(r.id));

  return (
    <>
      <PageTitle title="My Favourites · Food Turtle" />
      <Navbar />
      <main className="max-w-7xl mx-auto w-full px-4 py-6 pb-20 sm:pb-6">
        <h1 className="text-3xl font-bold text-turtle-dark mb-6">{t("favourites_title")}</h1>
        {favRestaurants.length === 0 ? (
          <div className="text-center py-20">
            <img src="/logo.png" alt="Food Turtle" className="w-20 h-20 object-contain mb-4 opacity-60 mx-auto" />
            <h2 className="text-xl font-bold text-turtle-dark mb-2">{t("favourites_empty_title")}</h2>
            <p className="text-sm text-turtle-gray-2 mb-6">{t("favourites_empty_subtitle")}</p>
            <Link
              href="/"
              className="inline-block border-2 border-turtle-pink text-turtle-pink px-6 py-2.5 rounded-full text-sm font-semibold hover:bg-turtle-pink-bg transition-colors"
            >
              {t("favourites_empty_btn")}
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {favRestaurants.map((r) => (
              <RestaurantCard key={r.id} restaurant={r} />
            ))}
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}

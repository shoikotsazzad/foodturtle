"use client";

import Link from "next/link";
import Image from "next/image";
import { Heart, Clock, MapPin, Tag } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { useUser } from "@/context/UserContext";
import { Restaurant } from "@/types";
import RatingStars from "@/components/shared/RatingStars";

interface RestaurantCardProps {
  restaurant: Restaurant;
  compact?: boolean;
  showWalkTime?: boolean;
}

export default function RestaurantCard({ restaurant, compact, showWalkTime }: RestaurantCardProps) {
  const { t, lang } = useLanguage();
  const { toggleFavourite, isFavourite } = useUser();
  const fav = isFavourite(restaurant.id);

  const name = lang === "bn" ? restaurant.name_bn : restaurant.name_en;
  const cuisines = lang === "bn" ? restaurant.cuisine_bn : restaurant.cuisine_en;

  return (
    <Link
      href={`/restaurant/${restaurant.slug}`}
      className={`block bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow group ${
        compact ? "w-full" : ""
      }`}
    >
      {/* Cover image */}
      <div className={`relative overflow-hidden ${compact ? "h-32" : "h-40"} bg-turtle-gray`}>
        {restaurant.cover_image ? (
          <img
            src={restaurant.cover_image}
            alt={name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-turtle-pink-bg to-turtle-gray">
            <span className="text-4xl">🍽️</span>
          </div>
        )}

        {/* Heart */}
        <button
          onClick={(e) => {
            e.preventDefault();
            toggleFavourite(restaurant.id);
          }}
          className="absolute top-2 right-2 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center shadow-sm hover:bg-white transition-colors"
        >
          <Heart
            size={16}
            className={fav ? "fill-turtle-pink text-turtle-pink" : "text-turtle-gray-2"}
          />
        </button>

        {/* Deals badge */}
        {restaurant.deals && restaurant.deals.length > 0 && (
          <div className="absolute bottom-2 left-2">
            <span className="bg-turtle-pink text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
              {restaurant.deals[0]}
            </span>
          </div>
        )}
      </div>

      {/* Info */}
      <div className={`p-3 ${compact ? "p-2.5" : ""}`}>
        <h3 className="font-bold text-turtle-dark text-sm mb-1 truncate">{name}</h3>

        <div className="flex items-center gap-1 mb-1">
          <RatingStars rating={restaurant.rating} count={restaurant.review_count} />
          {cuisines && cuisines.length > 0 && (
            <>
              <span className="text-turtle-gray-2 text-xs">·</span>
              <span className="text-xs text-turtle-gray-2 truncate">
                {cuisines[0]}
              </span>
            </>
          )}
        </div>

        <div className="flex items-center gap-3 text-xs text-turtle-gray-2">
          <span className="flex items-center gap-0.5">
            <Clock size={11} />
            {showWalkTime
              ? `${restaurant.delivery_time_min}-${restaurant.delivery_time_max} min walk`
              : `${restaurant.delivery_time_min}-${restaurant.delivery_time_max} min`}
          </span>
          <span className="flex items-center gap-0.5">
            <MapPin size={11} />
            {restaurant.distance_km} km
          </span>
        </div>

        {!showWalkTime && (
          <p className={`text-xs mt-1 font-medium ${
            restaurant.delivery_fee === 0 ? "text-turtle-green" : "text-turtle-gray-2"
          }`}>
            {restaurant.delivery_fee === 0
              ? t("restaurant_card_free_delivery")
              : `Tk ${restaurant.delivery_fee} delivery`}
          </p>
        )}
      </div>
    </Link>
  );
}

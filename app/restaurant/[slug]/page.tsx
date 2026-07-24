"use client";

import { use, useState, useRef, useEffect } from "react";
import Link from "next/link";
import { Heart, Star, Info, ChevronRight, Search, Plus, Minus, Flame } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import MobileNav from "@/components/layout/MobileNav";
import Footer from "@/components/layout/Footer";
import CartPanel from "@/components/restaurant/CartPanel";
import CartBottomBar from "@/components/cart/CartBottomBar";
import { useRestaurant, useMenuItems } from "@/lib/hooks";
import PageTitle from "@/components/shared/PageTitle";
import { useLanguage } from "@/context/LanguageContext";
import { useUser } from "@/context/UserContext";
import { useCart } from "@/context/CartContext";
import { MenuItem } from "@/types";
import { FAKE_REVIEWS_BY_SLUG } from "@/lib/seed-data";
import { SkeletonCard } from "@/components/shared/LoadingSkeleton";

function MenuItemCard({ item, restaurantSlug, restaurantNameEn, restaurantNameBn }: {
  item: MenuItem;
  restaurantSlug: string;
  restaurantNameEn: string;
  restaurantNameBn: string;
}) {
  const { lang } = useLanguage();
  const { addItem, items, updateQuantity } = useCart();
  const name = lang === "bn" ? item.name_bn : item.name_en;
  const desc = lang === "bn" ? item.description_bn : item.description_en;
  const cartItem = items.find((ci) => ci.id === item.id);
  const qty = cartItem?.quantity ?? 0;

  const handleAdd = () => {
    addItem({
      id: item.id,
      restaurant_id: item.restaurant_id,
      restaurant_slug: restaurantSlug,
      restaurant_name_en: restaurantNameEn,
      restaurant_name_bn: restaurantNameBn,
      name_en: item.name_en,
      name_bn: item.name_bn,
      price: item.price,
      original_price: item.original_price,
      image: item.image,
    });
  };

  return (
    <div className="flex gap-3 bg-white border border-gray-100 rounded-xl p-3 hover:border-turtle-pink/20 transition-colors">
      <div className="flex-1 min-w-0">
        <p className="font-semibold text-turtle-dark text-sm mb-0.5">{name}</p>
        <div className="flex items-baseline gap-1.5 mb-1">
          <span className="text-sm font-bold text-turtle-pink">
            {item.price < item.original_price ? "from " : ""}Tk {item.price}
          </span>
          {item.original_price > item.price && (
            <s className="text-xs text-turtle-gray-2">Tk {item.original_price}</s>
          )}
        </div>
        <p className="text-xs text-turtle-gray-2 line-clamp-2">{desc}</p>
        {item.is_popular && (
          <div className="flex items-center gap-1 mt-1.5">
            <Flame size={11} className="text-orange-500" />
            <span className="text-[10px] font-semibold text-orange-500">Popular</span>
          </div>
        )}
      </div>

      <div className="relative shrink-0">
        {item.image && (
          <img
            src={item.image}
            alt={name}
            className="w-20 h-20 rounded-xl object-cover"
          />
        )}
        {qty > 0 ? (
          <div className="absolute -bottom-1 -right-1 flex items-center gap-1 bg-white rounded-full shadow-md border border-gray-100 p-0.5">
            <button
              onClick={() => updateQuantity(item.id, qty - 1)}
              className="w-6 h-6 rounded-full border border-gray-200 flex items-center justify-center hover:border-turtle-pink"
            >
              <Minus size={10} />
            </button>
            <span className="text-xs font-bold w-4 text-center text-turtle-dark">{qty}</span>
            <button
              onClick={handleAdd}
              className="w-6 h-6 rounded-full bg-turtle-pink text-white flex items-center justify-center"
            >
              <Plus size={10} />
            </button>
          </div>
        ) : (
          <button
            onClick={handleAdd}
            className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-turtle-pink text-white flex items-center justify-center shadow-md hover:bg-turtle-pink-light transition-colors"
          >
            <Plus size={14} />
          </button>
        )}
      </div>
    </div>
  );
}

export default function RestaurantPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const { t, lang } = useLanguage();
  const { restaurant, loading: rLoading } = useRestaurant(slug);
  const { menuItems, loading: mLoading } = useMenuItems(slug);
  const { toggleFavourite, isFavourite } = useUser();
  const [menuSearch, setMenuSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("");

  const name = restaurant ? (lang === "bn" ? restaurant.name_bn : restaurant.name_en) : "";
  const cuisines = restaurant ? (lang === "bn" ? restaurant.cuisine_bn : restaurant.cuisine_en) : [];
  const fav = restaurant ? isFavourite(restaurant.id) : false;
  const pageTitle = name ? `${name} · Food Turtle` : "Food Turtle";

  // Group menu items by category
  const categories = Array.from(new Set(menuItems.map((item) => item.category_en)));
  const popularItems = menuItems.filter((item) => item.is_popular);

  const filteredItems = menuSearch
    ? menuItems.filter((item) =>
        item.name_en.toLowerCase().includes(menuSearch.toLowerCase()) ||
        item.name_bn.includes(menuSearch)
      )
    : menuItems;

  const reviews = FAKE_REVIEWS_BY_SLUG[slug] || [
    { author: "Rafiqul Islam", rating: 5, text: "Amazing food! Always fresh and delivered on time.", date: "1 week ago", is_top_reviewer: true },
    { author: "Nusrat Jahan", rating: 4, text: "Great quality, will order again!", date: "2 weeks ago", is_top_reviewer: false },
    { author: "Kamal Hossain", rating: 5, text: "Best food in the area. Highly recommend!", date: "1 month ago", is_top_reviewer: false },
  ];

  const avgRating = reviews.reduce((s, r) => s + r.rating, 0) / reviews.length;

  if (rLoading) {
    return (
      <>
        <PageTitle title={pageTitle} />
        <Navbar />
        <div className="max-w-7xl mx-auto w-full px-4 py-6">
          <div className="animate-pulse space-y-4">
            <div className="h-6 bg-turtle-gray rounded w-64" />
            <div className="h-48 bg-turtle-gray rounded-xl" />
          </div>
        </div>
      </>
    );
  }

  if (!restaurant) {
    return (
      <>
        <PageTitle title="Restaurant not found · Food Turtle" />
        <Navbar />
        <div className="max-w-7xl mx-auto w-full px-4 py-20 text-center">
          <img src="/logo.png" alt="Food Turtle" className="w-16 h-16 object-contain mb-4 opacity-60 mx-auto" />
          <h1 className="text-xl font-bold text-turtle-dark">{t("restaurant_not_found_title")}</h1>
          <Link href="/" className="mt-4 inline-block text-turtle-pink hover:underline">← Back to home</Link>
        </div>
      </>
    );
  }

  return (
    <>
      <PageTitle title={pageTitle} />
      <Navbar />
      <main className="max-w-7xl mx-auto w-full px-4 py-4 pb-20 sm:pb-4">
        {/* Breadcrumb */}
        <div className="flex items-center gap-1.5 text-xs text-turtle-gray-2 mb-4">
          <Link href="/" className="hover:text-turtle-pink">{t("restaurant_detail_breadcrumb_home")}</Link>
          <ChevronRight size={12} />
          <Link href="/" className="hover:text-turtle-pink">{t("restaurant_detail_breadcrumb_list")}</Link>
          <ChevronRight size={12} />
          <span className="text-turtle-dark font-medium">{name}</span>
        </div>

        {/* Header */}
        <div className="flex gap-4 mb-4">
          <div className="w-24 h-24 rounded-xl overflow-hidden bg-turtle-gray shrink-0">
            {restaurant.logo ? (
              <img src={restaurant.logo} alt={name} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-3xl">🍽️</div>
            )}
          </div>
          <div className="flex-1">
            <p className="text-xs text-turtle-gray-2 mb-1">{cuisines.join(" · ")}</p>
            <h1 className="text-2xl font-bold text-turtle-dark mb-1">{name}</h1>
            <p className="text-sm text-turtle-green font-medium mb-1">
              {t("restaurant_detail_free_delivery")}{" "}
              <s className="text-turtle-gray-2">Tk {restaurant.delivery_fee > 0 ? restaurant.delivery_fee : 62}</s>
              {" · "}
              <span className="text-turtle-gray-2">{t("restaurant_detail_min_order")} {restaurant.min_order}</span>
            </p>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1">
                <Star size={14} className="fill-turtle-yellow text-turtle-yellow" />
                <span className="text-sm font-bold text-turtle-dark">{restaurant.rating}/5</span>
                <button className="text-xs text-turtle-pink hover:underline ml-1">
                  {t("restaurant_detail_see_reviews")}
                </button>
              </div>
              <button className="flex items-center gap-1 text-xs text-turtle-gray-2 hover:text-turtle-dark">
                <Info size={14} />
                {t("restaurant_detail_more_info")}
              </button>
            </div>
          </div>
          <button
            onClick={() => toggleFavourite(restaurant.id)}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-full border text-sm font-medium transition-colors h-fit ${
              fav
                ? "border-turtle-pink text-turtle-pink bg-turtle-pink-bg"
                : "border-gray-200 text-turtle-dark hover:border-turtle-pink"
            }`}
          >
            <Heart size={16} className={fav ? "fill-turtle-pink" : ""} />
            {fav ? t("restaurant_detail_remove_fav") : t("restaurant_detail_add_fav")}
          </button>
        </div>

        {/* Deals strip */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
          <div className="bg-turtle-dark text-white rounded-xl p-3">
            <p className="text-xs font-bold mb-0.5">🏷️ {t("deals_app_only_title")}</p>
            <p className="text-[10px] text-gray-400">{t("deals_app_only_subtitle")}</p>
          </div>
          <div className="bg-turtle-pink-bg border border-turtle-pink/10 rounded-xl p-3">
            <p className="text-xs font-bold text-turtle-pink mb-0.5">🎁 20% off</p>
            <p className="text-[10px] text-turtle-gray-2">{t("deals_discount_title")}</p>
          </div>
          <div className="bg-amber-50 border border-amber-100 rounded-xl p-3">
            <p className="text-xs font-bold text-amber-700 mb-0.5">🎖️ {t("deals_stamp_title")}</p>
            <p className="text-[10px] text-turtle-gray-2">{t("deals_stamp_subtitle")}</p>
          </div>
        </div>

        <div className="flex gap-6">
          {/* Main content */}
          <div className="flex-1 min-w-0">
            {/* Sticky menu tabs */}
            <div className="sticky top-[9rem] md:top-16 bg-white border-b border-gray-100 z-20 -mx-4 px-4 mb-4">
              {/* Mobile search — full width, own row above the tab strip */}
              <div className="md:hidden relative pt-2 pb-2">
                <Search size={14} className="absolute left-2.5 top-[1.15rem] text-turtle-gray-2" />
                <input
                  type="text"
                  value={menuSearch}
                  onChange={(e) => setMenuSearch(e.target.value)}
                  placeholder={t("menu_search")}
                  className="w-full pl-8 pr-3 py-2 text-sm bg-turtle-gray rounded-full focus:outline-none focus:ring-1 focus:ring-turtle-pink"
                />
              </div>
              <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide">
                <div className="hidden md:block relative shrink-0">
                  <Search size={14} className="absolute left-2.5 top-2.5 text-turtle-gray-2" />
                  <input
                    type="text"
                    value={menuSearch}
                    onChange={(e) => setMenuSearch(e.target.value)}
                    placeholder={t("menu_search")}
                    className="pl-8 pr-3 py-2 text-xs border border-gray-200 rounded-full focus:outline-none focus:border-turtle-pink w-40"
                  />
                </div>
                {popularItems.length > 0 && (
                  <button
                    onClick={() => setActiveCategory("popular")}
                    className={`shrink-0 px-3 py-2 text-sm font-medium border-b-2 whitespace-nowrap transition-colors ${
                      activeCategory === "popular"
                        ? "border-turtle-pink text-turtle-pink"
                        : "border-transparent text-turtle-gray-2 hover:text-turtle-dark"
                    }`}
                  >
                    {t("menu_popular_badge")} ({popularItems.length})
                  </button>
                )}
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`shrink-0 px-3 py-2 text-sm font-medium border-b-2 whitespace-nowrap transition-colors ${
                      activeCategory === cat
                        ? "border-turtle-pink text-turtle-pink"
                        : "border-transparent text-turtle-gray-2 hover:text-turtle-dark"
                    }`}
                  >
                    {cat} ({menuItems.filter((i) => i.category_en === cat).length})
                  </button>
                ))}
              </div>
            </div>

            {mLoading ? (
              <div className="grid grid-cols-2 gap-3">
                {Array.from({ length: 4 }).map((_, i) => <SkeletonCard key={i} />)}
              </div>
            ) : (
              <div className="space-y-6">
                {/* Popular section */}
                {popularItems.length > 0 && !menuSearch && (
                  <section id="section-popular">
                    <h2 className="text-lg font-bold text-turtle-dark mb-0.5 flex items-center gap-2">
                      🔥 {t("section_popular")}
                    </h2>
                    <p className="text-sm text-turtle-gray-2 mb-3">{t("section_popular_subtitle")}</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {popularItems.map((item) => (
                        <MenuItemCard
                          key={item.id}
                          item={item}
                          restaurantSlug={slug}
                          restaurantNameEn={restaurant.name_en}
                          restaurantNameBn={restaurant.name_bn}
                        />
                      ))}
                    </div>
                  </section>
                )}

                {/* Reviews */}
                <section>
                  <div className="flex items-center justify-between mb-3">
                    <h2 className="text-lg font-bold text-turtle-dark">{t("section_fellow_foodies")}</h2>
                    <button className="text-xs text-turtle-pink hover:underline">{t("section_see_all")}</button>
                  </div>
                  <div className="flex gap-4">
                    {/* Rating summary */}
                    <div className="shrink-0 w-28 text-center border border-gray-100 rounded-xl p-3">
                      <p className="text-2xl font-bold text-turtle-dark">
                        {avgRating.toFixed(1)} <span className="text-base">/</span> 5
                      </p>
                      <div className="flex justify-center gap-0.5 my-1">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            size={12}
                            className={i < Math.round(avgRating) ? "fill-turtle-yellow text-turtle-yellow" : "text-gray-200 fill-gray-200"}
                          />
                        ))}
                      </div>
                      <p className="text-[10px] text-turtle-gray-2">{reviews.length * 23} ratings</p>
                    </div>
                    {/* Review cards */}
                    <div className="flex gap-3 overflow-x-auto scrollbar-hide flex-1">
                      {reviews.map((r, i) => (
                        <div key={i} className="shrink-0 w-56 border border-gray-100 rounded-xl p-3">
                          <div className="flex items-center gap-1 mb-1">
                            <div className="flex gap-0.5">
                              {Array.from({ length: 5 }).map((_, j) => (
                                <Star
                                  key={j}
                                  size={11}
                                  className={j < r.rating ? "fill-turtle-yellow text-turtle-yellow" : "text-gray-200 fill-gray-200"}
                                />
                              ))}
                            </div>
                            <span className="text-[10px] text-turtle-gray-2 ml-1">{r.date}</span>
                          </div>
                          <p className="text-xs text-turtle-dark line-clamp-3">{r.text}</p>
                          <div className="flex items-center justify-between mt-2">
                            <p className="text-[10px] font-semibold text-turtle-dark">{r.author}</p>
                            {r.is_top_reviewer && (
                              <span className="bg-green-100 text-turtle-green text-[10px] font-medium px-1.5 py-0.5 rounded-full">
                                Top Reviewer
                              </span>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </section>

                {/* Category sections */}
                {categories.map((cat) => {
                  const catItems = filteredItems.filter((i) => i.category_en === cat);
                  if (catItems.length === 0) return null;
                  return (
                    <section key={cat} id={`section-${cat}`}>
                      <h2 className="text-lg font-bold text-turtle-dark mb-3">{cat}</h2>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {catItems.map((item) => (
                          <MenuItemCard
                            key={item.id}
                            item={item}
                            restaurantSlug={slug}
                            restaurantNameEn={restaurant.name_en}
                            restaurantNameBn={restaurant.name_bn}
                          />
                        ))}
                      </div>
                    </section>
                  );
                })}
              </div>
            )}
          </div>

          {/* Cart panel */}
          <CartPanel otherItems={menuItems} restaurantSlug={slug} />
        </div>
      </main>
      <Footer />
      <MobileNav />
      <CartBottomBar />
    </>
  );
}

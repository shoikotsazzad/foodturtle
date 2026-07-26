"use client";

import { use, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Clock, Star, Plus, Minus, ShoppingCart, Trash2, Search, MapPin } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CartBottomBar from "@/components/cart/CartBottomBar";
import { useLanguage } from "@/context/LanguageContext";
import { useCart } from "@/context/CartContext";
import { SHOPS, SHOP_TYPES, getShopProducts, type Shop, type ShopProduct } from "@/lib/shops-data";

const TYPE_EMOJIS: Record<string, string> = {
  "Supermarket": "🛒", "All In One Pharmacy": "💊", "Bakery & Desserts": "🎂",
  "Beauty": "💄", "Beverages": "🥤", "Electronics": "📱",
  "Fashion": "👗", "Convenience": "🛍️", "Flowers & Plants": "💐",
  "Pets": "🐾", "Stationery And Books": "📚", "Sports & Fashion": "🏋️",
};

function ShopProductCard({ product, shop }: { product: ShopProduct; shop: Shop }) {
  const { lang } = useLanguage();
  const { items, addItem, updateQuantity } = useCart();
  const name = lang === "bn" ? product.name_bn : product.name_en;
  const cartItem = items.find((i) => i.id === product.id);
  const qty = cartItem?.quantity ?? 0;
  const discountPct = Math.round(((product.original_price - product.price) / product.original_price) * 100);

  const handleAdd = () => {
    addItem({
      id: product.id,
      restaurant_id: shop.id,
      restaurant_slug: shop.id,
      restaurant_name_en: shop.name_en,
      restaurant_name_bn: shop.name_bn,
      name_en: product.name_en,
      name_bn: product.name_bn,
      price: product.price,
      original_price: product.original_price,
      image: product.image,
    });
  };

  return (
    <div className="bg-white rounded-xl border border-gray-100 p-3 flex flex-col hover:shadow-md transition-shadow">
      <div className="relative mb-2">
        <img src={product.image} alt={name} className="w-full h-28 object-cover rounded-lg bg-turtle-gray" />
        <span className="absolute top-1 right-1 bg-turtle-pink text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full">
          -{discountPct}%
        </span>
        {qty > 0 ? (
          <div className="absolute bottom-1 right-1 flex items-center gap-1 bg-white rounded-full shadow border border-gray-100 p-0.5">
            <button
              onClick={() => updateQuantity(product.id, qty - 1)}
              className="w-6 h-6 rounded-full border border-gray-200 flex items-center justify-center"
            >
              <Minus size={10} />
            </button>
            <span className="text-xs font-bold w-4 text-center">{qty}</span>
            <button
              onClick={() => updateQuantity(product.id, qty + 1)}
              className="w-6 h-6 rounded-full bg-turtle-pink text-white flex items-center justify-center"
            >
              <Plus size={10} />
            </button>
          </div>
        ) : (
          <button
            onClick={handleAdd}
            className="absolute bottom-1 right-1 w-7 h-7 rounded-full bg-turtle-pink text-white flex items-center justify-center shadow"
          >
            <Plus size={14} />
          </button>
        )}
      </div>
      <span className="text-[10px] text-turtle-gray-2 mb-0.5">{product.category}</span>
      <p className="text-sm font-bold text-turtle-pink">Tk {product.price}</p>
      <s className="text-xs text-turtle-gray-2">Tk {product.original_price}</s>
      <p className="text-xs text-turtle-dark mt-1 line-clamp-2">{name}</p>
    </div>
  );
}

export default function ShopDetailPage({ params }: { params: Promise<{ shopId: string }> }) {
  const { shopId } = use(params);
  const { lang, t } = useLanguage();
  const router = useRouter();
  const { items, updateQuantity, removeItem } = useCart();
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const shop = SHOPS.find((s) => s.id === shopId);

  if (!shop) {
    return (
      <>
        <Navbar />
        <div className="max-w-2xl mx-auto px-4 py-20 text-center">
          <img src="/logo.png" alt="Food Turtle" className="w-16 h-16 object-contain mb-4 opacity-60 mx-auto" />
          <h1 className="text-xl font-bold text-turtle-dark mb-2">{t("shop_not_found_title")}</h1>
          <Link href="/shops" className="text-turtle-pink font-medium hover:underline">
            ← {t("back_to_shops")}
          </Link>
        </div>
        <Footer />
      </>
    );
  }

  const shopName = lang === "bn" ? shop.name_bn : shop.name_en;
  const products = getShopProducts(shop);
  const categories = ["All", ...Array.from(new Set(products.map((p) => p.category)))];

  const filtered = products.filter((p) => {
    const nameMatch = p.name_en.toLowerCase().includes(search.toLowerCase()) || p.name_bn.includes(search);
    const catMatch = activeCategory === "All" || p.category === activeCategory;
    return nameMatch && catMatch;
  });

  const shopItems = items.filter((i) => i.restaurant_id === shop.id);
  const shopTotal = shopItems.reduce((s, i) => s + i.price * i.quantity, 0);

  const emoji = TYPE_EMOJIS[shop.type] ?? "🏪";

  return (
    <>
      <Navbar />
      <main className="max-w-7xl mx-auto w-full px-4 py-4 pb-20 sm:pb-4">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1 text-xs text-turtle-gray-2 mb-4">
          <Link href="/" className="hover:text-turtle-pink">{t("breadcrumb_home")}</Link>
          <span>›</span>
          <Link href="/shops" className="hover:text-turtle-pink">{t("nav_shops")}</Link>
          <span>›</span>
          <span className="text-turtle-dark">{shopName}</span>
        </nav>

        {/* Shop header */}
        <div className="bg-white rounded-2xl border border-gray-100 p-5 mb-6">
          <div className="flex items-center gap-4">
            <img src={shop.logo} alt={shopName} className="w-20 h-20 rounded-xl object-cover shrink-0" />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs bg-turtle-pink-bg text-turtle-pink px-2 py-0.5 rounded-full font-medium">
                  {emoji} {shop.type}
                </span>
                <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${shop.is_open ? "bg-green-50 text-green-600" : "bg-gray-100 text-turtle-gray-2"}`}>
                  {shop.is_open ? t("status_open_now") : t("status_closed")}
                </span>
              </div>
              <h1 className="text-xl font-bold text-turtle-dark">{shopName}</h1>
              <div className="flex items-center gap-4 mt-1.5 text-xs text-turtle-gray-2">
                <span className="flex items-center gap-1">
                  <MapPin size={11} />{shop.area}, Dhaka
                </span>
                <span className="flex items-center gap-1">
                  <Clock size={11} />{shop.delivery_time} min
                </span>
                <span className="flex items-center gap-1 text-amber-500">
                  <Star size={11} className="fill-amber-500" />{shop.rating}
                </span>
              </div>
            </div>
            <button
              onClick={() => router.back()}
              className="shrink-0 flex items-center gap-1 text-sm text-turtle-gray-2 hover:text-turtle-pink transition-colors"
            >
              <ArrowLeft size={16} />
              {t("back_btn")}
            </button>
          </div>
        </div>

        <div className="flex gap-4">
          {/* Left sidebar */}
          <aside className="hidden lg:flex flex-col w-48 shrink-0 sticky top-[7rem] h-[calc(100vh-7rem)] overflow-y-auto scrollbar-hide pb-6">
            <div className="bg-white rounded-xl border border-gray-100 p-3">
              <p className="text-xs font-bold text-turtle-gray-2 uppercase mb-3">{t("categories_label")}</p>
              <div className="space-y-0.5">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`w-full text-left px-2 py-2 rounded-lg text-xs transition-colors ${
                      activeCategory === cat
                        ? "bg-turtle-pink-bg text-turtle-pink font-semibold"
                        : "text-turtle-dark hover:bg-turtle-gray"
                    }`}
                  >
                    {cat}
                    <span className="ml-1 text-turtle-gray-2">
                      ({cat === "All" ? products.length : products.filter((p) => p.category === cat).length})
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </aside>

          {/* Main products */}
          <div className="flex-1 min-w-0">
            <div className="relative mb-4">
              <Search size={15} className="absolute left-3 top-2.5 text-turtle-gray-2" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder={t("search_in_shop_placeholder", { shop: shopName })}
                className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-full text-sm focus:outline-none focus:border-turtle-pink"
              />
            </div>

            {/* Mobile category chips */}
            <div className="flex gap-2 overflow-x-auto scrollbar-hide mb-4 lg:hidden">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`shrink-0 px-3 py-1.5 rounded-full text-xs border transition-colors ${
                    activeCategory === cat
                      ? "bg-turtle-pink text-white border-turtle-pink"
                      : "border-gray-200 text-turtle-dark"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="flex items-center justify-between mb-3">
              <p className="text-sm text-turtle-gray-2">
                {activeCategory !== "All"
                  ? t("shop_product_count_category", { count: filtered.length, category: activeCategory })
                  : t("shop_product_count_all", { count: filtered.length })}
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {filtered.map((p) => (
                <ShopProductCard key={p.id} product={p} shop={shop} />
              ))}
            </div>

            {filtered.length === 0 && (
              <div className="text-center py-16 text-turtle-gray-2">
                <img src="/logo.png" alt="Food Turtle" className="w-12 h-12 object-contain mb-3 opacity-60 mx-auto" />
                <p className="font-medium">{t("no_products_found")}</p>
              </div>
            )}
          </div>

          {/* Right cart panel */}
          <div className="hidden xl:flex flex-col w-60 shrink-0 sticky top-[7rem] h-[calc(100vh-7rem)] overflow-y-auto scrollbar-hide pb-6">
            <div className="bg-white rounded-xl border border-gray-100 p-4 flex flex-col h-full">
              <p className="font-bold text-turtle-dark text-sm mb-4 border-b border-gray-100 pb-3">
                {t("your_order_from", { name: shopName })}
              </p>

              {shopItems.length === 0 ? (
                <div className="text-center py-8 flex-1">
                  <ShoppingCart size={28} className="text-turtle-gray mx-auto mb-2" />
                  <p className="text-sm text-turtle-dark">{t("shop_cart_empty")}</p>
                  <p className="text-xs text-turtle-gray-2">{t("shop_cart_empty_subtitle")}</p>
                </div>
              ) : (
                <div className="flex-1 overflow-y-auto space-y-3 mb-3">
                  {shopItems.map((item) => (
                    <div key={item.id} className="flex items-center gap-2">
                      <img src={item.image} alt={item.name_en} className="w-10 h-10 rounded-lg object-cover shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-medium text-turtle-dark line-clamp-1">
                          {lang === "bn" ? item.name_bn : item.name_en}
                        </p>
                        <p className="text-xs text-turtle-pink font-bold">Tk {item.price}</p>
                      </div>
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-5 h-5 rounded-full border border-gray-200 flex items-center justify-center"
                        >
                          <Minus size={8} />
                        </button>
                        <span className="text-xs font-bold w-4 text-center">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-5 h-5 rounded-full bg-turtle-pink text-white flex items-center justify-center"
                        >
                          <Plus size={8} />
                        </button>
                      </div>
                      <button onClick={() => removeItem(item.id)}>
                        <Trash2 size={11} className="text-turtle-gray-2 hover:text-red-500" />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              <div className="border-t border-gray-100 pt-3">
                <div className="flex justify-between text-sm text-turtle-gray-2 mb-1">
                  <span>{t("cart_subtotal")}</span><span>Tk {shopTotal}</span>
                </div>
                <div className="flex justify-between text-sm font-bold text-turtle-dark mb-3">
                  <span>{t("cart_total")}</span><span>Tk {shopTotal + (shopTotal > 0 ? 5 : 0)}</span>
                </div>
                <button
                  onClick={() => router.push("/checkout")}
                  disabled={shopItems.length === 0}
                  className={`w-full py-2.5 rounded-full text-sm font-bold transition-colors ${
                    shopItems.length > 0
                      ? "bg-turtle-pink text-white hover:bg-turtle-pink/90"
                      : "bg-gray-200 text-turtle-gray-2 cursor-not-allowed"
                  }`}
                >
                  {shopItems.length > 0 ? t("checkout_btn_count", { count: shopItems.length }) : t("checkout_btn")}
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
      <CartBottomBar />
    </>
  );
}

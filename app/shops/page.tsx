"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import MobileNav from "@/components/layout/MobileNav";
import Footer from "@/components/layout/Footer";
import { useLanguage } from "@/context/LanguageContext";
import { useCart } from "@/context/CartContext";
import PageTitle from "@/components/shared/PageTitle";
import { Clock, Star, Tag, Heart, Plus, Minus, ChevronRight, ChevronLeft, ChevronDown } from "lucide-react";
import { SHOPS, SHOP_TYPES, getShopProducts, type Shop, type ShopProduct } from "@/lib/shops-data";

const DEAL_TEMPLATES = [
  "Tk. 70 off Tk. 500:...",
  "Tk. 120 off Tk. 1000:...",
  "Tk. 150 off Tk. 1500:...",
  "15% off Tk. 100",
  "Tk. 200 off Tk. 2000:...",
  null,
  null,
  null,
];

function dealForShop(shop: Shop): string | null {
  const idx = (parseInt(shop.id.replace(/\D/g, ""), 10) || 0) % DEAL_TEMPLATES.length;
  return DEAL_TEMPLATES[idx];
}

const FEES = [12, 17, 34, 43, 46, 58, 67, 72, 92, 107];
function feeForShop(shop: Shop): number {
  const seed = parseInt(shop.id.replace(/\D/g, ""), 10) || 0;
  return FEES[seed % FEES.length];
}

// Shops with real neighbourhood-brand names (id >= s121) read better in the
// "Popular shops" / "Monthly deals" rows than the templated s01-s120 batch.
const NAMED_SHOPS = SHOPS.filter((s) => (parseInt(s.id.replace(/\D/g, ""), 10) || 0) >= 121);
const POPULAR_PRIORITY = [
  "Turtlemart Gulshan Banani",
  "Healthy World",
  "Agora RM Center",
  "Unimart Gulshan 2",
  "UK Products Gallery",
  "Bengal Meat Gourmet Butcher Shop",
];

function useHScroll() {
  const ref = useRef<HTMLDivElement>(null);
  const scrollBy = (dir: 1 | -1) => ref.current?.scrollBy({ left: dir * 320, behavior: "smooth" });
  return { ref, scrollBy };
}

function ScrollArrows({ onLeft, onRight }: { onLeft: () => void; onRight: () => void }) {
  return (
    <>
      <button
        onClick={onLeft}
        aria-label="Scroll left"
        className="hidden sm:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-3 z-10 w-8 h-8 rounded-full bg-white border border-gray-200 shadow items-center justify-center hover:bg-turtle-gray transition-colors"
      >
        <ChevronLeft size={16} className="text-turtle-dark" />
      </button>
      <button
        onClick={onRight}
        aria-label="Scroll right"
        className="hidden sm:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-3 z-10 w-8 h-8 rounded-full bg-white border border-gray-200 shadow items-center justify-center hover:bg-turtle-gray transition-colors"
      >
        <ChevronRight size={16} className="text-turtle-dark" />
      </button>
    </>
  );
}

function ShopProductMiniCard({ product, shop }: { product: ShopProduct; shop: Shop }) {
  const { lang } = useLanguage();
  const { items, addItem, updateQuantity } = useCart();
  const name = lang === "bn" ? product.name_bn : product.name_en;
  const cartItem = items.find((i) => i.id === product.id);
  const qty = cartItem?.quantity ?? 0;

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
    <div className="shrink-0 w-32 bg-white rounded-xl border border-gray-100 overflow-hidden">
      <div className="relative aspect-square bg-turtle-gray p-2.5">
        <img src={product.image} alt={name} className="w-full h-full object-contain" />
        {qty > 0 ? (
          <div className="absolute bottom-1 right-1 flex items-center gap-0.5 bg-white rounded-full shadow border border-gray-100 p-0.5">
            <button onClick={() => updateQuantity(product.id, qty - 1)} className="w-5 h-5 rounded-full border border-gray-200 flex items-center justify-center">
              <Minus size={9} />
            </button>
            <span className="text-[11px] font-bold w-3.5 text-center">{qty}</span>
            <button onClick={() => updateQuantity(product.id, qty + 1)} className="w-5 h-5 rounded-full bg-turtle-pink text-white flex items-center justify-center">
              <Plus size={9} />
            </button>
          </div>
        ) : (
          <button onClick={handleAdd} className="absolute bottom-1 right-1 w-6 h-6 rounded-full bg-turtle-pink text-white flex items-center justify-center shadow">
            <Plus size={12} />
          </button>
        )}
      </div>
      <div className="p-2">
        <p className="text-xs font-bold text-turtle-pink">Tk {product.price}</p>
        {product.original_price > product.price && (
          <p className="text-[10px] text-turtle-gray-2">
            <s>Tk {product.original_price}</s>
          </p>
        )}
        <p className="text-[11px] text-turtle-dark line-clamp-2 leading-tight mt-0.5">{name}</p>
      </div>
    </div>
  );
}

function ShopSwimlane({ shop }: { shop: Shop }) {
  const { lang } = useLanguage();
  const name = lang === "bn" ? shop.name_bn : shop.name_en;
  const products = getShopProducts(shop).slice(0, 8);
  return (
    <section className="mb-6">
      <div className="flex items-center justify-between mb-3">
        <Link href={`/shops/${shop.id}`} className="flex items-center gap-2.5 min-w-0 group">
          <img src={shop.logo} alt="" className="w-10 h-10 rounded-lg object-cover shrink-0" />
          <div className="min-w-0">
            <p className="font-bold text-turtle-dark text-sm truncate group-hover:text-turtle-pink transition-colors">{name}</p>
            <p className="text-[11px] text-turtle-gray-2 flex items-center gap-1">
              <Clock size={10} />{shop.delivery_time} min · {shop.area}
            </p>
          </div>
        </Link>
        <Link
          href={`/shops/${shop.id}`}
          className="shrink-0 flex items-center gap-0.5 text-xs font-semibold text-turtle-pink border border-turtle-pink/40 rounded-full px-3 py-1.5 hover:bg-turtle-pink-bg transition-colors"
        >
          View shop <ChevronRight size={13} />
        </Link>
      </div>
      <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-1">
        {products.map((p) => (
          <ShopProductMiniCard key={p.id} product={p} shop={shop} />
        ))}
      </div>
    </section>
  );
}

export default function ShopsPage() {
  const { t, lang } = useLanguage();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [showAllTypes, setShowAllTypes] = useState(false);

  const search = searchParams.get("q") ?? "";
  const activeTypes = searchParams.get("types")?.split(",").filter(Boolean) ?? [];
  const showVouchersOnly = searchParams.get("vouchers") === "1";

  const popularScroll = useHScroll();
  const dealsScroll = useHScroll();

  const updateParams = (mutate: (params: URLSearchParams) => void) => {
    const params = new URLSearchParams(searchParams.toString());
    mutate(params);
    const qs = params.toString();
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
  };

  const toggleType = (name: string) => {
    updateParams((params) => {
      const next = new Set(activeTypes);
      if (next.has(name)) next.delete(name);
      else next.add(name);
      if (next.size > 0) params.set("types", Array.from(next).join(","));
      else params.delete("types");
    });
  };

  const clearTypes = () => updateParams((params) => params.delete("types"));

  const setShowVouchers = (val: boolean) =>
    updateParams((params) => {
      if (val) params.set("vouchers", "1");
      else params.delete("vouchers");
    });

  const filtered = SHOPS.filter((s) => {
    const nameMatch =
      s.name_en.toLowerCase().includes(search.toLowerCase()) || s.name_bn.includes(search);
    const typeMatch = activeTypes.length === 0 || activeTypes.includes(s.type);
    const voucherMatch = !showVouchersOnly || dealForShop(s) !== null;
    return nameMatch && typeMatch && voucherMatch;
  });

  const isBrowsing = activeTypes.length === 0 && !search && !showVouchersOnly;

  const popularShops = [
    ...POPULAR_PRIORITY.map((n) => NAMED_SHOPS.find((s) => s.name_en === n)).filter((s): s is Shop => !!s),
    ...NAMED_SHOPS.filter((s) => !POPULAR_PRIORITY.includes(s.name_en)),
  ].slice(0, 14);
  const dealShops = NAMED_SHOPS.filter((s) => dealForShop(s) !== null).slice(0, 14);
  const swimlaneShops = (isBrowsing ? SHOPS : filtered).filter((s) => s.is_open).slice(0, 6);

  const visibleTypes = SHOP_TYPES.filter((n) => n !== "All");
  const shownTypes = showAllTypes ? visibleTypes : visibleTypes.slice(0, 10);

  const typeFilterPanel = (
    <>
      <p className="text-xs font-bold text-turtle-gray-2 uppercase mb-3">Filters</p>
      <p className="text-xs font-semibold text-turtle-dark mb-2">Offers</p>
      <label className="flex items-center gap-2 cursor-pointer mb-4">
        <input
          type="checkbox"
          checked={showVouchersOnly}
          onChange={() => setShowVouchers(!showVouchersOnly)}
          className="accent-turtle-pink"
        />
        <span className="text-sm text-turtle-dark">Accepts vouchers</span>
      </label>

      <p className="text-xs font-semibold text-turtle-dark mb-2">Shop types</p>
      <div className="space-y-1.5">
        {shownTypes.map((name) => (
          <label key={name} className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={activeTypes.includes(name)}
              onChange={() => toggleType(name)}
              className="accent-turtle-pink shrink-0"
            />
            <span className="text-sm text-turtle-dark">{name}</span>
          </label>
        ))}
      </div>
      <button
        onClick={() => setShowAllTypes((v) => !v)}
        className="flex items-center gap-1 text-xs font-semibold text-turtle-pink mt-3 hover:underline"
      >
        {showAllTypes ? "Show less" : "Show more"}
        <ChevronDown size={13} className={showAllTypes ? "rotate-180 transition-transform" : "transition-transform"} />
      </button>
    </>
  );

  return (
    <>
      <PageTitle title="Shops — Food Turtle" />
      <Navbar />
      <main className="max-w-7xl mx-auto w-full px-4 py-6 pb-20 sm:pb-6">
        <div className="flex gap-6">

          {/* Left sidebar — Filters + full Shop types checklist, foodpanda-style */}
          <aside className="hidden lg:block w-56 shrink-0 sticky top-[7rem] h-[calc(100vh-7rem)] overflow-y-auto scrollbar-hide pb-6">
            <div className="bg-white rounded-xl border border-gray-100 p-3">{typeFilterPanel}</div>
          </aside>

          {/* Main */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-2xl font-bold text-turtle-dark">{t("shops_title")}</h1>
            </div>

            {/* Mobile-only filters (sidebar is desktop-only) */}
            <div className="lg:hidden bg-white rounded-xl border border-gray-100 p-3 mb-4">{typeFilterPanel}</div>

            {/* Popular strip — brand tile + name/time, not circular, with scroll arrows */}
            {isBrowsing && (
              <section className="mb-8 relative">
                <h2 className="text-lg font-bold text-turtle-dark mb-3">{t("shops_popular")}</h2>
                <ScrollArrows onLeft={() => popularScroll.scrollBy(-1)} onRight={() => popularScroll.scrollBy(1)} />
                <div ref={popularScroll.ref} className="flex gap-6 overflow-x-auto scrollbar-hide pb-1 scroll-smooth">
                  {popularShops.map((shop) => {
                    const name = lang === "bn" ? shop.name_bn : shop.name_en;
                    return (
                      <Link
                        key={shop.id}
                        href={`/shops/${shop.id}`}
                        className="shrink-0 flex items-center gap-2.5 w-52 group"
                      >
                        <img
                          src={shop.logo}
                          alt=""
                          className="w-14 h-14 rounded-xl object-cover shrink-0 group-hover:shadow-md transition-shadow"
                        />
                        <div className="min-w-0">
                          <p className="text-sm font-semibold text-turtle-dark truncate">{name}</p>
                          <p className="text-xs text-turtle-gray-2">{shop.delivery_time.split("-")[0]} min</p>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </section>
            )}

            {/* Monthly deals swimlane — bigger cards, foodpanda "Monthly deals" style, with scroll arrows */}
            {isBrowsing && dealShops.length > 0 && (
              <section className="mb-8 relative">
                <h2 className="text-lg font-bold text-turtle-dark mb-3">Monthly deals</h2>
                <ScrollArrows onLeft={() => dealsScroll.scrollBy(-1)} onRight={() => dealsScroll.scrollBy(1)} />
                <div ref={dealsScroll.ref} className="flex gap-4 overflow-x-auto scrollbar-hide pb-1 scroll-smooth">
                  {dealShops.map((shop, i) => {
                    const name = lang === "bn" ? shop.name_bn : shop.name_en;
                    const deal = dealForShop(shop);
                    const fee = feeForShop(shop);
                    return (
                      <Link
                        key={shop.id}
                        href={`/shops/${shop.id}`}
                        className="shrink-0 w-56 bg-white rounded-xl border border-gray-100 overflow-hidden hover:shadow-md transition-shadow block"
                      >
                        <div className="relative h-28 bg-turtle-gray">
                          <img src={shop.logo} alt="" className="w-full h-full object-cover" />
                          <button
                            onClick={(e) => e.preventDefault()}
                            className="absolute top-2 right-2 w-6 h-6 rounded-full bg-white/90 flex items-center justify-center"
                          >
                            <Heart size={12} className="text-turtle-dark" />
                          </button>
                          {i % 3 === 1 && (
                            <span className="absolute top-2 left-2 text-[9px] bg-black/70 text-white px-1.5 py-0.5 rounded font-medium">
                              Ad
                            </span>
                          )}
                        </div>
                        <div className="p-2.5">
                          <p className="font-semibold text-turtle-dark text-sm truncate">{name}</p>
                          <p className="text-xs text-turtle-gray-2">From {shop.delivery_time.split("-")[0]} min</p>
                          <p className="text-xs text-turtle-gray-2 mb-1.5">Tk{fee} delivery</p>
                          {deal && (
                            <span className="inline-flex items-center gap-1 text-[10px] bg-turtle-pink-bg text-turtle-pink px-1.5 py-0.5 rounded-full font-bold">
                              <Tag size={9} />
                              {deal}
                            </span>
                          )}
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </section>
            )}

            {/* Per-shop product swimlanes — real product previews per shop, like pandamart's "Shop by store" rows */}
            <section className="mb-2">
              <h2 className="text-lg font-bold text-turtle-dark mb-4">
                {isBrowsing ? "Shop by store" : `${activeTypes.length ? activeTypes.join(", ") : "Search results"} (${filtered.length})`}
              </h2>
              {swimlaneShops.map((shop) => (
                <ShopSwimlane key={shop.id} shop={shop} />
              ))}
              {swimlaneShops.length === 0 && (
                <div className="text-center py-16 text-turtle-gray-2">
                  <img src="/logo.png" alt="Food Turtle" className="w-12 h-12 object-contain mb-3 opacity-60 mx-auto" />
                  <p className="font-medium">No shops found</p>
                </div>
              )}
            </section>

            {/* All shops grid — logo-card directory, shown when browsing everything */}
            {isBrowsing && (
              <section className="mt-8">
                <div className="flex items-center justify-between mb-3">
                  <h2 className="text-lg font-bold text-turtle-dark">
                    {t("shops_all")}
                    <span className="text-sm font-normal text-turtle-gray-2 ml-2">({SHOPS.length})</span>
                  </h2>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                  {SHOPS.map((shop) => {
                    const name = lang === "bn" ? shop.name_bn : shop.name_en;
                    const deal = dealForShop(shop);
                    return (
                      <Link
                        key={shop.id}
                        href={`/shops/${shop.id}`}
                        className="bg-white rounded-xl border border-gray-100 overflow-hidden hover:shadow-md transition-shadow block"
                      >
                        <div className="relative h-32 bg-turtle-gray">
                          <img src={shop.logo} alt="" className="w-full h-full object-cover" />
                          {!shop.is_open && (
                            <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center gap-2">
                              <p className="text-white text-xs font-bold">{t("restaurant_card_closed")}</p>
                              <button className="bg-turtle-pink text-white text-xs px-3 py-1 rounded-full">
                                {t("restaurant_card_order_later")}
                              </button>
                            </div>
                          )}
                          <span className="absolute top-2 left-2 text-[11px] bg-white/90 text-turtle-dark px-1.5 py-0.5 rounded-full font-medium">
                            {shop.type}
                          </span>
                          {shop.is_open && (
                            <span className="absolute top-2 right-2 text-[10px] bg-green-500 text-white px-1.5 py-0.5 rounded-full font-medium">
                              Open
                            </span>
                          )}
                          {deal && shop.is_open && (
                            <span className="absolute bottom-2 left-2 flex items-center gap-1 text-[10px] bg-turtle-pink text-white px-1.5 py-0.5 rounded-full font-bold">
                              <Tag size={9} />
                              {deal}
                            </span>
                          )}
                        </div>
                        <div className="p-2.5">
                          <p className="font-semibold text-turtle-dark text-sm truncate">{name}</p>
                          <p className="text-xs text-turtle-gray-2 mb-1">{shop.area}</p>
                          <div className="flex items-center justify-between">
                            <p className="text-xs text-turtle-gray-2 flex items-center gap-1">
                              <Clock size={11} />{shop.delivery_time} min
                            </p>
                            <p className="text-xs text-amber-500 flex items-center gap-0.5">
                              <Star size={10} className="fill-amber-500" />{shop.rating}
                            </p>
                          </div>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </section>
            )}
          </div>
        </div>
      </main>
      <Footer />
      <MobileNav />
    </>
  );
}

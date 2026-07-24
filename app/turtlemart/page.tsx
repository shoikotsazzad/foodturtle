"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Plus, Minus, ShoppingCart, Trash2, ChevronLeft, ChevronRight } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import MobileNav from "@/components/layout/MobileNav";
import Footer from "@/components/layout/Footer";
import CartBottomBar from "@/components/cart/CartBottomBar";
import { useLanguage } from "@/context/LanguageContext";
import { useCart } from "@/context/CartContext";
import PageTitle from "@/components/shared/PageTitle";
import { CATEGORIES, CATEGORY_TREE, CATEGORY_ICONS, BANNERS, SECTIONS, QUICK_TABS, PRODUCTS, type TmProduct } from "@/lib/turtlemart-data";

function BannerCarousel() {
  const [active, setActive] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setActive((i) => (i + 1) % BANNERS.length), 4500);
    return () => clearInterval(id);
  }, []);
  const banner = BANNERS[active];
  return (
    <div className="relative rounded-2xl overflow-hidden mb-4 h-36 sm:h-44">
      <div className={`absolute inset-0 bg-gradient-to-br ${banner.gradient} transition-colors duration-500`} />
      <div className="relative h-full flex flex-col justify-center px-6 sm:px-8 text-white">
        <h3 className="text-lg sm:text-2xl font-extrabold mb-1 drop-shadow-sm">{banner.title}</h3>
        <p className="text-xs sm:text-sm text-white/90 mb-3 max-w-xs">{banner.subtitle}</p>
        <button className="w-fit bg-white/95 text-turtle-dark text-xs font-bold px-3.5 py-1.5 rounded-full hover:bg-white transition-colors">
          {banner.cta}
        </button>
      </div>
      <button
        onClick={() => setActive((i) => (i - 1 + BANNERS.length) % BANNERS.length)}
        aria-label="Previous banner"
        className="absolute left-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-white/90 hover:bg-white text-turtle-dark shadow flex items-center justify-center transition-colors"
      >
        <ChevronLeft size={16} />
      </button>
      <button
        onClick={() => setActive((i) => (i + 1) % BANNERS.length)}
        aria-label="Next banner"
        className="absolute right-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-white/90 hover:bg-white text-turtle-dark shadow flex items-center justify-center transition-colors"
      >
        <ChevronRight size={16} />
      </button>
      <div className="absolute bottom-2.5 left-1/2 -translate-x-1/2 flex gap-1.5">
        {BANNERS.map((_, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className={`h-1.5 rounded-full transition-all ${i === active ? "w-4 bg-white" : "w-1.5 bg-white/50"}`}
          />
        ))}
      </div>
    </div>
  );
}

function ProductCard({ product }: { product: TmProduct }) {
  const { lang } = useLanguage();
  const { items, addItem, updateQuantity } = useCart();
  const name = lang === "bn" ? product.name_bn : product.name_en;
  const cartItem = items.find((i) => i.id === product.id);
  const qty = cartItem?.quantity ?? 0;

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    addItem({
      id: product.id,
      restaurant_id: "turtlemart",
      restaurant_slug: "turtlemart",
      restaurant_name_en: "Turtlemart",
      restaurant_name_bn: "টার্টেলমার্ট",
      name_en: product.name_en,
      name_bn: product.name_bn,
      price: product.price,
      original_price: product.original_price,
      image: product.image,
    });
  };

  const handleUpdate = (e: React.MouseEvent, newQty: number) => {
    e.preventDefault();
    updateQuantity(product.id, newQty);
  };

  return (
    <Link href={`/turtlemart/${product.id}`} className="block group">
      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden flex flex-col hover:shadow-md transition-shadow h-full">
        <div className="relative aspect-square bg-white p-3">
          <img
            src={product.image}
            alt={name}
            className="w-full h-full object-contain group-hover:scale-[1.05] transition-transform duration-200"
          />
          {product.isOffer && (
            <span className="absolute top-1.5 left-1.5 bg-turtle-pink text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full">
              OFFER
            </span>
          )}
          {qty > 0 ? (
            <div
              onClick={(e) => e.preventDefault()}
              className="absolute bottom-1.5 right-1.5 flex items-center gap-1 bg-white rounded-full shadow border border-gray-100 p-0.5"
            >
              <button
                onClick={(e) => handleUpdate(e, qty - 1)}
                className="w-6 h-6 rounded-full border border-gray-200 flex items-center justify-center"
              >
                <Minus size={10} />
              </button>
              <span className="text-xs font-bold w-4 text-center">{qty}</span>
              <button
                onClick={(e) => handleUpdate(e, qty + 1)}
                className="w-6 h-6 rounded-full bg-turtle-pink text-white flex items-center justify-center"
              >
                <Plus size={10} />
              </button>
            </div>
          ) : (
            <button
              onClick={handleAdd}
              className="absolute bottom-1.5 right-1.5 w-7 h-7 rounded-full bg-turtle-pink text-white flex items-center justify-center shadow"
            >
              <Plus size={14} />
            </button>
          )}
        </div>
        <div className="p-2.5 flex flex-col flex-1">
          <div className="flex items-baseline gap-1.5">
            <p className="text-sm font-bold text-turtle-pink">Tk {product.price}</p>
            {product.save > 0 && (
              <s className="text-xs text-turtle-gray-2">Tk {product.original_price}</s>
            )}
          </div>
          {product.save > 0 && (
            <span className="text-[10px] bg-turtle-pink-bg text-turtle-pink px-1.5 py-0.5 rounded-full w-fit mt-1 font-medium">
              Save Tk {product.save}
            </span>
          )}
          <p className="text-xs text-turtle-dark mt-1.5 line-clamp-2 leading-snug">{name}</p>
        </div>
      </div>
    </Link>
  );
}

function ProductSection({ title, products }: { title: string; products: TmProduct[] }) {
  if (products.length === 0) return null;
  return (
    <section className="mb-8" id={`section-${title.replace(/\s+/g, "-")}`}>
      <h2 className="text-lg font-bold text-turtle-dark mb-3">{title}</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-3">
        {products.map((p) => <ProductCard key={p.id} product={p} />)}
      </div>
    </section>
  );
}

export default function TurtlemartPage() {
  const { t, lang } = useLanguage();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { items, updateQuantity, removeItem, total, itemCount } = useCart();
  const [activeCategory, setActiveCategory] = useState("All");
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  const search = searchParams.get("q") ?? "";

  const setSearch = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) params.set("q", value);
    else params.delete("q");
    const qs = params.toString();
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
  };

  const tmItems = items.filter((i) => i.restaurant_id === "turtlemart");
  const tmTotal = tmItems.reduce((s, i) => s + i.price * i.quantity, 0);

  const searched = PRODUCTS.filter((p) =>
    p.name_en.toLowerCase().includes(search.toLowerCase()) || p.name_bn.includes(search)
  );

  const filtered = (() => {
    if (activeCategory === "All") return searched;
    if (activeCategory === "Offers") return searched.filter((p) => p.isOffer);
    return searched.filter((p) => p.category === activeCategory);
  })();

  const namedSections = SECTIONS.map((title) => ({
    title,
    products: filtered.filter((p) => p.section === title),
  })).filter((s) => s.products.length > 0);

  const groupedByCategory = CATEGORIES.filter((c) => c.name !== "All" && c.name !== "Offers")
    .map((c) => ({ cat: c, products: filtered.filter((p) => p.category === c.name && !p.section) }))
    .filter((g) => g.products.length > 0);

  const jumpToTab = (tab: string) => {
    if (tab === "Offer") {
      setActiveCategory("Offers");
      return;
    }
    setActiveCategory("All");
    setTimeout(() => {
      document.getElementById(`section-${tab.replace(/\s+/g, "-")}`)?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 50);
  };

  return (
    <>
      <PageTitle title="Turtlemart · Food Turtle" />
      <Navbar />
      <main className="max-w-7xl mx-auto w-full px-4 py-4 pb-20 sm:pb-4">
        <div className="flex gap-4">

          {/* Left sidebar */}
          <aside className="hidden lg:flex flex-col w-56 shrink-0 sticky top-[7rem] h-[calc(100vh-7rem)] overflow-y-auto scrollbar-hide pb-6">
            <div className="bg-white rounded-xl border border-gray-100 p-3">
              <p className="font-bold text-turtle-dark text-sm mb-0.5 flex items-center gap-1"><img src="/logo.png" alt="" className="w-4 h-4 object-contain" /> Turtlemart</p>
              <p className="text-xs text-turtle-gray-2 mb-3">{t("gulshan_dhaka_label")}</p>
              <div className="space-y-0.5">
                <button
                  onClick={() => setActiveCategory("All")}
                  className={`w-full text-left px-2.5 py-2 rounded-lg text-sm transition-colors ${
                    activeCategory === "All"
                      ? "bg-turtle-pink-bg text-turtle-pink font-semibold"
                      : "text-turtle-dark hover:bg-turtle-gray"
                  }`}
                >
                  All
                </button>
                {CATEGORY_TREE.map((cat) => {
                  const isActive = activeCategory === cat.name;
                  const isExpanded = expandedCategory === cat.name;
                  return (
                    <div key={cat.name}>
                      <button
                        onClick={() => {
                          setActiveCategory(cat.name);
                          setExpandedCategory(isExpanded ? null : cat.name);
                        }}
                        className={`w-full text-left px-2.5 py-2 rounded-lg text-sm flex items-center transition-colors ${
                          isActive
                            ? "bg-turtle-pink-bg text-turtle-pink font-semibold"
                            : "text-turtle-dark hover:bg-turtle-gray"
                        }`}
                      >
                        <span className="flex-1 truncate">{cat.name}</span>
                        <span className={`shrink-0 text-xs ${isActive ? "text-turtle-pink" : "text-turtle-gray-2"}`}>
                          {isExpanded ? "⌄" : "›"}
                        </span>
                      </button>
                      {isExpanded && (
                        <div className="pl-4 pb-1 space-y-0.5">
                          {cat.subcategories.map((sub) => (
                            <button
                              key={sub}
                              onClick={() => {
                                setActiveCategory(cat.name);
                                setSearch(sub);
                              }}
                              className="w-full text-left px-2.5 py-1.5 rounded text-xs text-turtle-gray-2 hover:text-turtle-pink hover:bg-turtle-pink-bg/50"
                            >
                              {sub}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </aside>

          {/* Main content */}
          <div className="flex-1 min-w-0">
            <BannerCarousel />

            <div className="bg-turtle-pink-bg text-turtle-pink rounded-xl p-3 mb-4 flex items-center gap-2 text-sm border border-turtle-pink/20">
              <span>🎟️</span>
              <span>{t("turtlemart_voucher_strip")}</span>
            </div>

            {/* Category icon row — pandamart-style photo tiles instead of emoji pills */}
            <div className="flex gap-3 overflow-x-auto scrollbar-hide mb-4 pb-1">
              {CATEGORIES.map((cat) => {
                const isActive = activeCategory === cat.name;
                const icon = CATEGORY_ICONS[cat.name];
                return (
                  <button
                    key={cat.name}
                    onClick={() => setActiveCategory(cat.name)}
                    className="shrink-0 flex flex-col items-center gap-1.5 w-16 group"
                  >
                    <div
                      className={`w-14 h-14 rounded-xl overflow-hidden border-2 flex items-center justify-center transition-colors ${
                        isActive ? "border-turtle-pink bg-turtle-pink-bg" : "border-transparent bg-turtle-gray"
                      }`}
                    >
                      {icon ? (
                        <img src={icon} alt="" className="w-full h-full object-cover" />
                      ) : (
                        <span className="text-xl">{cat.emoji}</span>
                      )}
                    </div>
                    <span
                      className={`text-[10px] text-center leading-tight line-clamp-2 ${
                        isActive ? "text-turtle-pink font-semibold" : "text-turtle-dark"
                      }`}
                    >
                      {cat.name}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Quick-jump pills */}
            <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide mb-6 text-xs">
              <span className="text-turtle-gray-2 font-medium shrink-0">Sort</span>
              {QUICK_TABS.map((tab) => (
                <button
                  key={tab}
                  onClick={() => jumpToTab(tab)}
                  className="shrink-0 px-3 py-1.5 rounded-full border border-gray-200 text-turtle-dark hover:border-turtle-pink hover:text-turtle-pink transition-colors"
                >
                  {tab}
                </button>
              ))}
            </div>

            {activeCategory === "All" ? (
              <>
                {namedSections.map((s) => (
                  <ProductSection key={s.title} title={s.title} products={s.products} />
                ))}
                {groupedByCategory.map(({ cat, products }) => (
                  <ProductSection key={cat.name} title={cat.name} products={products} />
                ))}
              </>
            ) : activeCategory === "Offers" ? (
              <ProductSection title="Offers" products={filtered} />
            ) : (
              <ProductSection title={activeCategory} products={filtered} />

            )}

            {filtered.length === 0 && (
              <div className="text-center py-16 text-turtle-gray-2">
                <img src="/logo.png" alt="Food Turtle" className="w-12 h-12 object-contain mb-3 opacity-60 mx-auto" />
                <p className="font-medium">{t("no_products_found")}</p>
              </div>
            )}
          </div>

          {/* Right cart panel */}
          <div className="hidden xl:flex flex-col w-64 shrink-0 sticky top-[7rem] h-[calc(100vh-7rem)] overflow-y-auto scrollbar-hide pb-6">
            <div className="bg-white rounded-xl border border-gray-100 p-4 flex flex-col h-full">
              <div className="flex border-b border-gray-100 mb-4">
                <button className="flex-1 pb-2 text-sm font-bold text-turtle-pink border-b-2 border-turtle-pink">
                  Delivery
                </button>
                <button className="flex-1 pb-2 text-sm text-turtle-gray-2">Pick-up</button>
              </div>

              {tmItems.length === 0 ? (
                <div className="text-center py-8 flex-1">
                  <ShoppingCart size={32} className="text-turtle-gray mx-auto mb-2" />
                  <p className="text-sm font-medium text-turtle-dark">{t("tm_your_cart")}</p>
                  <p className="text-xs text-turtle-gray-2">{t("tm_start_adding_items")}</p>
                </div>
              ) : (
                <div className="flex-1 overflow-y-auto space-y-3 mb-3">
                  {tmItems.map((item) => (
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
                        <Trash2 size={12} className="text-turtle-gray-2 hover:text-red-500" />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              <div className="border-t border-gray-100 pt-3">
                <div className="flex justify-between text-sm text-turtle-gray-2 mb-1">
                  <span>{t("cart_subtotal")}</span>
                  <span>Tk {tmTotal}</span>
                </div>
                <div className="flex justify-between text-sm font-bold text-turtle-dark mb-3">
                  <span>{t("cart_total")}</span>
                  <span>Tk {tmTotal + (tmTotal > 0 ? 5 : 0)}</span>
                </div>
                <button
                  onClick={() => router.push("/checkout")}
                  disabled={tmItems.length === 0}
                  className={`w-full py-3 rounded-full text-sm font-bold transition-colors ${
                    tmItems.length > 0
                      ? "bg-turtle-pink text-white hover:bg-turtle-pink/90"
                      : "bg-gray-200 text-turtle-gray-2 cursor-not-allowed"
                  }`}
                >
                  {tmItems.length > 0 ? t("cart_go_checkout_count", { count: tmItems.length }) : t("cart_go_checkout")}
                </button>
              </div>
            </div>
          </div>

        </div>
      </main>
      <Footer />
      <MobileNav />
      <CartBottomBar />
    </>
  );
}

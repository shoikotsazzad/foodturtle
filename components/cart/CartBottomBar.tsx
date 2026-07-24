"use client";

import Link from "next/link";
import { ShoppingCart, ChevronRight } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useLanguage } from "@/context/LanguageContext";

export default function CartBottomBar() {
  const { items, total, itemCount } = useCart();
  const { t, lang } = useLanguage();

  if (itemCount === 0) return null;

  const restaurantName = items[0]
    ? (lang === "bn" ? items[0].restaurant_name_bn : items[0].restaurant_name_en)
    : "";

  return (
    <Link
      href="/checkout"
      className="fixed bottom-[calc(4rem+env(safe-area-inset-bottom))] sm:bottom-4 left-4 right-4 max-w-lg mx-auto z-30 bg-turtle-pink text-white rounded-full px-4 py-3 flex items-center justify-between shadow-xl hover:bg-turtle-pink-light transition-colors"
    >
      <div className="flex items-center gap-2">
        <div className="bg-white/20 rounded-full p-1.5">
          <ShoppingCart size={16} />
        </div>
        <span className="text-sm font-semibold">
          {itemCount} {itemCount === 1 ? t("cart_bar_items") : t("cart_bar_items_plural")}
        </span>
        <span className="text-white/70 text-sm">·</span>
        <span className="text-sm font-semibold">Tk {total}</span>
      </div>
      <div className="flex items-center gap-1 text-sm font-semibold">
        {t("cart_bar_view")}
        <ChevronRight size={16} />
      </div>
    </Link>
  );
}

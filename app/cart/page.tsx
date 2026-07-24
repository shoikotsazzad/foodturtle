"use client";

import { useMemo } from "react";
import Link from "next/link";
import { Trash2, Plus, Minus } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import MobileNav from "@/components/layout/MobileNav";
import { useCart } from "@/context/CartContext";
import { useLanguage } from "@/context/LanguageContext";
import type { CartItem } from "@/types";

export default function CartPage() {
  const { items, removeItem, updateQuantity, total, itemCount } = useCart();
  const { lang, t } = useLanguage();
  const SERVICE_FEE = 5;

  // Items can come from more than one restaurant/shop/Turtlemart at once —
  // group them so it's clear where each item came from instead of one flat list.
  const groups = useMemo(() => {
    const map = new Map<string, { name: string; items: CartItem[] }>();
    for (const item of items) {
      const name = lang === "bn" ? item.restaurant_name_bn : item.restaurant_name_en;
      if (!map.has(item.restaurant_id)) map.set(item.restaurant_id, { name, items: [] });
      map.get(item.restaurant_id)!.items.push(item);
    }
    return Array.from(map.values());
  }, [items, lang]);

  return (
    <>
      <Navbar />
      <main className="max-w-2xl mx-auto px-4 py-6 pb-24">
        <h1 className="text-xl font-bold text-turtle-dark mb-4">{t("cart_heading")}</h1>
        {itemCount === 0 ? (
          <div className="text-center py-20">
            <img src="/logo.png" alt="Food Turtle" className="w-16 h-16 object-contain mb-4 opacity-60 mx-auto" />
            <p className="font-bold text-turtle-dark mb-2">{t("cart_empty_title")}</p>
            <p className="text-sm text-turtle-gray-2 mb-4">{t("cart_empty_subtitle")}</p>
            <Link href="/" className="bg-turtle-pink text-white px-6 py-2.5 rounded-full text-sm font-bold">
              {t("find_restaurants_cta")}
            </Link>
          </div>
        ) : (
          <>
            <div className="space-y-5 mb-4">
              {groups.map((group) => (
                <div key={group.name}>
                  <p className="text-xs font-bold text-turtle-gray-2 uppercase tracking-wide mb-2">{group.name}</p>
                  <div className="space-y-3">
                    {group.items.map((item) => {
                      const name = lang === "bn" ? item.name_bn : item.name_en;
                      return (
                        <div key={item.id} className="bg-white rounded-xl border border-gray-100 p-3 flex gap-3">
                          {item.image && (
                            <img src={item.image} alt={name} className="w-16 h-16 rounded-lg object-cover shrink-0" />
                          )}
                          <div className="flex-1">
                            <p className="font-semibold text-turtle-dark text-sm">{name}</p>
                            <p className="text-sm font-bold text-turtle-pink">Tk {item.price}</p>
                          </div>
                          <div className="flex flex-col items-end gap-2">
                            <button onClick={() => removeItem(item.id)} className="text-turtle-gray-2 hover:text-red-500">
                              <Trash2 size={14} />
                            </button>
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                className="w-7 h-7 rounded-full border border-gray-200 flex items-center justify-center"
                              >
                                <Minus size={12} />
                              </button>
                              <span className="text-sm font-bold">{item.quantity}</span>
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                className="w-7 h-7 rounded-full bg-turtle-pink text-white flex items-center justify-center"
                              >
                                <Plus size={12} />
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-white rounded-xl border border-gray-100 p-4 space-y-2 mb-4">
              <div className="flex justify-between text-sm">
                <span className="text-turtle-gray-2">{t("cart_subtotal")}</span>
                <span className="font-medium">Tk {total}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-turtle-gray-2">{t("cart_delivery_fee")}</span>
                <span className="text-turtle-green font-medium">{t("cart_free")}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-turtle-gray-2">{t("cart_service_fee")}</span>
                <span className="font-medium">Tk {SERVICE_FEE}</span>
              </div>
              <div className="flex justify-between font-bold pt-2 border-t border-gray-100">
                <span>{t("cart_total")}</span>
                <span className="text-turtle-pink">Tk {total + SERVICE_FEE}</span>
              </div>
            </div>

            <Link
              href="/checkout"
              className="block w-full bg-turtle-pink text-white text-center py-4 rounded-full font-bold hover:bg-turtle-pink-light transition-colors"
            >
              {t("cart_review_btn")}
            </Link>
          </>
        )}
      </main>
      <MobileNav />
    </>
  );
}

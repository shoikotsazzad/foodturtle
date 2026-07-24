"use client";

import { useState } from "react";
import Link from "next/link";
import { Trash2, Plus, Minus, ChevronLeft, ChevronRight, Utensils } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useLanguage } from "@/context/LanguageContext";
import { MenuItem } from "@/types";

interface CartPanelProps {
  otherItems?: MenuItem[];
  restaurantSlug?: string;
}

export default function CartPanel({ otherItems = [], restaurantSlug }: CartPanelProps) {
  const { items, removeItem, updateQuantity, total, itemCount } = useCart();
  const { t, lang } = useLanguage();
  const [pickupMode, setPickupMode] = useState(false);
  const [cutlery, setCutlery] = useState(false);
  const SERVICE_FEE = 5;

  const popularItems = otherItems.filter(
    (item) => !items.find((ci) => ci.id === item.id)
  ).slice(0, 5);

  return (
    <div className="w-72 shrink-0 hidden lg:block">
      <div className="sticky top-24 bg-white rounded-xl border border-gray-100 overflow-hidden shadow-sm">
        {/* Delivery/Pickup toggle */}
        <div className="flex border-b border-gray-100">
          <button
            onClick={() => setPickupMode(false)}
            className={`flex-1 py-3 text-sm font-semibold transition-colors ${
              !pickupMode ? "text-turtle-pink border-b-2 border-turtle-pink" : "text-turtle-gray-2"
            }`}
          >
            {t("cart_delivery")}
          </button>
          <button
            onClick={() => setPickupMode(true)}
            className={`flex-1 py-3 text-sm transition-colors ${
              pickupMode ? "text-turtle-dark font-semibold" : "text-turtle-gray-2"
            }`}
          >
            {t("cart_pickup")}
            {pickupMode && (
              <div className="text-[10px] text-turtle-gray-2 font-normal">{t("cart_pickup_unavailable")}</div>
            )}
          </button>
        </div>

        {/* Delivery time */}
        {!pickupMode && (
          <div className="px-4 py-2 bg-turtle-gray text-xs text-turtle-gray-2">
            Standard (15 – 30 mins)
          </div>
        )}

        <div className="p-4">
          {itemCount === 0 ? (
            /* Empty state */
            <div className="text-center py-6">
              <img src="/logo.png" alt="Food Turtle" className="w-14 h-14 object-contain mb-3 opacity-60 mx-auto" />
              <p className="font-bold text-turtle-dark text-sm">{t("cart_empty_title")}</p>
              <p className="text-xs text-turtle-gray-2 mt-1">{t("cart_empty_subtitle")}</p>
            </div>
          ) : (
            <div className="space-y-3">
              {/* Your items heading */}
              <p className="text-sm font-bold text-turtle-dark">{t("cart_panel_your_items")}</p>

              {/* Cart items */}
              {items.map((item) => {
                const name = lang === "bn" ? item.name_bn : item.name_en;
                return (
                  <div key={item.id} className="flex items-center gap-2">
                    {item.image && (
                      <img src={item.image} alt={name} className="w-10 h-10 rounded-lg object-cover shrink-0" />
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium text-turtle-dark truncate">{name}</p>
                      <p className="text-xs text-turtle-pink font-bold">
                        Tk {item.price}
                        {item.original_price > item.price && (
                          <s className="text-turtle-gray-2 ml-1">Tk {item.original_price}</s>
                        )}
                      </p>
                    </div>
                    <div className="flex items-center gap-1 shrink-0">
                      <button
                        onClick={() => removeItem(item.id)}
                        className="p-1 text-turtle-gray-2 hover:text-red-500"
                      >
                        <Trash2 size={12} />
                      </button>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-6 h-6 rounded-full border border-gray-200 flex items-center justify-center hover:border-turtle-pink"
                      >
                        <Minus size={10} />
                      </button>
                      <span className="text-xs font-bold w-4 text-center">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-6 h-6 rounded-full bg-turtle-pink text-white flex items-center justify-center"
                      >
                        <Plus size={10} />
                      </button>
                    </div>
                  </div>
                );
              })}

              {/* Popular with your order */}
              {popularItems.length > 0 && (
                <div className="pt-2 border-t border-gray-100">
                  <p className="text-xs font-bold text-turtle-dark mb-1">{t("cart_popular_with_order")}</p>
                  <p className="text-[10px] text-turtle-gray-2 mb-2">{t("cart_popular_subtitle")}</p>
                  <div className="flex gap-2 overflow-x-auto scrollbar-hide">
                    {popularItems.map((item) => {
                      const name = lang === "bn" ? item.name_bn : item.name_en;
                      return (
                        <div key={item.id} className="shrink-0 w-20 text-center">
                          {item.image && (
                            <img src={item.image} alt={name} className="w-full h-14 object-cover rounded-lg mb-1" />
                          )}
                          <p className="text-[10px] text-turtle-dark font-medium line-clamp-2">{name}</p>
                          <p className="text-[10px] text-turtle-pink font-bold">Tk {item.price}</p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* PRO banner */}
              <div className="bg-purple-600 text-white rounded-lg p-3">
                <p className="text-xs font-bold">⭐ PRO {t("cart_pro_save")}</p>
                <p className="text-[10px] text-purple-200">{t("cart_pro_subtitle")}</p>
              </div>

              {/* Free delivery badge */}
              <div className="flex items-center gap-2 bg-green-50 rounded-lg p-2">
                <span className="text-turtle-green text-sm">✓</span>
                <p className="text-xs text-turtle-green font-medium">{t("cart_free_delivery_badge")}</p>
              </div>

              {/* Cutlery toggle */}
              <div className="flex items-start gap-2 py-1">
                <Utensils size={14} className="text-turtle-gray-2 mt-0.5 shrink-0" />
                <div className="flex-1">
                  <p className="text-xs font-medium text-turtle-dark">{t("cart_cutlery")}</p>
                  <p className="text-[10px] text-turtle-gray-2">{t("cart_cutlery_off")}</p>
                </div>
                <button
                  onClick={() => setCutlery(!cutlery)}
                  className={`w-8 h-4 rounded-full transition-colors shrink-0 ${
                    cutlery ? "bg-turtle-pink" : "bg-gray-200"
                  }`}
                />
              </div>

              {/* Price breakdown */}
              <div className="border-t border-gray-100 pt-3 space-y-1.5">
                <div className="flex justify-between text-xs">
                  <span className="text-turtle-gray-2">{t("cart_subtotal")}</span>
                  <span className="text-turtle-dark font-medium">Tk {total}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-turtle-gray-2">{t("cart_delivery_fee")}</span>
                  <span className="text-turtle-green font-medium">
                    <s className="text-turtle-gray-2 mr-1">Tk 49</s>
                    {t("cart_free")}
                  </span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-turtle-gray-2">{t("cart_service_fee")}</span>
                  <span className="text-turtle-dark font-medium">Tk {SERVICE_FEE}</span>
                </div>
              </div>

              <div className="flex justify-between items-baseline border-t border-gray-100 pt-2">
                <div>
                  <span className="text-sm font-bold text-turtle-dark">{t("cart_total")}</span>
                  <span className="text-[10px] text-turtle-gray-2 ml-1">({t("cart_total_note")})</span>
                </div>
                <span className="text-base font-bold text-turtle-pink">Tk {total + SERVICE_FEE}</span>
              </div>

              <Link
                href="/checkout"
                className="block w-full bg-turtle-pink text-white text-center py-3 rounded-full text-sm font-bold hover:bg-turtle-pink-light transition-colors"
              >
                {t("cart_review_btn")}
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

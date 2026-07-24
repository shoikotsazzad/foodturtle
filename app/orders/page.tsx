"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import MobileNav from "@/components/layout/MobileNav";
import Footer from "@/components/layout/Footer";
import { useLanguage } from "@/context/LanguageContext";
import { useCart } from "@/context/CartContext";
import { FakeOrder } from "@/types";

export default function OrdersPage() {
  const { t, lang } = useLanguage();
  const { addItem } = useCart();
  const [orders, setOrders] = useState<FakeOrder[]>([]);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("ft_orders");
      if (saved) setOrders(JSON.parse(saved));
    } catch {}
  }, []);

  const handleReorder = (order: FakeOrder) => {
    order.items.forEach((item) => addItem({ ...item }));
  };

  return (
    <>
      <Navbar />
      <main className="max-w-3xl mx-auto px-4 py-6 pb-20 sm:pb-6">
        <h1 className="text-2xl font-bold text-turtle-dark mb-6">{t("orders_title")}</h1>
        {orders.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">📦</div>
            <h2 className="text-xl font-bold text-turtle-dark mb-2">{t("orders_empty_title")}</h2>
            <p className="text-sm text-turtle-gray-2">{t("orders_empty_subtitle")}</p>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => {
              const name = lang === "bn" ? order.restaurant_name_bn : order.restaurant_name_en;
              return (
                <div key={order.id} className="bg-white rounded-xl border border-gray-100 p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <p className="font-bold text-turtle-dark">{name}</p>
                      <p className="text-xs text-turtle-gray-2">
                        {new Date(order.date).toLocaleDateString()} · #{order.id}
                      </p>
                    </div>
                    <span className="text-xs bg-turtle-pink-bg text-turtle-pink px-2 py-1 rounded-full font-medium">
                      {t("orders_status")}
                    </span>
                  </div>
                  <div className="text-sm text-turtle-gray-2 mb-3">
                    {order.items.map((item) => {
                      const itemName = lang === "bn" ? item.name_bn : item.name_en;
                      return `${item.quantity}× ${itemName}`;
                    }).join(", ")}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-turtle-dark">
                      {t("orders_total")}: Tk {order.total}
                    </span>
                    <button
                      onClick={() => handleReorder(order)}
                      className="text-sm text-turtle-pink font-semibold hover:underline"
                    >
                      {t("orders_reorder")}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>
      <Footer />
      <MobileNav />
    </>
  );
}

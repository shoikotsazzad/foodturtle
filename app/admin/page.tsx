"use client";

import { useMemo } from "react";
import Link from "next/link";
import {
  UtensilsCrossed,
  Pizza,
  ShoppingCart,
  Ticket,
  Plus,
  Users,
  Eye,
  Radio,
  UserPlus,
  LogIn,
  Package,
  Banknote,
  Store,
  ShoppingBag,
  AlertTriangle,
  Trophy,
} from "lucide-react";
import { useRestaurants, useVouchers } from "@/lib/hooks";
import { useAdminStats } from "@/lib/useAdminStats";
import { SEED_MENU_ITEMS, getMenuItemsForRestaurant } from "@/lib/seed-data";
import { PRODUCTS } from "@/lib/turtlemart-data";
import { SHOPS } from "@/lib/shops-data";
import WeeklyTrendChart from "@/components/admin/WeeklyTrendChart";

export default function AdminDashboard() {
  const { restaurants } = useRestaurants();
  const vouchers = useVouchers();
  const stats = useAdminStats();

  // Mirrors the per-restaurant fallback logic in lib/hooks.ts's useMenuItems:
  // prefer hand-authored SEED_MENU_ITEMS for a restaurant, else the
  // template-generated count, so this total matches what visitors actually see.
  const totalMenuItems = useMemo(() => {
    return restaurants.reduce((sum, r) => {
      const named = SEED_MENU_ITEMS.filter((i) => i.restaurant_slug === r.slug).length;
      return sum + (named > 0 ? named : getMenuItemsForRestaurant(r).length);
    }, 0);
  }, [restaurants]);

  const liveKpis = [
    { label: "Visitors", value: stats.summary.visitors, icon: Users, color: "bg-turtle-pink" },
    { label: "Page Views", value: stats.summary.pageViews, icon: Eye, color: "bg-purple-500" },
    { label: "Live Now", value: stats.liveNow, icon: Radio, color: "bg-turtle-green", live: true },
    { label: "Signups", value: stats.summary.signups, icon: UserPlus, color: "bg-blue-500" },
    { label: "Logins", value: stats.summary.logins, icon: LogIn, color: "bg-indigo-500" },
    { label: "Fake Orders", value: stats.summary.ordersPlaced, icon: ShoppingCart, color: "bg-turtle-yellow" },
    { label: "Items Ordered", value: stats.summary.itemsOrdered, icon: Package, color: "bg-orange-500" },
    { label: "Fake Revenue", value: `Tk ${stats.summary.revenue}`, icon: Banknote, color: "bg-teal-500" },
  ];

  const catalogCounts = [
    { label: "Restaurants", value: restaurants.length, icon: UtensilsCrossed, color: "bg-turtle-pink" },
    { label: "Menu Items", value: totalMenuItems, icon: Pizza, color: "bg-purple-500" },
    { label: "Turtlemart Products", value: PRODUCTS.length, icon: ShoppingBag, color: "bg-turtle-green" },
    { label: "Shops", value: SHOPS.length, icon: Store, color: "bg-blue-500" },
    { label: "Active Vouchers", value: vouchers.length, icon: Ticket, color: "bg-turtle-yellow" },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-turtle-dark mb-1">Dashboard</h1>
      <p className="text-sm text-turtle-gray-2 mb-6">Live stats for the whole app, not just this browser.</p>

      {!stats.configured && (
        <div className="flex items-start gap-3 bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6">
          <AlertTriangle size={18} className="text-amber-600 shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-semibold text-amber-800">Analytics is running on placeholder numbers</p>
            <p className="text-xs text-amber-700 mt-0.5">
              Firestore isn&apos;t connected yet, so visitors, page views, live-now, signups and logins are showing
              as 0 (fake orders below still reflect this browser&apos;s own local history). Paste{" "}
              <code className="bg-amber-100 px-1 rounded">firestore.rules</code> into your Firebase console to turn
              on real tracking. Your real food still won&apos;t arrive either way.
            </p>
          </div>
        </div>
      )}

      {/* Live KPI row */}
      <h2 className="text-xs font-bold text-turtle-gray-2 uppercase tracking-wide mb-3">Live activity</h2>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        {liveKpis.map(({ label, value, icon: Icon, color, live }) => (
          <div key={label} className="bg-white rounded-xl border border-gray-100 p-4">
            <div className="flex items-center justify-between mb-3">
              <div className={`w-10 h-10 ${color} rounded-xl flex items-center justify-center`}>
                <Icon size={20} className="text-white" />
              </div>
              {live && (
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-turtle-green opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-turtle-green" />
                </span>
              )}
            </div>
            <p className="text-2xl font-bold text-turtle-dark">{value}</p>
            <p className="text-sm text-turtle-gray-2">{label}</p>
          </div>
        ))}
      </div>

      {/* Catalog counts */}
      <h2 className="text-xs font-bold text-turtle-gray-2 uppercase tracking-wide mb-3">Catalog</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
        {catalogCounts.map(({ label, value, icon: Icon, color }) => (
          <div key={label} className="bg-white rounded-xl border border-gray-100 p-4">
            <div className={`w-10 h-10 ${color} rounded-xl flex items-center justify-center mb-3`}>
              <Icon size={20} className="text-white" />
            </div>
            <p className="text-2xl font-bold text-turtle-dark">{value}</p>
            <p className="text-sm text-turtle-gray-2">{label}</p>
          </div>
        ))}
      </div>

      {/* Trend + leaderboard */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-4 mb-8">
        <div className="bg-white rounded-xl border border-gray-100 p-5">
          <h2 className="text-lg font-bold text-turtle-dark mb-4">Last 7 days</h2>
          <WeeklyTrendChart data={stats.dailyStats} />
        </div>

        <div className="bg-white rounded-xl border border-gray-100 p-5">
          <div className="flex items-center gap-2 mb-4">
            <Trophy size={18} className="text-turtle-yellow" />
            <h2 className="text-lg font-bold text-turtle-dark">Top restaurants</h2>
          </div>
          {stats.leaderboard.length === 0 ? (
            <p className="text-sm text-turtle-gray-2">No order data yet.</p>
          ) : (
            <div className="space-y-3">
              {stats.leaderboard.map((entry, i) => (
                <div key={entry.id} className="flex items-center gap-3">
                  <span className="w-5 text-sm font-bold text-turtle-gray-2">{i + 1}</span>
                  <span className="flex-1 text-sm font-medium text-turtle-dark truncate">{entry.name}</span>
                  <span className="text-sm font-bold text-turtle-pink">{entry.orders}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Quick actions */}
      <h2 className="text-lg font-bold text-turtle-dark mb-3">Quick Actions</h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {[
          { label: "Add Restaurant", href: "/admin/restaurants", color: "bg-turtle-pink" },
          { label: "Add Menu Item", href: "/admin/menu-items", color: "bg-purple-500" },
          { label: "Add Banner", href: "/admin/banners", color: "bg-turtle-green" },
        ].map(({ label, href, color }) => (
          <Link
            key={label}
            href={href}
            className={`${color} text-white rounded-xl p-4 flex items-center gap-2 font-semibold text-sm hover:opacity-90 transition-opacity`}
          >
            <Plus size={18} />
            {label}
          </Link>
        ))}
      </div>

      {/* Restaurant list preview */}
      <div className="mt-8">
        <h2 className="text-lg font-bold text-turtle-dark mb-3">Recent Restaurants</h2>
        <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 text-xs text-turtle-gray-2 uppercase">
              <tr>
                <th className="text-left px-4 py-3">Name</th>
                <th className="text-left px-4 py-3">Cuisine</th>
                <th className="text-left px-4 py-3">Rating</th>
                <th className="text-left px-4 py-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {restaurants.slice(0, 5).map((r) => (
                <tr key={r.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm font-medium text-turtle-dark">{r.name_en}</td>
                  <td className="px-4 py-3 text-sm text-turtle-gray-2">{r.cuisine_en[0]}</td>
                  <td className="px-4 py-3 text-sm text-turtle-dark">⭐ {r.rating}</td>
                  <td className="px-4 py-3">
                    <span className={`text-xs px-2 py-1 rounded-full font-medium ${r.is_active ? "bg-green-100 text-turtle-green" : "bg-gray-100 text-turtle-gray-2"}`}>
                      {r.is_active ? "Active" : "Inactive"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

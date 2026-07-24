"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  UtensilsCrossed,
  Pizza,
  ShoppingCart,
  Store,
  ImageIcon,
  Ticket,
  Settings,
  LogOut,
  ExternalLink,
} from "lucide-react";

const NAV_ITEMS = [
  { href: "/admin", icon: LayoutDashboard, label: "Dashboard" },
  { href: "/admin/restaurants", icon: UtensilsCrossed, label: "Restaurants" },
  { href: "/admin/menu-items", icon: Pizza, label: "Menu Items" },
  { href: "/admin/turtlemart", icon: ShoppingCart, label: "Turtlemart" },
  { href: "/admin/shops", icon: Store, label: "Shops" },
  { href: "/admin/banners", icon: ImageIcon, label: "Banners" },
  { href: "/admin/fake-vouchers", icon: Ticket, label: "Vouchers" },
  { href: "/admin/settings", icon: Settings, label: "Settings" },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [checked, setChecked] = useState(false);
  const isLoginPage = pathname === "/admin/login";

  // ALL hooks called unconditionally before any early returns — Rules of Hooks
  useEffect(() => {
    if (isLoginPage) return;
    const session = localStorage.getItem("ft_admin_session");
    if (!session) {
      router.replace("/admin/login");
    } else {
      setChecked(true);
    }
  }, [router, isLoginPage]);

  const handleLogout = () => {
    localStorage.removeItem("ft_admin_session");
    router.push("/admin/login");
  };

  // Early returns AFTER all hooks
  if (isLoginPage) return <>{children}</>;

  if (!checked) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="w-6 h-6 border-2 border-turtle-pink border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <aside className="w-56 bg-turtle-dark text-white flex flex-col shrink-0">
        <div className="p-4 border-b border-white/10">
          <div className="flex items-center gap-2">
            <Image src="/logo.png" alt="Food Turtle" width={100} height={34} style={{ height: 32, width: "auto" }} className="object-contain brightness-0 invert" />
            <span className="text-sm font-semibold text-white leading-tight">
              Food Turtle<br /><span className="text-[10px] text-gray-400 font-normal">Admin</span>
            </span>
          </div>
        </div>
        <nav className="flex-1 p-2 overflow-y-auto">
          {NAV_ITEMS.map(({ href, icon: Icon, label }) => {
            const isActive = pathname === href;
            return (
              <Link key={href} href={href} className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm mb-0.5 transition-colors ${isActive ? "bg-turtle-pink text-white" : "text-gray-300 hover:bg-white/10"}`}>
                <Icon size={16} />
                {label}
              </Link>
            );
          })}
        </nav>
        <div className="p-2 border-t border-white/10 space-y-0.5">
          <Link href="/" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-gray-300 hover:bg-white/10 transition-colors">
            <ExternalLink size={16} />
            View Site
          </Link>
          <button onClick={handleLogout} className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-red-400 hover:bg-red-500/10 transition-colors w-full">
            <LogOut size={16} />
            Sign Out
          </button>
        </div>
      </aside>
      <main className="flex-1 overflow-auto">
        <div className="p-6">{children}</div>
      </main>
    </div>
  );
}

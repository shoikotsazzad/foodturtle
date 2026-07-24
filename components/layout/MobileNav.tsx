"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Search, Package, Heart, User } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

const TABS = [
  { href: "/", icon: Home, labelKey: "mobile_nav_home" as const },
  { href: "/search", icon: Search, labelKey: "mobile_nav_search" as const },
  { href: "/orders", icon: Package, labelKey: "mobile_nav_orders" as const },
  { href: "/favourites", icon: Heart, labelKey: "mobile_nav_favourites" as const },
  { href: "/profile", icon: User, labelKey: "mobile_nav_profile" as const },
];

export default function MobileNav() {
  const pathname = usePathname();
  const { t } = useLanguage();

  if (pathname.startsWith("/admin")) return null;

  return (
    <nav className="sm:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 z-40 safe-area-pb">
      <div className="flex">
        {TABS.map(({ href, icon: Icon, labelKey }) => {
          const isActive = href === "/" ? pathname === "/" : pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              className={`flex-1 flex flex-col items-center gap-0.5 py-2 transition-colors ${
                isActive ? "text-turtle-pink" : "text-turtle-gray-2"
              }`}
            >
              <Icon size={22} />
              <span className="text-[10px] font-medium">{t(labelKey)}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

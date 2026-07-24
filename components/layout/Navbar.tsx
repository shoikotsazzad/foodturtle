"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  MapPin,
  Clock,
  ShoppingCart,
  Heart,
  ChevronDown,
  User,
  Package,
  LogOut,
  Gift,
  HelpCircle,
  Star,
  Wallet,
  Bike,
  Store,
  Crown,
  WalletCards,
  Search,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { useCart } from "@/context/CartContext";
import { useUser } from "@/context/UserContext";
import LanguageToggle from "@/components/shared/LanguageToggle";
import AddressModal from "@/components/shared/AddressModal";
import LoginModal from "@/components/shared/LoginModal";
import RunningIcon from "@/components/shared/RunningIcon";

const TABS = [
  { key: "delivery", href: "/", icon: Bike, labelKey: "nav_delivery" as const },
  { key: "pickup", href: "/pickup", icon: RunningIcon, labelKey: "nav_pickup" as const },
  { key: "turtlemart", href: "/turtlemart", icon: WalletCards, labelKey: "nav_turtlemart" as const },
  { key: "shops", href: "/shops", icon: Store, labelKey: "nav_shops" as const },
];

const SEARCH_PLACEHOLDERS: Record<string, string> = {
  "/": "Search for restaurants, cuisines, and dishes",
  "/pickup": "Search for restaurants, cuisines, and dishes",
  "/turtlemart": "Search products",
  "/shops": "Search for shops, categories, and products",
};

export default function Navbar() {
  const { t } = useLanguage();
  const { itemCount } = useCart();
  const { user, isLoggedIn, logout } = useUser();
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [showAddress, setShowAddress] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [searchValue, setSearchValue] = useState(searchParams.get("q") ?? "");

  const searchPlaceholder = SEARCH_PLACEHOLDERS[pathname];

  useEffect(() => {
    setSearchValue(searchParams.get("q") ?? "");
  }, [pathname, searchParams]);

  useEffect(() => {
    if (!searchPlaceholder) return;
    const handle = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());
      if (searchValue) params.set("q", searchValue);
      else params.delete("q");
      const qs = params.toString();
      router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, 250);
    return () => clearTimeout(handle);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchValue]);

  const isAdmin = pathname.startsWith("/admin");
  if (isAdmin) return null;

  const isRestaurantPage = pathname.startsWith("/restaurant/");

  return (
    <>
      <header className="bg-white shadow-sm sticky top-0 z-40">
        {/* Top row */}
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 shrink-0">
              <Image src="/logo.png" alt="Food Turtle" width={36} height={36} className="w-8 h-8 sm:w-9 sm:h-9 object-contain" priority />
              <span className="font-bold text-xl tracking-tight lowercase" style={{ color: "#FF2B85" }}>
                foodturtle
              </span>
            </Link>

            {/* Address (center on desktop) */}
            <button
              onClick={() => setShowAddress(true)}
              className="hidden md:flex items-center gap-1.5 px-3 py-2 hover:bg-turtle-gray rounded-lg transition-colors max-w-xs"
            >
              <MapPin size={16} className="text-turtle-pink shrink-0" />
              <span className="text-sm font-medium text-turtle-dark truncate">
                {user.address || t("nav_address_placeholder")}
              </span>
              <ChevronDown size={14} className="text-turtle-gray-2 shrink-0" />
            </button>

            {/* Time indicator — only on restaurant pages */}
            {isRestaurantPage && (
              <div className="hidden md:flex items-center gap-1.5 px-3 py-1.5 border border-gray-200 rounded-full text-sm text-turtle-dark">
                <Clock size={14} className="text-turtle-gray-2" />
                <span>Time Standard</span>
              </div>
            )}

            {/* Right nav */}
            <div className="flex items-center gap-1 sm:gap-2">
              {isLoggedIn ? (
                /* Logged-in user menu */
                <div className="relative">
                  <button
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className="hidden sm:flex items-center gap-1.5 px-2 py-1.5 hover:bg-turtle-gray rounded-lg text-sm font-medium text-turtle-dark transition-colors"
                  >
                    <User size={16} />
                    <span className="hidden lg:block max-w-[100px] truncate">
                      {user.name}
                    </span>
                    <ChevronDown size={14} className="text-turtle-gray-2" />
                  </button>

                  {showUserMenu && (
                    <>
                      <div className="fixed inset-0 z-10 bg-black/40 transition-opacity" onClick={() => setShowUserMenu(false)} />
                      <div className="absolute right-0 top-full mt-2 w-64 bg-white rounded-xl shadow-xl border border-gray-100 z-20 overflow-hidden animate-fade-in">
                        <div className="p-3 border-b border-gray-100">
                          <p className="text-xs text-turtle-gray-2">Signed in as</p>
                          <p className="text-sm font-semibold text-turtle-dark truncate">{user.name}</p>
                          <p className="text-xs text-turtle-gray-2 truncate">{user.email}</p>
                        </div>
                        {[
                          { icon: Wallet, labelKey: "user_menu_pay" as const, href: "/turtle-pay" },
                          { icon: Crown, labelKey: "user_menu_subscribe" as const, href: "/turtle-pro" },
                          { icon: Package, labelKey: "user_menu_orders" as const, href: "/orders" },
                          { icon: User, labelKey: "user_menu_profile" as const, href: "/profile" },
                          { icon: Gift, labelKey: "user_menu_vouchers" as const, href: "/vouchers" },
                          { icon: Star, labelKey: "user_menu_rewards" as const, href: "/rewards" },
                          { icon: HelpCircle, labelKey: "user_menu_help" as const, href: "/help" },
                        ].map(({ icon: Icon, labelKey, href }) => (
                          <Link
                            key={labelKey}
                            href={href}
                            onClick={() => setShowUserMenu(false)}
                            className="flex items-center gap-3 px-4 py-2.5 text-sm text-turtle-dark hover:bg-turtle-gray transition-colors"
                          >
                            <Icon size={16} className="text-turtle-gray-2" />
                            {t(labelKey)}
                          </Link>
                        ))}
                        <div className="border-t border-gray-100">
                          <button
                            onClick={() => { logout(); setShowUserMenu(false); }}
                            className="flex items-center gap-3 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 w-full transition-colors"
                          >
                            <LogOut size={16} />
                            {t("user_menu_logout")}
                          </button>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              ) : (
                /* Sign-in button */
                <button
                  onClick={() => setShowLogin(true)}
                  className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 border border-turtle-pink text-turtle-pink hover:bg-turtle-pink-bg rounded-full text-sm font-medium transition-colors"
                >
                  <User size={15} />
                  Sign In
                </button>
              )}

              <LanguageToggle />

              <Link
                href="/favourites"
                className="p-2 hover:bg-turtle-gray rounded-lg transition-colors hidden sm:block"
              >
                <Heart size={20} className="text-turtle-dark" />
              </Link>

              <Link href="/cart" className="relative p-2 hover:bg-turtle-gray rounded-lg transition-colors">
                <ShoppingCart size={20} className="text-turtle-dark" />
                {itemCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-4.5 h-4.5 min-w-[18px] min-h-[18px] bg-turtle-pink text-white text-[10px] font-bold rounded-full flex items-center justify-center leading-none px-0.5">
                    {itemCount}
                  </span>
                )}
              </Link>
            </div>
          </div>

          {/* Mobile address bar */}
          <button
            onClick={() => setShowAddress(true)}
            className="md:hidden flex items-center gap-1.5 pb-2 w-full"
          >
            <MapPin size={14} className="text-turtle-pink shrink-0" />
            <span className="text-sm font-medium text-turtle-dark truncate">
              {user.address || t("nav_address_placeholder")}
            </span>
            <ChevronDown size={12} className="text-turtle-gray-2 shrink-0" />
          </button>
        </div>

        {/* Mode tabs — search bar lives on this same row, right-aligned */}
        {!pathname.startsWith("/checkout") && !pathname.startsWith("/order-placed") && !pathname.startsWith("/admin") && (
          <div className="border-t border-gray-100">
            <div className="max-w-7xl mx-auto px-4">
              <div className="flex items-center justify-between gap-4">
                <div className="flex overflow-x-auto scrollbar-hide">
                  {TABS.map(({ key, href, icon: Icon, labelKey }) => {
                    const isActive =
                      key === "delivery"
                        ? pathname === "/"
                        : pathname.startsWith(href);
                    return (
                      <Link
                        key={key}
                        href={href}
                        className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 whitespace-nowrap transition-colors shrink-0 ${
                          isActive
                            ? "border-turtle-pink text-turtle-pink"
                            : "border-transparent text-turtle-gray-2 hover:text-turtle-dark"
                        }`}
                      >
                        <Icon size={16} />
                        {t(labelKey)}
                      </Link>
                    );
                  })}
                </div>

                {/* Search — context-aware, only on the 4 list pages, desktop only */}
                {searchPlaceholder && (
                  <div className="hidden md:block w-full max-w-xs shrink-0">
                    <div className="relative">
                      <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-turtle-gray-2" />
                      <input
                        type="text"
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)}
                        placeholder={searchPlaceholder}
                        className="w-full pl-9 pr-3 py-1.5 bg-turtle-gray rounded-full text-sm focus:outline-none focus:ring-1 focus:ring-turtle-pink placeholder:text-turtle-gray-2"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Mobile search — no room on the tab row, own line below */}
              {searchPlaceholder && (
                <div className="md:hidden relative pb-2.5">
                  <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 -mt-1.5 text-turtle-gray-2" />
                  <input
                    type="text"
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    placeholder={searchPlaceholder}
                    className="w-full pl-9 pr-3 py-2 bg-turtle-gray rounded-full text-sm focus:outline-none focus:ring-1 focus:ring-turtle-pink placeholder:text-turtle-gray-2"
                  />
                </div>
              )}
            </div>
          </div>
        )}
      </header>

      {showAddress && <AddressModal onClose={() => setShowAddress(false)} />}
      {showLogin && <LoginModal onClose={() => setShowLogin(false)} />}
    </>
  );
}

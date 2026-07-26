"use client";

import Link from "next/link";
import { X, Wallet, Crown, Package, User, Gift, Star, Globe, HelpCircle, LogOut, ChevronRight } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { useUser } from "@/context/UserContext";

const MENU_ITEMS = [
  { icon: Wallet, labelKey: "user_menu_pay" as const, href: "/turtle-pay" },
  { icon: Crown, labelKey: "user_menu_subscribe" as const, href: "/turtle-pro" },
  { icon: Package, labelKey: "user_menu_orders" as const, href: "/orders" },
  { icon: User, labelKey: "user_menu_profile" as const, href: "/profile" },
  { icon: Gift, labelKey: "user_menu_vouchers" as const, href: "/vouchers" },
  { icon: Star, labelKey: "user_menu_rewards" as const, href: "/rewards" },
];

interface MobileAccountDrawerProps {
  onClose: () => void;
}

export default function MobileAccountDrawer({ onClose }: MobileAccountDrawerProps) {
  const { t, lang, setLang } = useLanguage();
  const { logout } = useUser();

  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="absolute left-0 top-0 bottom-0 w-[80%] max-w-[300px] bg-white shadow-xl animate-slide-in-left flex flex-col safe-area-pb">
        <div className="flex items-center justify-end p-3 border-b border-gray-100 shrink-0">
          <button onClick={onClose} className="p-1.5 hover:bg-turtle-gray rounded-full">
            <X size={20} className="text-turtle-gray-2" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto py-2">
          {MENU_ITEMS.map(({ icon: Icon, labelKey, href }) => (
            <Link
              key={labelKey}
              href={href}
              onClick={onClose}
              className="flex items-center gap-3 px-4 py-3.5 text-sm font-medium text-turtle-dark hover:bg-turtle-gray transition-colors"
            >
              <Icon size={18} className="text-turtle-gray-2 shrink-0" />
              {t(labelKey)}
            </Link>
          ))}

          <button
            onClick={() => setLang(lang === "en" ? "bn" : "en")}
            className="w-full flex items-center gap-3 px-4 py-3.5 text-sm font-medium text-turtle-dark hover:bg-turtle-gray transition-colors"
          >
            <Globe size={18} className="text-turtle-gray-2 shrink-0" />
            <span className="flex-1 text-left">{t("nav_language_label")}</span>
            <span className="text-turtle-gray-2 flex items-center gap-1">
              {lang === "en" ? "English" : "বাংলা"}
              <ChevronRight size={14} />
            </span>
          </button>

          <Link
            href="/help"
            onClick={onClose}
            className="flex items-center gap-3 px-4 py-3.5 text-sm font-medium text-turtle-dark hover:bg-turtle-gray transition-colors"
          >
            <HelpCircle size={18} className="text-turtle-gray-2 shrink-0" />
            {t("user_menu_help")}
          </Link>
        </div>

        <div className="border-t border-gray-100 shrink-0">
          <button
            onClick={() => { logout(); onClose(); }}
            className="w-full flex items-center gap-3 px-4 py-3.5 text-sm font-medium text-red-500 hover:bg-red-50 transition-colors"
          >
            <LogOut size={18} />
            {t("user_menu_logout")}
          </button>
        </div>
      </div>
    </div>
  );
}

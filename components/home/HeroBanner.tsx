"use client";

import { Sparkles } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { useUser } from "@/context/UserContext";

const CUISINE_PILLS = [
  { key: "cuisine_biryani" as const, value: "Biryani" },
  { key: "cuisine_pizza" as const, value: "Pizza" },
  { key: "cuisine_burger" as const, value: "Burger" },
  { key: "cuisine_kacchi" as const, value: "Kacchi" },
  { key: "cuisine_fuchka" as const, value: "Fuchka" },
  { key: "cuisine_bangladeshi" as const, value: "Bangladeshi" },
];

function getGreeting(t: (key: any) => string): string {
  const hour = new Date().getHours();
  if (hour >= 5 && hour < 12) return t("greeting_morning");
  if (hour >= 12 && hour < 17) return t("greeting_afternoon");
  if (hour >= 17 && hour < 21) return t("greeting_evening");
  return t("greeting_night");
}

interface HeroBannerProps {
  onCuisineFilter: (cuisine: string) => void;
  activeCuisine: string;
}

export default function HeroBanner({ onCuisineFilter, activeCuisine }: HeroBannerProps) {
  const { t } = useLanguage();
  const { user } = useUser();
  const greeting = getGreeting(t);
  const firstName = user.name ? user.name.split(" ")[0] : "";

  return (
    <div
      className="relative overflow-hidden rounded-2xl mb-6"
      style={{ background: "linear-gradient(135deg, #FF2B85 0%, #FF6BAE 100%)" }}
    >
      <div className="relative z-10 p-6 md:p-8 flex items-center justify-between">
        <div className="flex-1">
          <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-1 tracking-tight">
            {greeting}{firstName ? `, ${firstName}` : ""}!
          </h1>
          <p className="text-white/85 text-sm md:text-base mb-4">
            {t("craving_question")}
          </p>

          {/* Cuisine pills */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => onCuisineFilter("")}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-colors ${
                activeCuisine === ""
                  ? "bg-white text-turtle-pink"
                  : "bg-white/20 text-white hover:bg-white/30"
              }`}
            >
              {t("cuisine_all")}
            </button>
            {CUISINE_PILLS.map(({ key, value }) => (
              <button
                key={value}
                onClick={() => onCuisineFilter(value)}
                className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-semibold transition-colors ${
                  activeCuisine === value
                    ? "bg-white text-turtle-pink"
                    : "bg-white/20 text-white hover:bg-white/30"
                }`}
              >
                <Sparkles size={10} className={activeCuisine === value ? "text-turtle-pink" : "text-white/80"} />
                {t(key)}
              </button>
            ))}
          </div>
        </div>

        {/* Turtle illustration */}
        <div className="hidden md:flex ml-6 select-none shrink-0" aria-hidden>
          <img src="/logo.png" alt="" className="w-24 h-24 object-contain drop-shadow-lg" />
        </div>
      </div>

      {/* Decorative circles */}
      <div className="absolute -right-8 -top-8 w-40 h-40 bg-white/10 rounded-full" />
      <div className="absolute -right-4 -bottom-12 w-32 h-32 bg-white/5 rounded-full" />
    </div>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";
import { Gift, ChevronLeft, ChevronRight } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { Restaurant } from "@/types";
import RestaurantCard from "./RestaurantCard";

const ACTIVE_SECS = 30 * 60; // real 30 minute countdown
const START_KEY = "ft_promo_started_at";

function getRemaining(startedAt: number): number {
  const elapsed = Math.floor((Date.now() - startedAt) / 1000);
  return Math.max(0, ACTIVE_SECS - elapsed);
}

// Persisted in sessionStorage (not local state) so the countdown keeps
// running across page navigation within the same tab — it only resets when
// the tab is closed or a fresh tab opens, since sessionStorage is tab-scoped.
function useCountdown() {
  const [secs, setSecs] = useState(ACTIVE_SECS);

  useEffect(() => {
    let startedAt = Date.now();
    try {
      const stored = sessionStorage.getItem(START_KEY);
      if (stored) {
        startedAt = parseInt(stored, 10);
      } else {
        sessionStorage.setItem(START_KEY, String(startedAt));
      }
    } catch {
      // sessionStorage unavailable — countdown just won't persist across navigation
    }

    setSecs(getRemaining(startedAt));

    const id = setInterval(() => {
      const remaining = getRemaining(startedAt);
      setSecs(remaining);
      if (remaining <= 0) clearInterval(id);
    }, 1000);

    return () => clearInterval(id);
  }, []);

  const phase: "active" | "expired" = secs <= 0 ? "expired" : "active";
  return { phase, secs };
}

interface PromoBannerProps {
  restaurants: Restaurant[];
}

export default function PromoBanner({ restaurants }: PromoBannerProps) {
  const { t } = useLanguage();
  const { phase, secs } = useCountdown();
  const scrollerRef = useRef<HTMLDivElement>(null);

  const mm = String(Math.floor(secs / 60)).padStart(2, "0");
  const ss = String(secs % 60).padStart(2, "0");

  const scrollBy = (dir: 1 | -1) => scrollerRef.current?.scrollBy({ left: dir * 320, behavior: "smooth" });

  if (phase === "expired") {
    return (
      <div className="bg-turtle-pink-bg rounded-2xl px-4 py-3 mb-6 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-turtle-pink/15 flex items-center justify-center shrink-0">
            <Gift size={18} className="text-turtle-pink" />
          </div>
          <div>
            <p className="text-sm font-bold text-turtle-dark">{t("hero_promo_title")}</p>
            <p className="text-xs text-turtle-gray-2">{t("hero_promo_subtitle")}</p>
          </div>
        </div>
        <span className="font-mono font-bold text-sm bg-white text-turtle-pink px-2.5 py-1 rounded-md">
          {mm}:{ss}
        </span>
      </div>
    );
  }

  const deals = restaurants.slice(0, 14);

  return (
    <div className="relative bg-turtle-pink-bg rounded-2xl p-4 md:p-5 mb-6">
      <div className="flex items-center justify-between mb-3">
        <div>
          <h2 className="text-lg font-bold text-turtle-dark">{t("hero_promo_active_title")}</h2>
          <p className="text-xs text-turtle-gray-2">{t("hero_promo_active_subtitle")}</p>
        </div>
        <span className="font-mono font-bold text-xl text-turtle-pink">
          {mm}:{ss}
        </span>
      </div>

      {deals.length > 0 && (
        <>
          <button
            onClick={() => scrollBy(-1)}
            aria-label="Scroll left"
            className="hidden sm:flex absolute left-1 top-1/2 translate-y-3 z-10 w-8 h-8 rounded-full bg-white border border-gray-200 shadow items-center justify-center hover:bg-turtle-gray transition-colors"
          >
            <ChevronLeft size={16} className="text-turtle-dark" />
          </button>
          <button
            onClick={() => scrollBy(1)}
            aria-label="Scroll right"
            className="hidden sm:flex absolute right-1 top-1/2 translate-y-3 z-10 w-8 h-8 rounded-full bg-white border border-gray-200 shadow items-center justify-center hover:bg-turtle-gray transition-colors"
          >
            <ChevronRight size={16} className="text-turtle-dark" />
          </button>
          <div ref={scrollerRef} className="flex gap-3 overflow-x-auto scrollbar-hide -mx-1 px-1 pb-1 scroll-smooth">
            {deals.map((r) => (
              <div key={r.id} className="w-52 shrink-0">
                <RestaurantCard restaurant={r} compact />
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

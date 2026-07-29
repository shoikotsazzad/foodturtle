"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import confetti from "canvas-confetti";
import {
  CheckCircle2,
  Phone,
  Utensils,
  Home as HomeIcon,
  Circle,
  Loader2,
  Wallet,
  Droplets,
  Truck,
  Smile,
  BookOpen,
  RotateCcw,
} from "lucide-react";
import PageTitle from "@/components/shared/PageTitle";
import TurtleReceipt from "@/components/order-placed/TurtleReceipt";
import { useLanguage } from "@/context/LanguageContext";
import { useUser } from "@/context/UserContext";
import { jokeBucketForElapsed, pickRandomJoke, pickRider, type Rider, type StatusJoke } from "@/lib/order-placed-data";
import type { CartItem } from "@/types";

interface LastOrder {
  id: string;
  restaurant_name_en: string;
  restaurant_name_bn: string;
  items: CartItem[];
  total: number;
  date: string;
  tip?: number;
  paymentMethod?: string;
}

const SECONDARY_STATS = [
  { key: "order_placed_p4_stat_dishes", icon: Droplets },
  { key: "order_placed_p4_stat_delivery", icon: Truck },
  { key: "order_placed_p4_stat_regrets", icon: Smile },
  { key: "order_placed_p4_stat_story", icon: BookOpen },
] as const;

const STEP_KEYS = [
  "order_placed_p2_step1",
  "order_placed_p2_step2",
  "order_placed_p2_step3",
  "order_placed_p2_step4",
  "order_placed_p2_step5",
] as const;

const TOTAL_SECONDS = 120;
const STEP_THRESHOLDS = [0, 20, 55, 95, 120];
const RESTAURANT_POS = { left: 12, top: 72 };
const HOME_POS = { left: 80, top: 20 };
const RING_RADIUS = 54;
const RING_CIRCUMFERENCE = 2 * Math.PI * RING_RADIUS;

export default function OrderPlacedPage() {
  const { t, lang } = useLanguage();
  const { user } = useUser();

  const [order, setOrder] = useState<LastOrder | null>(null);
  const [remaining, setRemaining] = useState(TOTAL_SECONDS);
  const [showConfirmToast, setShowConfirmToast] = useState(true);
  const [delivered, setDelivered] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const [orderId, setOrderId] = useState("");
  const [rider] = useState<Rider>(() => pickRider());
  const [currentJoke, setCurrentJoke] = useState<StatusJoke>(() => pickRandomJoke("early"));
  const [jokeVisible, setJokeVisible] = useState(true);
  const remainingRef = useRef(TOTAL_SECONDS);

  // Load the just-placed order (random fallback ID only ever generated client-side)
  useEffect(() => {
    let id = `TRT-${Math.floor(Math.random() * 9000 + 1000)}`;
    try {
      const saved = localStorage.getItem("ft_last_order");
      if (saved) {
        const parsed = JSON.parse(saved) as LastOrder;
        setOrder(parsed);
        id = parsed.id;
      }
    } catch {}
    setOrderId(id);
  }, []);

  // Confetti burst on mount, pink and white only
  useEffect(() => {
    const colors = ["#FF2B85", "#ffffff"];
    confetti({ particleCount: 100, spread: 75, origin: { y: 0.3 }, colors });
    const t2 = setTimeout(
      () => confetti({ particleCount: 60, spread: 100, origin: { y: 0.2 }, colors }),
      250
    );
    return () => clearTimeout(t2);
  }, []);

  useEffect(() => {
    const t = setTimeout(() => setShowConfirmToast(false), 2600);
    return () => clearTimeout(t);
  }, []);

  // Single ticking clock drives every piece of state on this page
  useEffect(() => {
    const id = setInterval(() => {
      setRemaining((r) => {
        const next = r <= 1 ? 0 : r - 1;
        remainingRef.current = next;
        if (next === 0) clearInterval(id);
        return next;
      });
    }, 1000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    if (remaining === 0) setDelivered(true);
  }, [remaining]);

  // Each joke stays on screen for 10s, then a new random one from the
  // current wait-time bucket takes its place (never immediately repeating).
  useEffect(() => {
    if (delivered) return;
    const interval = setInterval(() => {
      setJokeVisible(false);
      setTimeout(() => {
        const elapsedNow = TOTAL_SECONDS - remainingRef.current;
        setCurrentJoke((prev) => pickRandomJoke(jokeBucketForElapsed(elapsedNow), prev.id));
        setJokeVisible(true);
      }, 300);
    }, 10000);
    return () => clearInterval(interval);
  }, [delivered]);

  useEffect(() => {
    if (!delivered) return;
    const t = setTimeout(() => setRevealed(true), 1600);
    return () => clearTimeout(t);
  }, [delivered]);

  const elapsed = TOTAL_SECONDS - remaining;
  const progressFrac = elapsed / TOTAL_SECONDS;
  const mm = String(Math.floor(remaining / 60)).padStart(2, "0");
  const ss = String(remaining % 60).padStart(2, "0");
  const stepsDone = STEP_THRESHOLDS.filter((th) => elapsed >= th).length;
  const inPhase3 = remaining <= 15 && remaining > 0;
  const turtleLeft = RESTAURANT_POS.left + (HOME_POS.left - RESTAURANT_POS.left) * progressFrac;
  const turtleTop = RESTAURANT_POS.top + (HOME_POS.top - RESTAURANT_POS.top) * progressFrac;
  const ringOffset = RING_CIRCUMFERENCE * (1 - progressFrac);

  const firstItem = order?.items?.[0];
  const orderTotal = order?.total ?? 0;
  const reorderHref = firstItem?.restaurant_slug ? `/restaurant/${firstItem.restaurant_slug}` : "/";
  const riderName = lang === "bn" ? rider.name_bn : rider.name_en;
  const riderTagline = lang === "bn" ? rider.tagline_bn : rider.tagline_en;
  const riderTitle = lang === "bn" ? rider.title_bn : rider.title_en;
  const riderPhase3 = lang === "bn" ? rider.phase3_bn : rider.phase3_en;
  const jokeText = lang === "bn" ? currentJoke.bn : currentJoke.en;

  return (
    <div className="min-h-screen bg-turtle-gray/40">
      <PageTitle title={t("order_placed_meta_title")} />

      {!delivered && (
        <div className="px-4 py-6">
          <div className="max-w-md mx-auto">
            <div className="flex items-center justify-center md:justify-start gap-2 mb-4">
              <img src="/logo.png" alt="" className="w-8 h-8 object-contain" />
              <span className="font-bold text-xl tracking-tight lowercase" style={{ color: "#FF2B85" }}>foodturtle</span>
            </div>

            {showConfirmToast && (
              <div className="flex items-center gap-3 bg-white rounded-2xl shadow-sm border border-gray-100 p-4 mb-4 animate-fade-up">
                <CheckCircle2 size={28} className="text-turtle-green shrink-0" />
                <div>
                  <p className="font-semibold text-sm text-turtle-dark">{t("order_placed_p1_title")}</p>
                  <p className="text-xs text-turtle-gray-2">{t("order_placed_p1_subtitle")}</p>
                </div>
              </div>
            )}

            {/* Countdown card */}
            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 mb-4 text-center">
              <div className="relative w-32 h-32 mx-auto">
                <svg className="w-32 h-32 -rotate-90" viewBox="0 0 120 120">
                  <circle cx="60" cy="60" r={RING_RADIUS} fill="none" stroke="#F5F5F5" strokeWidth="8" />
                  <circle
                    cx="60"
                    cy="60"
                    r={RING_RADIUS}
                    fill="none"
                    stroke="#FF2B85"
                    strokeWidth="8"
                    strokeLinecap="round"
                    strokeDasharray={RING_CIRCUMFERENCE}
                    strokeDashoffset={ringOffset}
                    style={{ transition: "stroke-dashoffset 1s linear" }}
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-2xl font-bold text-turtle-dark tabular-nums">
                    {mm}:{ss}
                  </span>
                  <span className="text-[10px] text-turtle-gray-2 mt-0.5">{t("order_placed_eta_label")}</span>
                </div>
              </div>
              <h1 className="font-bold text-turtle-dark mt-4">{t("order_placed_p2_heading")}</h1>
              <p className="text-xs text-turtle-gray-2 mt-1">
                {t("order_placed_p1_order_label")} #{orderId} · Tk {orderTotal} {t("order_placed_p2_paid_label")}
              </p>
            </div>

            {/* Map card */}
            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden mb-4">
              <div className="relative h-44 bg-gradient-to-br from-blue-50 to-green-50">
                <svg className="absolute inset-0 w-full h-full opacity-20" viewBox="0 0 400 220">
                  <rect x="0" y="90" width="400" height="6" fill="#aaa" />
                  <rect x="0" y="150" width="400" height="4" fill="#aaa" />
                  <rect x="70" y="0" width="6" height="220" fill="#aaa" />
                  <rect x="180" y="0" width="6" height="220" fill="#aaa" />
                  <rect x="290" y="0" width="4" height="220" fill="#aaa" />
                  <rect x="10" y="10" width="45" height="70" rx="3" fill="#d1d5db" />
                  <rect x="85" y="10" width="85" height="70" rx="3" fill="#d1d5db" />
                  <rect x="195" y="10" width="85" height="70" rx="3" fill="#d1d5db" />
                  <rect x="300" y="10" width="60" height="70" rx="3" fill="#d1d5db" />
                </svg>

                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                  <path
                    d="M 12 72 Q 30 55 50 38 T 80 20"
                    fill="none"
                    stroke="#FF2B85"
                    strokeWidth="0.6"
                    strokeDasharray="2,2"
                    opacity="0.6"
                  />
                </svg>

                <div className="absolute flex flex-col items-center" style={{ left: "12%", top: "72%" }}>
                  <div className="w-6 h-6 rounded-full bg-turtle-dark flex items-center justify-center shadow">
                    <Utensils size={11} className="text-white" />
                  </div>
                  <span className="text-[9px] font-medium text-turtle-dark bg-white/80 rounded px-1 mt-1">
                    {t("order_placed_map_restaurant")}
                  </span>
                </div>

                <div className="absolute flex flex-col items-center" style={{ left: "80%", top: "20%" }}>
                  <div className="w-6 h-6 rounded-full bg-turtle-green flex items-center justify-center shadow">
                    <HomeIcon size={11} className="text-white" />
                  </div>
                  <span className="text-[9px] font-medium text-turtle-dark bg-white/80 rounded px-1 mt-1">
                    {t("order_placed_map_home")}
                  </span>
                </div>

                <div
                  className="absolute select-none"
                  style={{
                    left: `${turtleLeft}%`,
                    top: `${turtleTop}%`,
                    fontSize: "20px",
                    transform: "scaleX(-1)",
                    transition: "left 1s linear, top 1s linear",
                  }}
                >
                  🐢
                </div>
              </div>

              <div className="px-4 pt-3">
                <span className="inline-block bg-turtle-pink-bg text-turtle-pink text-[10px] font-bold px-2.5 py-1 rounded-full">
                  {riderTitle}
                </span>
              </div>
              <div className="flex items-center gap-3 p-4 pt-2">
                <div className="w-10 h-10 rounded-full bg-turtle-pink-bg flex items-center justify-center shrink-0 overflow-hidden p-2">
                  <img src="/logo.png" alt="" className="w-full h-full object-contain" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-sm text-turtle-dark truncate">{riderName}</p>
                  <p className="text-xs text-turtle-gray-2 truncate">{riderTagline}</p>
                </div>
                <div className="w-9 h-9 rounded-full bg-turtle-pink-bg flex items-center justify-center shrink-0">
                  <Phone size={14} className="text-turtle-pink" />
                </div>
              </div>
            </div>

            {/* Rotating joke strip, replaced by the rider's own line once the turtle slows down near the end */}
            <div className="bg-amber-50 border border-amber-100 rounded-2xl px-4 py-3 mb-4 text-center">
              <p
                className="text-sm text-amber-800 transition-opacity duration-300"
                style={{ opacity: jokeVisible ? 1 : 0 }}
              >
                {inPhase3 ? riderPhase3 : jokeText}
              </p>
            </div>

            {/* Progress steps */}
            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-5">
              <div className="space-y-4">
                {STEP_KEYS.map((key, i) => {
                  const done = stepsDone > i;
                  const active = stepsDone === i + 1 && !done;
                  return (
                    <div key={key} className="flex items-center gap-3">
                      {done ? (
                        <CheckCircle2 size={18} className="text-turtle-green shrink-0" />
                      ) : active ? (
                        <Loader2 size={18} className="text-turtle-pink animate-spin shrink-0" />
                      ) : (
                        <Circle size={18} className="text-gray-300 shrink-0" />
                      )}
                      <span
                        className={`text-sm ${done || active ? "text-turtle-dark font-medium" : "text-turtle-gray-2"}`}
                      >
                        {t(key)}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      {delivered && !revealed && (
        <div className="min-h-screen flex flex-col items-center justify-center px-4 text-center">
          <div className="flex items-center gap-2 mb-8">
            <img src="/logo.png" alt="" className="w-6 h-6 object-contain" />
            <span className="font-extrabold text-turtle-dark text-sm tracking-tight">foodturtle</span>
          </div>
          <CheckCircle2 size={72} className="text-turtle-green animate-check-pop" />
          <h1 className="text-2xl font-bold text-turtle-dark mt-4 animate-fade-up" style={{ animationDelay: "150ms" }}>
            {t("order_placed_delivered_title")}
          </h1>
          <p className="text-turtle-gray-2 mt-1 animate-fade-up" style={{ animationDelay: "300ms" }}>
            {t("order_placed_delivered_subtitle", { address: user.address })}
          </p>
        </div>
      )}

      {revealed && (
        <div className="min-h-screen flex items-center justify-center px-4 py-10">
          <div className="max-w-md w-full bg-white rounded-3xl shadow-sm border border-gray-100 p-8 text-center">
            <div className="mx-auto w-16 h-16 rounded-full bg-turtle-pink-bg flex items-center justify-center overflow-hidden p-3 animate-check-pop">
              <img src="/logo.png" alt="" className="w-full h-full object-contain" />
            </div>
            <h1
              className="text-2xl font-extrabold text-turtle-dark mt-4 animate-fade-up"
              style={{ animationDelay: "150ms" }}
            >
              {t("order_placed_p4_main_title")}
            </h1>
            <div
              className="mx-auto mt-6 inline-flex items-center gap-2 bg-turtle-pink-bg rounded-full pl-2 pr-4 py-2 animate-fade-up"
              style={{ animationDelay: "300ms" }}
            >
              <span className="w-8 h-8 rounded-full bg-white flex items-center justify-center shrink-0">
                <Wallet size={16} className="text-turtle-pink" />
              </span>
              <span className="text-lg font-extrabold text-turtle-pink">
                {t("order_placed_p4_stat_saved", { amount: orderTotal })}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2.5 mt-4">
              {SECONDARY_STATS.map(({ key, icon: Icon }, i) => (
                <div
                  key={key}
                  className="flex flex-col items-center justify-center gap-1.5 bg-turtle-gray rounded-2xl py-4 px-2 animate-pop-in"
                  style={{ animationDelay: `${420 + i * 80}ms` }}
                >
                  <Icon size={18} className="text-turtle-dark/70" />
                  <span className="text-xs font-semibold text-turtle-dark text-center leading-tight">{t(key)}</span>
                </div>
              ))}
            </div>

            <div
              className="rounded-2xl bg-turtle-pink-bg p-5 mt-6 animate-pop-in"
              style={{ animationDelay: "750ms" }}
            >
              <p className="text-turtle-pink font-bold text-base leading-snug">
                &quot;{t("order_placed_p4_tagline")}&quot;
              </p>
            </div>

            <div className="space-y-2 mt-6">
              <div className="animate-fade-up" style={{ animationDelay: "900ms" }}>
                <TurtleReceipt orderTotal={orderTotal} orderId={orderId} riderName={riderName} lang={lang} />
              </div>
              <Link
                href={reorderHref}
                className="w-full flex items-center justify-center gap-1.5 text-center border-2 border-turtle-pink text-turtle-pink py-3 rounded-full text-sm font-bold hover:bg-turtle-pink-bg transition-colors animate-fade-up"
                style={{ animationDelay: "1000ms" }}
              >
                <RotateCcw size={16} />
                {t("order_placed_p4_reorder_btn")}
              </Link>
              <Link
                href="/"
                className="w-full flex items-center justify-center gap-1.5 text-center text-turtle-gray-2 py-3 rounded-full text-sm font-semibold hover:bg-turtle-gray transition-colors animate-fade-up"
                style={{ animationDelay: "1100ms" }}
              >
                <HomeIcon size={16} />
                {t("order_placed_p4_stay_btn")}
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

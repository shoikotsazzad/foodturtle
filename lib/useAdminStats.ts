"use client";

import { useEffect, useState } from "react";
import {
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  collection,
  query,
  orderBy,
  limit,
  where,
  Timestamp,
} from "firebase/firestore";
import { db, isFirebaseConfigured } from "./firebase";
import { FakeOrder } from "@/types";

export interface StatsSummary {
  pageViews: number;
  visitors: number;
  signups: number;
  logins: number;
  ordersPlaced: number;
  itemsOrdered: number;
  revenue: number;
}

export interface DailyStat {
  date: string;
  pageViews: number;
  signups: number;
  logins: number;
  orders: number;
}

export interface LeaderboardEntry {
  id: string;
  name: string;
  orders: number;
}

export interface AdminStats {
  configured: boolean;
  loading: boolean;
  summary: StatsSummary;
  liveNow: number;
  dailyStats: DailyStat[];
  leaderboard: LeaderboardEntry[];
}

const EMPTY_SUMMARY: StatsSummary = {
  pageViews: 0,
  visitors: 0,
  signups: 0,
  logins: 0,
  ordersPlaced: 0,
  itemsOrdered: 0,
  revenue: 0,
};

function last7DayIds(): string[] {
  const ids: string[] = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setUTCDate(d.getUTCDate() - i);
    ids.push(d.toISOString().slice(0, 10));
  }
  return ids;
}

function emptyDailyStats(): DailyStat[] {
  return last7DayIds().map((date) => ({ date, pageViews: 0, signups: 0, logins: 0, orders: 0 }));
}

function localFallback(): AdminStats {
  const dailyMap: Record<string, DailyStat> = {};
  last7DayIds().forEach((id) => {
    dailyMap[id] = { date: id, pageViews: 0, signups: 0, logins: 0, orders: 0 };
  });

  let ordersPlaced = 0;
  let itemsOrdered = 0;
  let revenue = 0;
  const restaurantCounts: Record<string, LeaderboardEntry> = {};

  try {
    const orders = JSON.parse(localStorage.getItem("ft_orders") || "[]") as FakeOrder[];
    ordersPlaced = orders.length;
    for (const order of orders) {
      const items = order.items || [];
      itemsOrdered += items.reduce((sum, i) => sum + (i.quantity || 0), 0);
      revenue += order.total || 0;

      const dayId = (order.date || "").slice(0, 10);
      if (dailyMap[dayId]) dailyMap[dayId].orders += 1;

      const restaurantId = items[0]?.restaurant_id;
      if (restaurantId) {
        if (!restaurantCounts[restaurantId]) {
          restaurantCounts[restaurantId] = { id: restaurantId, name: order.restaurant_name_en, orders: 0 };
        }
        restaurantCounts[restaurantId].orders += 1;
      }
    }
  } catch {
    // localStorage unavailable or malformed — fall through with zeros
  }

  return {
    configured: false,
    loading: false,
    summary: { ...EMPTY_SUMMARY, ordersPlaced, itemsOrdered, revenue },
    liveNow: 0,
    dailyStats: last7DayIds().map((id) => dailyMap[id]),
    leaderboard: Object.values(restaurantCounts)
      .sort((a, b) => b.orders - a.orders)
      .slice(0, 5),
  };
}

export function useAdminStats(): AdminStats {
  const configured = isFirebaseConfigured();

  const [summary, setSummary] = useState<StatsSummary>(EMPTY_SUMMARY);
  const [summaryLoading, setSummaryLoading] = useState(true);
  const [liveNow, setLiveNow] = useState(0);
  const [dailyStats, setDailyStats] = useState<DailyStat[]>(emptyDailyStats());
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);

  // Live KPI summary — real-time listener, this is the one metric class where
  // onSnapshot genuinely shines (updates the moment any tracked event fires).
  useEffect(() => {
    if (!configured) {
      setSummaryLoading(false);
      return;
    }
    const unsub = onSnapshot(
      doc(db, "stats", "summary"),
      (snap) => {
        const data = snap.data();
        setSummary({
          pageViews: data?.pageViews ?? 0,
          visitors: data?.visitors ?? 0,
          signups: data?.signups ?? 0,
          logins: data?.logins ?? 0,
          ordersPlaced: data?.ordersPlaced ?? 0,
          itemsOrdered: data?.itemsOrdered ?? 0,
          revenue: data?.revenue ?? 0,
        });
        setSummaryLoading(false);
      },
      () => setSummaryLoading(false)
    );
    return () => unsub();
  }, [configured]);

  // Last 7 days, by explicit doc id — no query/index needed.
  useEffect(() => {
    if (!configured) return;
    let cancelled = false;
    (async () => {
      const ids = last7DayIds();
      const results = await Promise.all(
        ids.map(async (id): Promise<DailyStat> => {
          try {
            const snap = await getDoc(doc(db, "daily_stats", id));
            const data = snap.data();
            return {
              date: id,
              pageViews: data?.pageViews ?? 0,
              signups: data?.signups ?? 0,
              logins: data?.logins ?? 0,
              orders: data?.orders ?? 0,
            };
          } catch {
            return { date: id, pageViews: 0, signups: 0, logins: 0, orders: 0 };
          }
        })
      );
      if (!cancelled) setDailyStats(results);
    })();
    return () => {
      cancelled = true;
    };
  }, [configured]);

  // Top restaurants by fake orders — single-field orderBy+limit, no composite index needed.
  useEffect(() => {
    if (!configured) return;
    let cancelled = false;
    (async () => {
      try {
        const snap = await getDocs(query(collection(db, "restaurant_stats"), orderBy("orders", "desc"), limit(5)));
        if (!cancelled) {
          setLeaderboard(
            snap.docs.map((d) => ({ id: d.id, name: d.data().name ?? d.id, orders: d.data().orders ?? 0 }))
          );
        }
      } catch {
        if (!cancelled) setLeaderboard([]);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [configured]);

  // "Live now" — polled, not a snapshot listener. A time-range query only
  // re-evaluates when a matching doc is written, not when the wall clock
  // alone moves the cutoff, so a naive onSnapshot here would show a stale,
  // stuck count. Polling with a fresh cutoff each time is correct.
  useEffect(() => {
    if (!configured) return;
    let cancelled = false;
    const poll = async () => {
      try {
        const cutoff = Timestamp.fromMillis(Date.now() - 2 * 60 * 1000);
        const snap = await getDocs(query(collection(db, "sessions"), where("lastSeenAt", ">", cutoff)));
        if (!cancelled) setLiveNow(snap.size);
      } catch {
        if (!cancelled) setLiveNow(0);
      }
    };
    poll();
    const id = setInterval(poll, 25000);
    return () => {
      cancelled = true;
      clearInterval(id);
    };
  }, [configured]);

  if (!configured) return localFallback();

  return { configured, loading: summaryLoading, summary, liveNow, dailyStats, leaderboard };
}

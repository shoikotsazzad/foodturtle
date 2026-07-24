"use client";

import {
  doc,
  setDoc,
  increment,
  serverTimestamp,
  runTransaction,
} from "firebase/firestore";
import { db, isFirebaseConfigured } from "./firebase";

const VISITOR_KEY = "ft_visitor_id";
const SESSION_KEY = "ft_session_id";

function makeId(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) return crypto.randomUUID();
  return `id-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function getOrCreateVisitorId(): { id: string; isNew: boolean } {
  try {
    const existing = localStorage.getItem(VISITOR_KEY);
    if (existing) return { id: existing, isNew: false };
    const id = makeId();
    localStorage.setItem(VISITOR_KEY, id);
    return { id, isNew: true };
  } catch {
    return { id: makeId(), isNew: false };
  }
}

function getOrCreateSessionId(): string {
  try {
    const existing = sessionStorage.getItem(SESSION_KEY);
    if (existing) return existing;
    const id = makeId();
    sessionStorage.setItem(SESSION_KEY, id);
    return id;
  } catch {
    return makeId();
  }
}

// UTC day bucket. The "day" boundary won't line up with Dhaka midnight
// (UTC+6) — acceptable drift for a rough trend chart, not exact reporting.
function todayId(): string {
  return new Date().toISOString().slice(0, 10);
}

async function safeMerge(path: [string, string], data: Record<string, unknown>) {
  try {
    await setDoc(doc(db, ...path), { ...data, updatedAt: serverTimestamp() }, { merge: true });
  } catch (err) {
    console.warn(`[analytics] write to ${path.join("/")} failed`, err);
  }
}

export async function trackPageview(path: string): Promise<void> {
  if (!isFirebaseConfigured()) return;

  await safeMerge(["stats", "summary"], { pageViews: increment(1) });
  await safeMerge(["daily_stats", todayId()], { date: todayId(), pageViews: increment(1) });

  const { isNew, id } = getOrCreateVisitorId();
  if (!isNew) return;

  try {
    await runTransaction(db, async (tx) => {
      const ref = doc(db, "visitors", id);
      const snap = await tx.get(ref);
      if (snap.exists()) return;
      tx.set(ref, { firstSeenAt: serverTimestamp(), firstPath: path });
      tx.set(
        doc(db, "stats", "summary"),
        { visitors: increment(1), updatedAt: serverTimestamp() },
        { merge: true }
      );
    });
  } catch (err) {
    console.warn("[analytics] visitor transaction failed", err);
  }
}

export async function heartbeat(path: string): Promise<void> {
  if (!isFirebaseConfigured()) return;
  const sessionId = getOrCreateSessionId();
  const { id: visitorId } = getOrCreateVisitorId();
  await safeMerge(["sessions", sessionId], { visitorId, path, lastSeenAt: serverTimestamp() });
}

export async function trackSignup(): Promise<void> {
  if (!isFirebaseConfigured()) return;
  await safeMerge(["stats", "summary"], { signups: increment(1) });
  await safeMerge(["daily_stats", todayId()], { date: todayId(), signups: increment(1) });
}

export async function trackLogin(): Promise<void> {
  if (!isFirebaseConfigured()) return;
  await safeMerge(["stats", "summary"], { logins: increment(1) });
  await safeMerge(["daily_stats", todayId()], { date: todayId(), logins: increment(1) });
}

export async function trackOrder(args: {
  restaurantId: string;
  restaurantName: string;
  itemCount: number;
  total: number;
}): Promise<void> {
  if (!isFirebaseConfigured()) return;
  const { restaurantId, restaurantName, itemCount, total } = args;

  await safeMerge(["stats", "summary"], {
    ordersPlaced: increment(1),
    itemsOrdered: increment(itemCount),
    revenue: increment(total),
  });
  await safeMerge(["daily_stats", todayId()], { date: todayId(), orders: increment(1) });

  if (restaurantId) {
    await safeMerge(["restaurant_stats", restaurantId], {
      name: restaurantName,
      orders: increment(1),
    });
  }
}

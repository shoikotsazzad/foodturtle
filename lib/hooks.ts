"use client";

import { useState, useEffect } from "react";
import {
  collection,
  getDocs,
  doc,
  getDoc,
  query,
  where,
  orderBy,
  QueryConstraint,
} from "firebase/firestore";
import { db, isFirebaseConfigured } from "./firebase";
import { Restaurant, MenuItem, FakeVoucher } from "@/types";
import { SEED_RESTAURANTS, SEED_MENU_ITEMS, SEED_VOUCHERS, getMenuItemsForRestaurant } from "./seed-data";

export function useRestaurants() {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isFirebaseConfigured()) {
      setRestaurants(
        SEED_RESTAURANTS.map((r, i) => ({ ...r, id: `seed-${i}` }))
      );
      setLoading(false);
      return;
    }

    getDocs(collection(db, "restaurants"))
      .then((snap) => {
        const data = snap.docs.map((d) => ({ id: d.id, ...d.data() } as Restaurant));
        setRestaurants(data.length > 0 ? data : SEED_RESTAURANTS.map((r, i) => ({ ...r, id: `seed-${i}` })));
      })
      .catch(() => {
        setRestaurants(SEED_RESTAURANTS.map((r, i) => ({ ...r, id: `seed-${i}` })));
        setError(null); // silently fallback
      })
      .finally(() => setLoading(false));
  }, []);

  return { restaurants, loading, error };
}

export function useRestaurant(slug: string) {
  const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;

    const seedMatch = SEED_RESTAURANTS.find((r) => r.slug === slug);

    if (!isFirebaseConfigured()) {
      setRestaurant(seedMatch ? { ...seedMatch, id: `seed-${slug}` } : null);
      setLoading(false);
      return;
    }

    getDocs(query(collection(db, "restaurants"), where("slug", "==", slug)))
      .then((snap) => {
        if (!snap.empty) {
          setRestaurant({ id: snap.docs[0].id, ...snap.docs[0].data() } as Restaurant);
        } else if (seedMatch) {
          setRestaurant({ ...seedMatch, id: `seed-${slug}` });
        }
      })
      .catch(() => {
        if (seedMatch) setRestaurant({ ...seedMatch, id: `seed-${slug}` });
      })
      .finally(() => setLoading(false));
  }, [slug]);

  return { restaurant, loading };
}

export function useMenuItems(restaurantSlug: string) {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!restaurantSlug) return;

    let seedItems = SEED_MENU_ITEMS.filter(
      (item) => item.restaurant_slug === restaurantSlug
    ).map((item, i) => ({
      ...item,
      id: `seed-item-${restaurantSlug}-${i}`,
      restaurant_id: `seed-${restaurantSlug}`,
    })) as MenuItem[];

    if (seedItems.length === 0) {
      const restaurant = SEED_RESTAURANTS.find((r) => r.slug === restaurantSlug);
      if (restaurant) {
        seedItems = getMenuItemsForRestaurant({ ...restaurant, id: `seed-${restaurantSlug}` });
      }
    }

    if (!isFirebaseConfigured()) {
      setMenuItems(seedItems);
      setLoading(false);
      return;
    }

    getDocs(
      query(
        collection(db, "menu_items"),
        where("restaurant_slug", "==", restaurantSlug),
        orderBy("sort_order")
      )
    )
      .then((snap) => {
        const data = snap.docs.map((d) => ({ id: d.id, ...d.data() } as MenuItem));
        setMenuItems(data.length > 0 ? data : seedItems);
      })
      .catch(() => setMenuItems(seedItems))
      .finally(() => setLoading(false));
  }, [restaurantSlug]);

  return { menuItems, loading };
}

export function useVouchers() {
  const [vouchers, setVouchers] = useState<FakeVoucher[]>([]);

  useEffect(() => {
    if (!isFirebaseConfigured()) {
      setVouchers(SEED_VOUCHERS.map((v, i) => ({ ...v, id: `seed-v-${i}` })));
      return;
    }

    getDocs(query(collection(db, "fake_vouchers"), where("is_active", "==", true)))
      .then((snap) => {
        const data = snap.docs.map((d) => ({ id: d.id, ...d.data() } as FakeVoucher));
        setVouchers(data.length > 0 ? data : SEED_VOUCHERS.map((v, i) => ({ ...v, id: `seed-v-${i}` })));
      })
      .catch(() =>
        setVouchers(SEED_VOUCHERS.map((v, i) => ({ ...v, id: `seed-v-${i}` })))
      );
  }, []);

  return vouchers;
}

"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { trackSignup, trackLogin } from "@/lib/analytics";

interface UserProfile {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
}

interface UserContextValue {
  user: UserProfile;
  isLoggedIn: boolean;
  login: (name: string, email: string) => void;
  logout: () => void;
  updateUser: (updates: Partial<UserProfile>) => void;
  favourites: string[];
  toggleFavourite: (restaurantId: string) => void;
  isFavourite: (restaurantId: string) => boolean;
}

const defaultUser: UserProfile = {
  name: "",
  email: "",
  phone: "",
  address: "8 Gulshan Avenue, Dhaka",
  city: "Dhaka",
};

const UserContext = createContext<UserContextValue | null>(null);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserProfile>(defaultUser);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [favourites, setFavourites] = useState<string[]>([]);

  useEffect(() => {
    try {
      const savedUser = localStorage.getItem("ft_user");
      if (savedUser) setUser(JSON.parse(savedUser));
      const savedFavs = localStorage.getItem("ft_favourites");
      if (savedFavs) setFavourites(JSON.parse(savedFavs));
      const loggedIn = localStorage.getItem("ft_logged_in");
      if (loggedIn === "true") setIsLoggedIn(true);
    } catch {}
  }, []);

  const login = useCallback((name: string, email: string) => {
    const isNewUser = !localStorage.getItem("ft_user");
    const updated = { ...defaultUser, name, email };
    try {
      const saved = localStorage.getItem("ft_user");
      if (saved) Object.assign(updated, JSON.parse(saved));
    } catch {}
    updated.name = name;
    updated.email = email;
    setUser(updated);
    setIsLoggedIn(true);
    localStorage.setItem("ft_user", JSON.stringify(updated));
    localStorage.setItem("ft_logged_in", "true");
    if (isNewUser) trackSignup();
    else trackLogin();
  }, []);

  const logout = useCallback(() => {
    setIsLoggedIn(false);
    localStorage.removeItem("ft_logged_in");
  }, []);

  const updateUser = useCallback((updates: Partial<UserProfile>) => {
    setUser((prev) => {
      const next = { ...prev, ...updates };
      localStorage.setItem("ft_user", JSON.stringify(next));
      return next;
    });
  }, []);

  const toggleFavourite = useCallback((restaurantId: string) => {
    setFavourites((prev) => {
      const next = prev.includes(restaurantId)
        ? prev.filter((id) => id !== restaurantId)
        : [...prev, restaurantId];
      localStorage.setItem("ft_favourites", JSON.stringify(next));
      return next;
    });
  }, []);

  const isFavourite = useCallback(
    (restaurantId: string) => favourites.includes(restaurantId),
    [favourites]
  );

  return (
    <UserContext.Provider value={{ user, isLoggedIn, login, logout, updateUser, favourites, toggleFavourite, isFavourite }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error("useUser must be used within UserProvider");
  return ctx;
}

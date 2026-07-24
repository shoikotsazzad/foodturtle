"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { Language } from "@/types";
import enStrings from "@/locales/en.json";
import bnStrings from "@/locales/bn.json";

type Translations = typeof enStrings;

interface LanguageContextValue {
  lang: Language;
  setLang: (lang: Language) => void;
  t: (key: keyof Translations, vars?: Record<string, string | number>) => string;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Language>("en");

  const applyDomLang = useCallback((newLang: Language) => {
    if (typeof document === "undefined") return;
    document.documentElement.lang = newLang;
    if (newLang === "bn") {
      document.body.classList.add("lang-bn");
    } else {
      document.body.classList.remove("lang-bn");
    }
  }, []);

  useEffect(() => {
    const saved = localStorage.getItem("ft_lang") as Language | null;
    if (saved === "en" || saved === "bn") {
      setLangState(saved);
      applyDomLang(saved);
    }
  }, [applyDomLang]);

  const setLang = useCallback(
    (newLang: Language) => {
      setLangState(newLang);
      localStorage.setItem("ft_lang", newLang);
      applyDomLang(newLang);
    },
    [applyDomLang]
  );

  const t = useCallback(
    (key: keyof Translations, vars?: Record<string, string | number>): string => {
      const strings = lang === "bn" ? bnStrings : enStrings;
      let str = (strings as Record<string, string>)[key] ?? (enStrings as Record<string, string>)[key] ?? key;
      if (vars) {
        Object.entries(vars).forEach(([k, v]) => {
          str = str.replace(`{${k}}`, String(v));
        });
      }
      return str;
    },
    [lang]
  );

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
}

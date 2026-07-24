"use client";

import { ChevronDown } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function LanguageToggle() {
  const { lang, setLang } = useLanguage();

  return (
    <button
      onClick={() => setLang(lang === "en" ? "bn" : "en")}
      className="flex items-center gap-1 text-sm font-medium text-turtle-dark hover:text-turtle-pink transition-colors px-2 py-1 rounded-lg hover:bg-turtle-gray"
    >
      <span>{lang === "en" ? "EN" : "বাংলা"}</span>
      <ChevronDown size={14} className="text-turtle-gray-2" />
    </button>
  );
}

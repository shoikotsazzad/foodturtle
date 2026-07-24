"use client";

import { useState } from "react";
import { SlidersHorizontal, X } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { FilterControls, type FilterState } from "./Sidebar";

interface MobileFilterSheetProps {
  filters: FilterState;
  onChange: (f: FilterState) => void;
}

const DEFAULT_FILTERS: FilterState = {
  sort: "relevance",
  ratings4Plus: false,
  acceptsVouchers: false,
  cuisines: [],
  maxPrice: 2000,
};

export default function MobileFilterSheet({ filters, onChange }: MobileFilterSheetProps) {
  const { t } = useLanguage();
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState<FilterState>(filters);

  const advancedCount =
    filters.cuisines.length +
    (filters.maxPrice < 2000 ? 1 : 0) +
    (filters.sort !== "relevance" ? 1 : 0);

  const openSheet = () => {
    setDraft(filters);
    setOpen(true);
  };

  const apply = () => {
    onChange(draft);
    setOpen(false);
  };

  const clearAll = () => {
    setDraft(DEFAULT_FILTERS);
  };

  return (
    <>
      <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide pb-1 mb-3">
        <button
          onClick={openSheet}
          className="shrink-0 flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-semibold border border-gray-200 text-turtle-dark active:bg-turtle-gray transition-colors"
        >
          <SlidersHorizontal size={13} />
          {t("filter_title")}
          {advancedCount > 0 && (
            <span className="bg-turtle-pink text-white text-[10px] font-bold rounded-full min-w-[16px] h-4 px-1 flex items-center justify-center leading-none">
              {advancedCount}
            </span>
          )}
        </button>
        <button
          onClick={() => onChange({ ...filters, ratings4Plus: !filters.ratings4Plus })}
          className={`shrink-0 px-3.5 py-2 rounded-full text-xs font-semibold border transition-colors ${
            filters.ratings4Plus
              ? "bg-turtle-pink text-white border-turtle-pink"
              : "border-gray-200 text-turtle-dark active:bg-turtle-gray"
          }`}
        >
          {t("filter_ratings")}
        </button>
        <button
          onClick={() => onChange({ ...filters, acceptsVouchers: !filters.acceptsVouchers })}
          className={`shrink-0 px-3.5 py-2 rounded-full text-xs font-semibold border transition-colors ${
            filters.acceptsVouchers
              ? "bg-turtle-pink text-white border-turtle-pink"
              : "border-gray-200 text-turtle-dark active:bg-turtle-gray"
          }`}
        >
          {t("filter_vouchers")}
        </button>
      </div>

      {open && (
        <div className="fixed inset-0 z-50">
          <div className="absolute inset-0 bg-black/40" onClick={() => setOpen(false)} />
          <div className="absolute inset-x-0 bottom-0 bg-white rounded-t-2xl max-h-[85vh] flex flex-col animate-slide-up safe-area-pb">
            <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 shrink-0">
              <h2 className="font-bold text-turtle-dark">{t("filter_title")}</h2>
              <button onClick={() => setOpen(false)} className="p-1 -mr-1 text-turtle-gray-2">
                <X size={20} />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto px-4 py-4">
              <FilterControls filters={draft} onChange={setDraft} />
            </div>
            <div className="flex items-center gap-3 px-4 py-3 border-t border-gray-100 shrink-0">
              <button
                onClick={clearAll}
                className="text-sm font-semibold text-turtle-dark px-2"
              >
                {t("filter_clear_all")}
              </button>
              <button
                onClick={apply}
                className="flex-1 bg-turtle-pink text-white py-3 rounded-full text-sm font-bold hover:bg-turtle-pink-light transition-colors"
              >
                {t("filter_apply")}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

"use client";

import { useState } from "react";
import { X, MapPin, Navigation, ChevronRight } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { useUser } from "@/context/UserContext";

const POPULAR_LOCATIONS = [
  "Gulshan, Dhaka",
  "Dhanmondi, Dhaka",
  "Banani, Dhaka",
  "Mirpur, Dhaka",
  "Uttara, Dhaka",
  "Mohammadpur, Dhaka",
];

const CITIES = ["Dhaka", "Chittagong", "Sylhet", "Rajshahi", "Khulna"];

interface AddressModalProps {
  onClose: () => void;
}

export default function AddressModal({ onClose }: AddressModalProps) {
  const { t } = useLanguage();
  const { updateUser, user } = useUser();
  const [step, setStep] = useState<"input" | "map">(user.address ? "map" : "input");
  const [inputValue, setInputValue] = useState(user.address || "");
  const [suggestions, setSuggestions] = useState<string[]>([]);

  const handleInput = (val: string) => {
    setInputValue(val);
    if (val.length > 1) {
      setSuggestions(
        POPULAR_LOCATIONS.filter((loc) =>
          loc.toLowerCase().includes(val.toLowerCase())
        )
      );
    } else {
      setSuggestions([]);
    }
  };

  const selectAddress = (addr: string) => {
    setInputValue(addr);
    setSuggestions([]);
    setStep("map");
  };

  const handleLocateMe = () => {
    selectAddress("8 Gulshan Avenue, Dhaka");
  };

  const handleSave = () => {
    updateUser({ address: inputValue });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative bg-white w-full sm:max-w-md sm:rounded-2xl rounded-t-2xl max-h-[90vh] overflow-auto animate-slide-up">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-100">
          <h2 className="text-lg font-bold text-turtle-dark">
            {t("address_modal_title")}
          </h2>
          <button onClick={onClose} className="p-1 hover:bg-turtle-gray rounded-full">
            <X size={20} className="text-turtle-gray-2" />
          </button>
        </div>

        {step === "input" ? (
          <div className="p-4 space-y-4">
            <p className="text-sm text-turtle-gray-2">{t("address_modal_subtitle")}</p>

            {/* City chips */}
            <div className="flex flex-wrap gap-2">
              {CITIES.map((city) => (
                <button
                  key={city}
                  onClick={() => selectAddress(`${city}`)}
                  className="px-3 py-1.5 bg-turtle-pink-bg text-turtle-pink text-sm rounded-full border border-turtle-pink/20 hover:bg-turtle-pink hover:text-white transition-colors"
                >
                  {city}
                </button>
              ))}
            </div>

            {/* Input */}
            <div className="relative">
              <MapPin size={16} className="absolute left-3 top-3.5 text-turtle-pink" />
              <input
                type="text"
                value={inputValue}
                onChange={(e) => handleInput(e.target.value)}
                placeholder={t("address_modal_input")}
                className="w-full pl-9 pr-10 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-turtle-pink"
                autoFocus
              />
              {inputValue && (
                <button
                  onClick={() => { setInputValue(""); setSuggestions([]); }}
                  className="absolute right-10 top-3.5"
                >
                  <X size={14} className="text-turtle-gray-2" />
                </button>
              )}
              <button
                onClick={() => inputValue && setStep("map")}
                className="absolute right-2 top-2 p-1.5 bg-turtle-pink rounded-lg"
              >
                <ChevronRight size={16} className="text-white" />
              </button>
            </div>

            {/* Suggestions */}
            {suggestions.length > 0 && (
              <div className="border border-gray-100 rounded-lg overflow-hidden">
                {suggestions.map((s) => (
                  <button
                    key={s}
                    onClick={() => selectAddress(s)}
                    className="w-full text-left px-4 py-3 text-sm hover:bg-turtle-gray border-b border-gray-50 last:border-0"
                  >
                    <MapPin size={14} className="inline mr-2 text-turtle-gray-2" />
                    {s}
                  </button>
                ))}
              </div>
            )}

            {/* Locate me */}
            <button
              onClick={handleLocateMe}
              className="flex items-center gap-2 text-turtle-pink text-sm font-medium"
            >
              <Navigation size={16} />
              {t("address_modal_locate")}
            </button>

            {/* Popular locations */}
            <div>
              <p className="text-xs font-semibold text-turtle-gray-2 uppercase mb-2">
                {t("address_modal_popular")}
              </p>
              <div className="space-y-1">
                {POPULAR_LOCATIONS.slice(0, 4).map((loc) => (
                  <button
                    key={loc}
                    onClick={() => selectAddress(loc)}
                    className="w-full text-left px-3 py-2.5 text-sm hover:bg-turtle-gray rounded-lg flex items-center gap-2"
                  >
                    <MapPin size={14} className="text-turtle-gray-2 shrink-0" />
                    {loc}
                  </button>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="p-4 space-y-4">
            {/* Fake map */}
            <div className="relative h-48 rounded-xl overflow-hidden bg-gradient-to-br from-blue-50 to-green-50 border border-gray-100">
              {/* Simple fake street grid */}
              <svg className="absolute inset-0 w-full h-full opacity-30" viewBox="0 0 300 200">
                {/* Streets */}
                <rect x="0" y="80" width="300" height="6" fill="#ccc" />
                <rect x="0" y="130" width="300" height="4" fill="#ccc" />
                <rect x="60" y="0" width="6" height="200" fill="#ccc" />
                <rect x="140" y="0" width="6" height="200" fill="#ccc" />
                <rect x="220" y="0" width="4" height="200" fill="#ccc" />
                {/* Blocks */}
                <rect x="10" y="10" width="40" height="60" rx="2" fill="#e2e8f0" />
                <rect x="75" y="10" width="55" height="60" rx="2" fill="#e2e8f0" />
                <rect x="155" y="10" width="55" height="60" rx="2" fill="#e2e8f0" />
                <rect x="10" y="95" width="40" height="25" rx="2" fill="#e2e8f0" />
                <rect x="75" y="95" width="55" height="25" rx="2" fill="#e2e8f0" />
              </svg>
              {/* Pin */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-full">
                <div className="flex flex-col items-center">
                  <div className="bg-white rounded-lg px-3 py-1.5 shadow-lg text-xs font-medium text-turtle-dark border border-gray-100 whitespace-nowrap mb-1">
                    {t("address_modal_delivering")}
                  </div>
                  <div className="w-8 h-8 bg-turtle-pink rounded-full flex items-center justify-center shadow-lg">
                    <MapPin size={16} className="text-white" />
                  </div>
                  <div className="w-0.5 h-3 bg-turtle-pink" />
                  <div className="w-2 h-1 bg-turtle-pink/30 rounded-full" />
                </div>
              </div>
            </div>

            {/* Address display */}
            <div className="flex items-start gap-3">
              <MapPin size={18} className="text-turtle-pink mt-0.5 shrink-0" />
              <div>
                <p className="text-sm font-semibold text-turtle-dark">{inputValue}</p>
                <button
                  onClick={() => setStep("input")}
                  className="text-xs text-turtle-pink hover:underline"
                >
                  Edit
                </button>
              </div>
            </div>

            <button
              onClick={handleSave}
              className="w-full bg-turtle-pink text-white py-3 rounded-full font-semibold text-sm hover:bg-turtle-pink-light transition-colors"
            >
              {t("address_modal_save")}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

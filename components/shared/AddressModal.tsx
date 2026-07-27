"use client";

import { useState } from "react";
import { X, MapPin, Navigation, ChevronRight, LocateFixed, Loader2 } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { useUser } from "@/context/UserContext";

interface Area {
  label_en: string;
  label_bn: string;
  city: string;
  lat: number;
  lng: number;
}

const DHAKA_AREAS: Area[] = [
  { label_en: "Gulshan", label_bn: "গুলশান", city: "Dhaka", lat: 23.7925, lng: 90.4078 },
  { label_en: "Banani", label_bn: "বনানী", city: "Dhaka", lat: 23.7937, lng: 90.4066 },
  { label_en: "Dhanmondi", label_bn: "ধানমন্ডি", city: "Dhaka", lat: 23.7461, lng: 90.3742 },
  { label_en: "Mirpur", label_bn: "মিরপুর", city: "Dhaka", lat: 23.8223, lng: 90.3654 },
  { label_en: "Uttara", label_bn: "উত্তরা", city: "Dhaka", lat: 23.8759, lng: 90.3795 },
  { label_en: "Mohakhali", label_bn: "মহাখালী", city: "Dhaka", lat: 23.7805, lng: 90.4022 },
  { label_en: "Bashundhara", label_bn: "বসুন্ধরা", city: "Dhaka", lat: 23.8145, lng: 90.4310 },
  { label_en: "Motijheel", label_bn: "মতিঝিল", city: "Dhaka", lat: 23.7330, lng: 90.4173 },
  { label_en: "Wari", label_bn: "ওয়ারী", city: "Dhaka", lat: 23.7195, lng: 90.4103 },
  { label_en: "Baridhara", label_bn: "বারিধারা", city: "Dhaka", lat: 23.8103, lng: 90.4241 },
  { label_en: "Khilgaon", label_bn: "খিলগাঁও", city: "Dhaka", lat: 23.7457, lng: 90.4298 },
  { label_en: "Rampura", label_bn: "রামপুরা", city: "Dhaka", lat: 23.7574, lng: 90.4298 },
];

const OTHER_CITIES: Area[] = [
  { label_en: "Chittagong", label_bn: "চট্টগ্রাম", city: "Chittagong", lat: 22.3569, lng: 91.7832 },
  { label_en: "Sylhet", label_bn: "সিলেট", city: "Sylhet", lat: 24.8949, lng: 91.8687 },
  { label_en: "Rajshahi", label_bn: "রাজশাহী", city: "Rajshahi", lat: 24.3745, lng: 88.6042 },
  { label_en: "Khulna", label_bn: "খুলনা", city: "Khulna", lat: 22.8456, lng: 89.5403 },
  { label_en: "Cumilla", label_bn: "কুমিল্লা", city: "Cumilla", lat: 23.4607, lng: 91.1809 },
];

const ALL_AREAS = [...DHAKA_AREAS, ...OTHER_CITIES];

interface ReverseGeocodeResult {
  display: string;
  area: string;
  city: string;
}

async function reverseGeocode(lat: number, lng: number): Promise<ReverseGeocodeResult> {
  const res = await fetch(
    `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json&accept-language=en`,
    { headers: { "Accept-Language": "en" } }
  );
  if (!res.ok) throw new Error("reverse geocode failed");
  const data = await res.json();
  const a = data.address ?? {};
  const area = a.neighbourhood || a.suburb || a.quarter || a.village || a.town || a.city_district || "Your area";
  const city = a.city || a.county || a.state_district || "Dhaka";
  return { display: `${area}, ${city}`, area, city };
}

interface AddressModalProps {
  onClose: () => void;
}

type GpsStatus = "idle" | "loading" | "denied" | "error";

export default function AddressModal({ onClose }: AddressModalProps) {
  const { t, lang } = useLanguage();
  const { updateUser, user } = useUser();
  const [step, setStep] = useState<"input" | "map">(user.address ? "map" : "input");
  const [inputValue, setInputValue] = useState(user.address || "");
  const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(
    user.lat && user.lng ? { lat: user.lat, lng: user.lng } : null
  );
  const [suggestions, setSuggestions] = useState<Area[]>([]);
  const [gpsStatus, setGpsStatus] = useState<GpsStatus>("idle");

  const handleInput = (val: string) => {
    setInputValue(val);
    setCoords(null);
    if (val.length > 1) {
      setSuggestions(
        ALL_AREAS.filter(
          (a) =>
            a.label_en.toLowerCase().includes(val.toLowerCase()) || a.label_bn.includes(val)
        )
      );
    } else {
      setSuggestions([]);
    }
  };

  const selectArea = (area: Area) => {
    setInputValue(`${lang === "bn" ? area.label_bn : area.label_en}, ${area.city}`);
    setCoords({ lat: area.lat, lng: area.lng });
    setSuggestions([]);
    setStep("map");
  };

  const handleLocateMe = () => {
    if (typeof navigator === "undefined" || !navigator.geolocation) {
      setGpsStatus("error");
      return;
    }
    setGpsStatus("loading");
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;
          const result = await reverseGeocode(latitude, longitude);
          setInputValue(result.display);
          setCoords({ lat: latitude, lng: longitude });
          setGpsStatus("idle");
          setStep("map");
        } catch {
          setGpsStatus("error");
        }
      },
      (error) => {
        setGpsStatus(error.code === error.PERMISSION_DENIED ? "denied" : "error");
      },
      { timeout: 10000, maximumAge: 300000, enableHighAccuracy: false }
    );
  };

  const handleSave = () => {
    const matched = ALL_AREAS.find((a) => coords && a.lat === coords.lat && a.lng === coords.lng);
    updateUser({
      address: inputValue,
      city: matched?.city ?? user.city,
      lat: coords?.lat,
      lng: coords?.lng,
    });
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
                  onClick={() => { setInputValue(""); setCoords(null); setSuggestions([]); }}
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
                {suggestions.map((a) => (
                  <button
                    key={a.label_en}
                    onClick={() => selectArea(a)}
                    className="w-full text-left px-4 py-3 text-sm hover:bg-turtle-gray border-b border-gray-50 last:border-0"
                  >
                    <MapPin size={14} className="inline mr-2 text-turtle-gray-2" />
                    {lang === "bn" ? a.label_bn : a.label_en}, {a.city}
                  </button>
                ))}
              </div>
            )}

            {/* Locate me */}
            <button
              onClick={handleLocateMe}
              disabled={gpsStatus === "loading"}
              className="flex items-center gap-2 text-turtle-pink text-sm font-medium disabled:opacity-60"
            >
              {gpsStatus === "loading" ? (
                <Loader2 size={16} className="animate-spin" />
              ) : (
                <Navigation size={16} />
              )}
              {gpsStatus === "loading" ? t("address_modal_locating") : t("address_modal_locate")}
            </button>
            {gpsStatus === "denied" && (
              <p className="text-xs text-red-500">{t("address_modal_gps_denied")}</p>
            )}
            {gpsStatus === "error" && (
              <p className="text-xs text-red-500">{t("address_modal_gps_error")}</p>
            )}

            {/* Popular areas */}
            <div>
              <p className="text-xs font-semibold text-turtle-gray-2 uppercase mb-2">
                {t("address_modal_popular")}
              </p>
              <div className="flex flex-wrap gap-2 mb-3">
                {DHAKA_AREAS.map((a) => (
                  <button
                    key={a.label_en}
                    onClick={() => selectArea(a)}
                    className="px-3 py-1.5 bg-turtle-pink-bg text-turtle-pink text-sm rounded-full border border-turtle-pink/20 hover:bg-turtle-pink hover:text-white transition-colors"
                  >
                    {lang === "bn" ? a.label_bn : a.label_en}
                  </button>
                ))}
              </div>
              <p className="text-xs font-semibold text-turtle-gray-2 uppercase mb-2">
                {t("address_modal_other_cities")}
              </p>
              <div className="flex flex-wrap gap-2">
                {OTHER_CITIES.map((a) => (
                  <button
                    key={a.label_en}
                    onClick={() => selectArea(a)}
                    className="px-3 py-1.5 bg-turtle-gray text-turtle-dark text-sm rounded-full border border-gray-200 hover:bg-turtle-pink hover:text-white hover:border-turtle-pink transition-colors"
                  >
                    {lang === "bn" ? a.label_bn : a.label_en}
                  </button>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="p-4 space-y-4">
            {/* Fake map */}
            <div className="relative h-48 rounded-xl overflow-hidden bg-gradient-to-br from-blue-50 to-green-50 border border-gray-100">
              <svg className="absolute inset-0 w-full h-full opacity-30" viewBox="0 0 300 200">
                <rect x="0" y="80" width="300" height="6" fill="#ccc" />
                <rect x="0" y="130" width="300" height="4" fill="#ccc" />
                <rect x="60" y="0" width="6" height="200" fill="#ccc" />
                <rect x="140" y="0" width="6" height="200" fill="#ccc" />
                <rect x="220" y="0" width="4" height="200" fill="#ccc" />
                <rect x="10" y="10" width="40" height="60" rx="2" fill="#e2e8f0" />
                <rect x="75" y="10" width="55" height="60" rx="2" fill="#e2e8f0" />
                <rect x="155" y="10" width="55" height="60" rx="2" fill="#e2e8f0" />
                <rect x="10" y="95" width="40" height="25" rx="2" fill="#e2e8f0" />
                <rect x="75" y="95" width="55" height="25" rx="2" fill="#e2e8f0" />
              </svg>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-full">
                <div className="flex flex-col items-center">
                  <div className="bg-white rounded-lg px-3 py-1.5 shadow-lg text-xs font-medium text-turtle-dark border border-gray-100 whitespace-nowrap mb-1">
                    {coords ? t("address_modal_delivering") : t("address_modal_approximate")}
                  </div>
                  <div className="w-8 h-8 bg-turtle-pink rounded-full flex items-center justify-center shadow-lg">
                    {coords ? <LocateFixed size={16} className="text-white" /> : <MapPin size={16} className="text-white" />}
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

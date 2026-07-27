"use client";

import { useMemo } from "react";
import Link from "next/link";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { X, Star } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import type { Restaurant } from "@/types";

const GULSHAN_CENTER: [number, number] = [23.7925, 90.4078];

function hashSlug(slug: string): number {
  let h = 0;
  for (let i = 0; i < slug.length; i++) {
    h = (h * 31 + slug.charCodeAt(i)) | 0;
  }
  return Math.abs(h);
}

function fakeCoords(slug: string, center: [number, number]): [number, number] {
  const h = hashSlug(slug);
  const latOffset = ((h % 1000) / 1000 - 0.5) * 0.045;
  const lngOffset = (((h >> 8) % 1000) / 1000 - 0.5) * 0.045;
  return [center[0] + latOffset, center[1] + lngOffset];
}

const homeIcon = L.divIcon({
  html: `<div style="
    width: 18px; height: 18px; border-radius: 50%;
    background: #22C55E; border: 3px solid white;
    box-shadow: 0 2px 6px rgba(0,0,0,0.35);
  "></div>`,
  className: "",
  iconSize: [18, 18],
  iconAnchor: [9, 9],
});

const pinIcon = L.divIcon({
  html: `<div style="
    width: 32px; height: 32px; border-radius: 50% 50% 50% 0;
    background: #FF2B85; transform: rotate(-45deg);
    display: flex; align-items: center; justify-content: center;
    box-shadow: 0 2px 6px rgba(0,0,0,0.35); border: 2px solid white;
  "><span style="transform: rotate(45deg); font-size: 15px;">🍴</span></div>`,
  className: "",
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -30],
});

interface RestaurantMapModalProps {
  restaurants: Restaurant[];
  onClose: () => void;
  userCoords?: { lat: number; lng: number };
}

export default function RestaurantMapModal({ restaurants, onClose, userCoords }: RestaurantMapModalProps) {
  const { lang } = useLanguage();

  const center: [number, number] = userCoords ? [userCoords.lat, userCoords.lng] : GULSHAN_CENTER;

  const pins = useMemo(
    () =>
      restaurants.slice(0, 60).map((r) => ({
        ...r,
        coords: fakeCoords(r.slug, center),
        walkMin: Math.max(3, Math.round(r.distance_km * 12)),
      })),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [restaurants, center[0], center[1]]
  );

  return (
    <div className="fixed inset-0 z-50 bg-white">
      <div className="absolute top-3 right-3 z-[1000]">
        <button
          onClick={onClose}
          className="w-10 h-10 rounded-full bg-white shadow-lg border border-gray-100 flex items-center justify-center hover:bg-turtle-gray transition-colors"
          aria-label="Close map"
        >
          <X size={20} className="text-turtle-dark" />
        </button>
      </div>

      <MapContainer center={center} zoom={14} className="w-full h-full" scrollWheelZoom>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {userCoords && (
          <Marker position={center} icon={homeIcon}>
            <Popup>
              <p className="text-xs font-medium text-turtle-dark">You are here</p>
            </Popup>
          </Marker>
        )}
        {pins.map((p) => {
          const name = lang === "bn" ? p.name_bn : p.name_en;
          return (
            <Marker key={p.id} position={p.coords} icon={pinIcon}>
              <Popup>
                <div className="min-w-[160px]">
                  <p className="font-bold text-turtle-dark text-sm mb-1">{name}</p>
                  <div className="flex items-center gap-2 text-xs text-turtle-gray-2 mb-2">
                    <span className="flex items-center gap-0.5 text-amber-500">
                      <Star size={11} className="fill-amber-500" />
                      {p.rating}
                    </span>
                    <span>·</span>
                    <span>{p.walkMin} min walk</span>
                  </div>
                  <Link
                    href={`/restaurant/${p.slug}`}
                    className="block w-full text-center bg-turtle-pink text-white text-xs font-bold py-1.5 rounded-full hover:bg-turtle-pink-light transition-colors"
                  >
                    View menu
                  </Link>
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
}

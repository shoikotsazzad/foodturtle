"use client";

import { useState } from "react";
import { Plus, Edit, Trash2, X } from "lucide-react";
import { useRestaurants } from "@/lib/hooks";
import { Restaurant } from "@/types";

function RestaurantForm({ onClose, initial }: { onClose: () => void; initial?: Partial<Restaurant> }) {
  const [form, setForm] = useState({
    name_en: initial?.name_en || "",
    name_bn: initial?.name_bn || "",
    slug: initial?.slug || "",
    cuisine_en: initial?.cuisine_en?.join(", ") || "",
    cover_image: initial?.cover_image || "",
    logo: initial?.logo || "",
    rating: initial?.rating || 4.5,
    review_count: initial?.review_count || 100,
    delivery_time_min: initial?.delivery_time_min || 20,
    delivery_time_max: initial?.delivery_time_max || 35,
    delivery_fee: initial?.delivery_fee || 0,
    min_order: initial?.min_order || 100,
    distance_km: initial?.distance_km || 1.0,
    area: initial?.area || "Dhaka",
    deals: initial?.deals?.join(", ") || "",
    is_active: initial?.is_active ?? true,
    is_featured: initial?.is_featured ?? false,
  });

  const set = (k: string, v: any) => setForm(f => ({ ...f, [k]: v }));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-auto p-6 mx-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold">{initial ? "Edit Restaurant" : "Add New Restaurant"}</h2>
          <button onClick={onClose}><X size={20} className="text-turtle-gray-2" /></button>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {[
            ["name_en", "Name (English)"], ["name_bn", "Name (Bangla)"],
            ["slug", "Slug (URL)"], ["cuisine_en", "Cuisines (comma-separated)"],
            ["cover_image", "Cover Image URL"], ["logo", "Logo URL"],
            ["area", "Area"],
          ].map(([k, label]) => (
            <div key={k}>
              <label className="text-xs text-turtle-gray-2 block mb-1">{label}</label>
              <input
                value={(form as any)[k]}
                onChange={e => set(k, e.target.value)}
                className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-turtle-pink"
              />
            </div>
          ))}
          {[
            ["rating", "Rating"], ["review_count", "Review Count"],
            ["delivery_time_min", "Min Delivery (min)"], ["delivery_time_max", "Max Delivery (min)"],
            ["delivery_fee", "Delivery Fee (0=free)"], ["min_order", "Min Order (Tk)"],
            ["distance_km", "Distance (km)"],
          ].map(([k, label]) => (
            <div key={k}>
              <label className="text-xs text-turtle-gray-2 block mb-1">{label}</label>
              <input
                type="number"
                value={(form as any)[k]}
                onChange={e => set(k, Number(e.target.value))}
                className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-turtle-pink"
              />
            </div>
          ))}
          <div>
            <label className="text-xs text-turtle-gray-2 block mb-1">Deals (comma-separated)</label>
            <input
              value={form.deals}
              onChange={e => set("deals", e.target.value)}
              className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-turtle-pink"
            />
          </div>
          <div className="flex gap-4">
            <label className="flex items-center gap-2 text-sm cursor-pointer">
              <input type="checkbox" checked={form.is_active} onChange={e => set("is_active", e.target.checked)} className="accent-turtle-pink" />
              Active
            </label>
            <label className="flex items-center gap-2 text-sm cursor-pointer">
              <input type="checkbox" checked={form.is_featured} onChange={e => set("is_featured", e.target.checked)} className="accent-turtle-pink" />
              Featured
            </label>
          </div>
        </div>
        <div className="flex gap-3 mt-6">
          <button onClick={onClose} className="flex-1 border border-gray-200 py-2.5 rounded-full text-sm font-medium text-turtle-dark">
            Cancel
          </button>
          <button
            onClick={() => { alert("In production, this saves to Firestore. Using seed data for now."); onClose(); }}
            className="flex-1 bg-turtle-pink text-white py-2.5 rounded-full text-sm font-bold"
          >
            Save Restaurant
          </button>
        </div>
      </div>
    </div>
  );
}

export default function AdminRestaurantsPage() {
  const { restaurants } = useRestaurants();
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Restaurant | null>(null);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-turtle-dark">Restaurants</h1>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 bg-turtle-pink text-white px-4 py-2 rounded-full text-sm font-bold"
        >
          <Plus size={16} />
          Add New Restaurant
        </button>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 text-xs text-turtle-gray-2 uppercase">
            <tr>
              <th className="text-left px-4 py-3">Name</th>
              <th className="text-left px-4 py-3">Cuisine</th>
              <th className="text-left px-4 py-3">Rating</th>
              <th className="text-left px-4 py-3">Delivery</th>
              <th className="text-left px-4 py-3">Status</th>
              <th className="text-right px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {restaurants.map((r) => (
              <tr key={r.id} className="hover:bg-gray-50">
                <td className="px-4 py-3">
                  <p className="text-sm font-medium text-turtle-dark">{r.name_en}</p>
                  <p className="text-xs text-turtle-gray-2">{r.name_bn}</p>
                </td>
                <td className="px-4 py-3 text-sm text-turtle-gray-2">{r.cuisine_en.join(", ")}</td>
                <td className="px-4 py-3 text-sm">⭐ {r.rating}</td>
                <td className="px-4 py-3 text-sm text-turtle-gray-2">{r.delivery_time_min}–{r.delivery_time_max} min</td>
                <td className="px-4 py-3">
                  <span className={`text-xs px-2 py-1 rounded-full font-medium ${r.is_active ? "bg-green-100 text-green-700" : "bg-gray-100 text-turtle-gray-2"}`}>
                    {r.is_active ? "Active" : "Inactive"}
                  </span>
                </td>
                <td className="px-4 py-3 text-right">
                  <div className="flex items-center gap-2 justify-end">
                    <button onClick={() => setEditing(r)} className="p-1.5 hover:bg-turtle-gray rounded-lg text-turtle-gray-2 hover:text-turtle-pink">
                      <Edit size={14} />
                    </button>
                    <button onClick={() => alert("Delete would remove from Firestore")} className="p-1.5 hover:bg-red-50 rounded-lg text-turtle-gray-2 hover:text-red-500">
                      <Trash2 size={14} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {(showForm || editing) && (
        <RestaurantForm
          onClose={() => { setShowForm(false); setEditing(null); }}
          initial={editing || undefined}
        />
      )}
    </div>
  );
}

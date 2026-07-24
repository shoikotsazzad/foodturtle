"use client";

import { useState } from "react";
import { Plus, Edit, Trash2, X, Flame } from "lucide-react";
import { useRestaurants } from "@/lib/hooks";
import { SEED_MENU_ITEMS } from "@/lib/seed-data";

export default function AdminMenuItemsPage() {
  const { restaurants } = useRestaurants();
  const [selectedRestaurant, setSelectedRestaurant] = useState("");
  const [showForm, setShowForm] = useState(false);

  const items = selectedRestaurant
    ? SEED_MENU_ITEMS.filter((i) => i.restaurant_slug === selectedRestaurant)
    : SEED_MENU_ITEMS;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-turtle-dark">Menu Items</h1>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 bg-turtle-pink text-white px-4 py-2 rounded-full text-sm font-bold"
        >
          <Plus size={16} />
          Add Item
        </button>
      </div>

      {/* Restaurant filter */}
      <div className="mb-4">
        <select
          value={selectedRestaurant}
          onChange={(e) => setSelectedRestaurant(e.target.value)}
          className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-turtle-pink"
        >
          <option value="">All restaurants</option>
          {restaurants.map((r) => (
            <option key={r.id} value={r.slug}>{r.name_en}</option>
          ))}
        </select>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 text-xs text-turtle-gray-2 uppercase">
            <tr>
              <th className="text-left px-4 py-3">Item</th>
              <th className="text-left px-4 py-3">Category</th>
              <th className="text-left px-4 py-3">Price</th>
              <th className="text-left px-4 py-3">Original</th>
              <th className="text-left px-4 py-3">Popular</th>
              <th className="text-right px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {items.map((item, i) => (
              <tr key={i} className="hover:bg-gray-50">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    {item.image && (
                      <img src={item.image} alt={item.name_en} className="w-8 h-8 rounded-lg object-cover" />
                    )}
                    <div>
                      <p className="text-sm font-medium text-turtle-dark">{item.name_en}</p>
                      <p className="text-xs text-turtle-gray-2">{item.restaurant_slug}</p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 text-sm text-turtle-gray-2">{item.category_en}</td>
                <td className="px-4 py-3 text-sm font-bold text-turtle-pink">Tk {item.price}</td>
                <td className="px-4 py-3 text-sm text-turtle-gray-2"><s>Tk {item.original_price}</s></td>
                <td className="px-4 py-3">
                  {item.is_popular && <Flame size={14} className="text-orange-500" />}
                </td>
                <td className="px-4 py-3 text-right">
                  <div className="flex items-center gap-2 justify-end">
                    <button className="p-1.5 hover:bg-turtle-gray rounded-lg text-turtle-gray-2 hover:text-turtle-pink">
                      <Edit size={14} />
                    </button>
                    <button className="p-1.5 hover:bg-red-50 rounded-lg text-turtle-gray-2 hover:text-red-500">
                      <Trash2 size={14} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-2xl w-full max-w-lg p-6 mx-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold">Add Menu Item</h2>
              <button onClick={() => setShowForm(false)}><X size={20} /></button>
            </div>
            <div className="space-y-3">
              <select className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-turtle-pink">
                <option value="">Select restaurant</option>
                {restaurants.map((r) => <option key={r.id} value={r.id}>{r.name_en}</option>)}
              </select>
              {["Name (EN)", "Name (BN)", "Category (EN)", "Category (BN)", "Description (EN)", "Description (BN)", "Image URL"].map((label) => (
                <input key={label} placeholder={label} className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-turtle-pink" />
              ))}
              <div className="flex gap-3">
                <input type="number" placeholder="Price" className="flex-1 px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-turtle-pink" />
                <input type="number" placeholder="Original Price" className="flex-1 px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-turtle-pink" />
              </div>
              <label className="flex items-center gap-2 text-sm cursor-pointer">
                <input type="checkbox" className="accent-turtle-pink" />
                Mark as Popular
              </label>
            </div>
            <div className="flex gap-3 mt-4">
              <button onClick={() => setShowForm(false)} className="flex-1 border border-gray-200 py-2.5 rounded-full text-sm">Cancel</button>
              <button onClick={() => { alert("Saves to Firestore in production."); setShowForm(false); }} className="flex-1 bg-turtle-pink text-white py-2.5 rounded-full text-sm font-bold">
                Save Item
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

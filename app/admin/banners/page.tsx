"use client";

import { useState } from "react";
import { Plus, X } from "lucide-react";

const MOCK_BANNERS = [
  { id: "b1", image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&q=80", section: "home_hero", is_active: true, sort_order: 1 },
  { id: "b2", image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&q=80", section: "turtlemart_top", is_active: true, sort_order: 1 },
];

export default function AdminBannersPage() {
  const [showForm, setShowForm] = useState(false);
  const [banners] = useState(MOCK_BANNERS);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-turtle-dark">Banners</h1>
        <button onClick={() => setShowForm(true)} className="flex items-center gap-2 bg-turtle-pink text-white px-4 py-2 rounded-full text-sm font-bold">
          <Plus size={16} /> Add Banner
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {banners.map((b) => (
          <div key={b.id} className="bg-white rounded-xl border border-gray-100 overflow-hidden">
            <img src={b.image} alt="Banner" className="w-full h-32 object-cover" />
            <div className="p-3">
              <div className="flex justify-between items-center">
                <span className="text-xs font-medium text-turtle-gray-2">{b.section}</span>
                <span className={`text-xs px-2 py-0.5 rounded-full ${b.is_active ? "bg-green-100 text-green-700" : "bg-gray-100 text-turtle-gray-2"}`}>
                  {b.is_active ? "Active" : "Inactive"}
                </span>
              </div>
              <p className="text-xs text-turtle-gray-2 mt-1">Sort order: {b.sort_order}</p>
            </div>
          </div>
        ))}
      </div>

      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-2xl w-full max-w-md p-6 mx-4">
            <div className="flex justify-between mb-4">
              <h2 className="text-lg font-bold">Add Banner</h2>
              <button onClick={() => setShowForm(false)}><X size={20} /></button>
            </div>
            <div className="space-y-3">
              <input placeholder="Image URL" className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-turtle-pink" />
              <select className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-turtle-pink">
                <option>home_hero</option>
                <option>turtlemart_top</option>
                <option>shops_top</option>
              </select>
              <input type="number" placeholder="Sort order" className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-turtle-pink" />
              <label className="flex items-center gap-2 text-sm cursor-pointer">
                <input type="checkbox" defaultChecked className="accent-turtle-pink" />
                Active
              </label>
            </div>
            <div className="flex gap-3 mt-4">
              <button onClick={() => setShowForm(false)} className="flex-1 border border-gray-200 py-2.5 rounded-full text-sm">Cancel</button>
              <button onClick={() => { alert("Saves to Firestore."); setShowForm(false); }} className="flex-1 bg-turtle-pink text-white py-2.5 rounded-full text-sm font-bold">Save</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

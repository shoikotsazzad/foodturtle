"use client";

import { useState } from "react";
import { Plus, X } from "lucide-react";

const SHOPS = [
  { id: "s1", name_en: "Unimart", type: "All In One", delivery_time: 30, is_open: true },
  { id: "s2", name_en: "Lazz Pharma", type: "Pharmacy", delivery_time: 25, is_open: true },
  { id: "s3", name_en: "Bengal Meat", type: "Convenience", delivery_time: 35, is_open: false },
];

export default function AdminShopsPage() {
  const [showForm, setShowForm] = useState(false);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-turtle-dark">Shops</h1>
        <button onClick={() => setShowForm(true)} className="flex items-center gap-2 bg-turtle-pink text-white px-4 py-2 rounded-full text-sm font-bold">
          <Plus size={16} /> Add Shop
        </button>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 text-xs text-turtle-gray-2 uppercase">
            <tr>
              <th className="text-left px-4 py-3">Name</th>
              <th className="text-left px-4 py-3">Type</th>
              <th className="text-left px-4 py-3">Delivery</th>
              <th className="text-left px-4 py-3">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {SHOPS.map((s) => (
              <tr key={s.id} className="hover:bg-gray-50">
                <td className="px-4 py-3 text-sm font-medium text-turtle-dark">{s.name_en}</td>
                <td className="px-4 py-3 text-sm text-turtle-gray-2">{s.type}</td>
                <td className="px-4 py-3 text-sm text-turtle-gray-2">{s.delivery_time} min</td>
                <td className="px-4 py-3">
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${s.is_open ? "bg-green-100 text-green-700" : "bg-red-100 text-red-600"}`}>
                    {s.is_open ? "Open" : "Closed"}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-2xl w-full max-w-md p-6 mx-4">
            <div className="flex justify-between mb-4">
              <h2 className="text-lg font-bold">Add Shop</h2>
              <button onClick={() => setShowForm(false)}><X size={20} /></button>
            </div>
            <div className="space-y-3">
              {["Name (EN)", "Name (BN)", "Logo URL"].map((label) => (
                <input key={label} placeholder={label} className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-turtle-pink" />
              ))}
              <select className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-turtle-pink">
                <option>All In One</option>
                <option>Pharmacy</option>
                <option>Bakery</option>
                <option>Beauty</option>
                <option>Electronics</option>
                <option>Fashion</option>
              </select>
              <input type="number" placeholder="Delivery time (min)" className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-turtle-pink" />
              <label className="flex items-center gap-2 text-sm cursor-pointer">
                <input type="checkbox" defaultChecked className="accent-turtle-pink" />
                Currently Open
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

"use client";

import { useState } from "react";
import { Plus, X } from "lucide-react";

const PRODUCTS = [
  { id: "tm1", name_en: "Fresh Mango (1kg)", category_en: "Fruits", price: 120, original_price: 150, section: "Hot Deals", is_featured: true },
  { id: "tm2", name_en: "Chicken Breast (500g)", category_en: "Meat & Fish", price: 280, original_price: 320, section: "Hot Deals", is_featured: true },
  { id: "tm3", name_en: "Whole Milk (1L)", category_en: "Dairy", price: 80, original_price: 95, section: "Popular", is_featured: false },
];

export default function AdminTurtlemartPage() {
  const [showForm, setShowForm] = useState(false);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-turtle-dark">Turtlemart Products</h1>
        <button onClick={() => setShowForm(true)} className="flex items-center gap-2 bg-turtle-pink text-white px-4 py-2 rounded-full text-sm font-bold">
          <Plus size={16} /> Add Product
        </button>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 text-xs text-turtle-gray-2 uppercase">
            <tr>
              <th className="text-left px-4 py-3">Product</th>
              <th className="text-left px-4 py-3">Category</th>
              <th className="text-left px-4 py-3">Price</th>
              <th className="text-left px-4 py-3">Section</th>
              <th className="text-left px-4 py-3">Featured</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {PRODUCTS.map((p) => (
              <tr key={p.id} className="hover:bg-gray-50">
                <td className="px-4 py-3 text-sm font-medium text-turtle-dark">{p.name_en}</td>
                <td className="px-4 py-3 text-sm text-turtle-gray-2">{p.category_en}</td>
                <td className="px-4 py-3 text-sm font-bold text-turtle-pink">Tk {p.price}</td>
                <td className="px-4 py-3 text-sm text-turtle-gray-2">{p.section}</td>
                <td className="px-4 py-3">
                  {p.is_featured && <span className="text-xs bg-turtle-pink-bg text-turtle-pink px-2 py-0.5 rounded-full">Featured</span>}
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
              <h2 className="text-lg font-bold">Add Product</h2>
              <button onClick={() => setShowForm(false)}><X size={20} /></button>
            </div>
            <div className="space-y-3">
              {["Name (EN)", "Name (BN)", "Category (EN)", "Category (BN)", "Image URL"].map((label) => (
                <input key={label} placeholder={label} className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-turtle-pink" />
              ))}
              <div className="flex gap-3">
                <input type="number" placeholder="Price" className="flex-1 px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-turtle-pink" />
                <input type="number" placeholder="Original Price" className="flex-1 px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-turtle-pink" />
              </div>
              <select className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-turtle-pink">
                <option>Hot Deals</option>
                <option>Popular</option>
                <option>Fresh</option>
              </select>
              <label className="flex items-center gap-2 text-sm cursor-pointer">
                <input type="checkbox" className="accent-turtle-pink" />
                Featured
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

"use client";

import { useState } from "react";
import { Plus, X } from "lucide-react";
import { SEED_VOUCHERS } from "@/lib/seed-data";

export default function AdminVouchersPage() {
  const [vouchers] = useState(SEED_VOUCHERS.map((v, i) => ({ ...v, id: `v${i}` })));
  const [showForm, setShowForm] = useState(false);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-turtle-dark">Vouchers</h1>
        <button onClick={() => setShowForm(true)} className="flex items-center gap-2 bg-turtle-pink text-white px-4 py-2 rounded-full text-sm font-bold">
          <Plus size={16} /> Add Voucher
        </button>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 text-xs text-turtle-gray-2 uppercase">
            <tr>
              <th className="text-left px-4 py-3">Code</th>
              <th className="text-left px-4 py-3">Type</th>
              <th className="text-left px-4 py-3">Value</th>
              <th className="text-left px-4 py-3">Min Order</th>
              <th className="text-left px-4 py-3">Expires</th>
              <th className="text-left px-4 py-3">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {vouchers.map((v) => (
              <tr key={v.id} className="hover:bg-gray-50">
                <td className="px-4 py-3 font-mono font-bold text-turtle-pink">{v.code}</td>
                <td className="px-4 py-3 text-sm text-turtle-gray-2">{v.discount_type === "percent" ? "%" : "Flat"}</td>
                <td className="px-4 py-3 text-sm font-medium">{v.discount_type === "percent" ? `${v.discount_value}%` : `Tk ${v.discount_value}`}</td>
                <td className="px-4 py-3 text-sm text-turtle-gray-2">Tk {v.min_order}</td>
                <td className="px-4 py-3 text-sm text-turtle-gray-2">{v.expires_at}</td>
                <td className="px-4 py-3">
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${v.is_active ? "bg-green-100 text-green-700" : "bg-gray-100 text-turtle-gray-2"}`}>
                    {v.is_active ? "Active" : "Inactive"}
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
              <h2 className="text-lg font-bold">Add Voucher</h2>
              <button onClick={() => setShowForm(false)}><X size={20} /></button>
            </div>
            <div className="space-y-3">
              <input placeholder="Voucher code" className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-turtle-pink" />
              <select className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-turtle-pink">
                <option value="percent">Percentage (%)</option>
                <option value="flat">Flat (Tk)</option>
              </select>
              <input type="number" placeholder="Discount value" className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-turtle-pink" />
              <input type="number" placeholder="Minimum order (Tk)" className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-turtle-pink" />
              <input type="date" className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-turtle-pink" />
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

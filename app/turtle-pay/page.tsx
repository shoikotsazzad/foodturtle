"use client";

import Navbar from "@/components/layout/Navbar";
import MobileNav from "@/components/layout/MobileNav";
import Footer from "@/components/layout/Footer";
import PageTitle from "@/components/shared/PageTitle";
import { Settings, Gift, CreditCard, Plus } from "lucide-react";

export default function TurtlePayPage() {
  return (
    <>
      <PageTitle title="Turtle Pay · Food Turtle" />
      <Navbar />
      <main className="max-w-4xl mx-auto w-full px-4 py-6 pb-20 sm:pb-6">
        <h1 className="text-2xl font-bold text-turtle-dark mb-6">Turtle Pay</h1>

        <div className="grid sm:grid-cols-2 gap-4">
          <div className="bg-white rounded-xl border border-gray-100 p-5">
            <div className="flex items-center justify-between mb-4">
              <p className="font-bold text-turtle-dark">Turtle Pay</p>
              <Settings size={16} className="text-turtle-gray-2" />
            </div>
            <p className="text-xs text-turtle-gray-2 mb-1">Available credit</p>
            <p className="text-3xl font-extrabold text-turtle-dark mb-4">Tk 0</p>
            <div className="flex items-center justify-between border-t border-gray-100 pt-3">
              <div className="flex items-center gap-2">
                <Gift size={16} className="text-turtle-pink" />
                <span className="text-sm text-turtle-dark">Cashback</span>
                <span className="text-xs text-turtle-gray-2">What you&apos;ve earned so far</span>
              </div>
              <span className="text-sm font-bold text-turtle-dark shrink-0">Tk 0</span>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-100 p-5">
            <div className="flex items-center gap-2 mb-4">
              <CreditCard size={16} className="text-turtle-dark" />
              <p className="font-bold text-turtle-dark">Primary payment method</p>
            </div>
            <button className="w-full flex items-center justify-between border border-dashed border-gray-200 rounded-lg px-4 py-3 text-sm text-turtle-gray-2 hover:border-turtle-pink hover:text-turtle-pink transition-colors">
              Save a payment method at checkout and it&apos;ll show up here
              <Plus size={16} />
            </button>
          </div>
        </div>

        <p className="text-xs text-turtle-gray-2 mt-6 italic">
          Your Turtle Pay balance stays at Tk 0 forever. Refunds are only issued for orders that were placed, and no order has ever actually arrived.
        </p>
      </main>
      <Footer />
      <MobileNav />
    </>
  );
}

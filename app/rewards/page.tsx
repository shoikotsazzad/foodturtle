"use client";

import Navbar from "@/components/layout/Navbar";
import MobileNav from "@/components/layout/MobileNav";
import Footer from "@/components/layout/Footer";
import PageTitle from "@/components/shared/PageTitle";
import { Star, ChevronRight, Gift } from "lucide-react";

export default function RewardsPage() {
  return (
    <>
      <PageTitle title="Turtle Rewards · Food Turtle" />
      <Navbar />
      <main className="w-full pb-20 sm:pb-6">
        <div className="bg-turtle-pink px-4 py-10">
          <div className="max-w-3xl mx-auto flex items-center justify-between bg-white rounded-2xl p-6">
            <div>
              <p className="text-xs text-turtle-gray-2 mb-1">Points</p>
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-turtle-pink-bg flex items-center justify-center">
                  <Star size={14} className="text-turtle-pink fill-turtle-pink" />
                </div>
                <span className="text-2xl font-extrabold text-turtle-dark">0</span>
                <ChevronRight size={16} className="text-turtle-gray-2" />
              </div>
              <p className="text-sm font-medium text-turtle-pink mt-3">How to earn points</p>
            </div>
            <img src="/logo.png" alt="" className="w-20 h-20 object-contain hidden sm:block" />
          </div>
        </div>

        <div className="max-w-3xl mx-auto px-4 -mt-4 space-y-4 relative">
          <div className="bg-white rounded-xl border border-gray-100 p-5 text-center">
            <p className="font-bold text-turtle-dark mb-1">New stamp cards are coming your way!</p>
            <p className="text-sm text-turtle-gray-2">Get ready to earn points and redeem amazing rewards. Stay tuned!</p>
          </div>

          <div className="bg-white rounded-xl border border-gray-100 p-5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-turtle-pink-bg flex items-center justify-center shrink-0">
                <Gift size={20} className="text-turtle-pink" />
              </div>
              <div>
                <p className="font-bold text-turtle-dark">Badges</p>
                <p className="text-xs text-turtle-gray-2">Complete stamp cards to earn badges</p>
              </div>
            </div>
            <button className="text-sm font-semibold text-turtle-pink hover:underline">See all</button>
          </div>

          <div className="flex items-center gap-4 py-8">
            <img src="/logo.png" alt="" className="w-16 h-16 object-contain shrink-0" />
            <div>
              <p className="text-xs text-turtle-gray-2">Ready to win?</p>
              <p className="font-bold text-turtle-dark">Turn points into your fave rewards</p>
              <p className="text-xs text-turtle-pink hover:underline cursor-pointer mt-1">Terms &amp; conditions</p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
      <MobileNav />
    </>
  );
}

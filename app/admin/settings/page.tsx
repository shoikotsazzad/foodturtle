"use client";

import { useState } from "react";

export default function AdminSettingsPage() {
  const [appName, setAppName] = useState("Food Turtle");
  const [tagline, setTagline] = useState("The only delivery app that never disappoints, because we never deliver.");
  const [revealDelay, setRevealDelay] = useState(3);
  const [revealMessage, setRevealMessage] = useState("খাবার আসবে না ভাই\nকিন্তু মন ভালো হলো তো?");
  const [maintenance, setMaintenance] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-bold text-turtle-dark mb-6">Settings</h1>

      <div className="bg-white rounded-xl border border-gray-100 p-6 space-y-4">
        <div>
          <label className="text-sm font-medium text-turtle-dark block mb-1">App Name</label>
          <input
            value={appName}
            onChange={(e) => setAppName(e.target.value)}
            className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-turtle-pink"
          />
        </div>
        <div>
          <label className="text-sm font-medium text-turtle-dark block mb-1">Tagline</label>
          <textarea
            value={tagline}
            onChange={(e) => setTagline(e.target.value)}
            className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-turtle-pink h-20 resize-none"
          />
        </div>
        <div>
          <label className="text-sm font-medium text-turtle-dark block mb-1">
            Turtle Reveal Delay (seconds)
          </label>
          <input
            type="number"
            min={1}
            max={30}
            value={revealDelay}
            onChange={(e) => setRevealDelay(Number(e.target.value))}
            className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-turtle-pink"
          />
          <p className="text-xs text-turtle-gray-2 mt-1">
            How long the fake "Order Placed" screen shows before the turtle reveal
          </p>
        </div>
        <div>
          <label className="text-sm font-medium text-turtle-dark block mb-1">Reveal Message</label>
          <textarea
            value={revealMessage}
            onChange={(e) => setRevealMessage(e.target.value)}
            className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-turtle-pink h-28 resize-none"
          />
        </div>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-turtle-dark">Maintenance Mode</p>
            <p className="text-xs text-turtle-gray-2">Redirect all visitors to a maintenance page</p>
          </div>
          <button
            onClick={() => setMaintenance(!maintenance)}
            className={`w-12 h-6 rounded-full transition-colors ${maintenance ? "bg-red-500" : "bg-gray-200"}`}
          />
        </div>
        <button
          onClick={handleSave}
          className={`w-full py-3 rounded-full text-sm font-bold transition-colors ${
            saved ? "bg-turtle-green text-white" : "bg-turtle-pink text-white hover:bg-turtle-pink-light"
          }`}
        >
          {saved ? "Saved! ✓" : "Save Settings"}
        </button>
      </div>
    </div>
  );
}

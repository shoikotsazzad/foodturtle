"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import MobileNav from "@/components/layout/MobileNav";
import Footer from "@/components/layout/Footer";
import PageTitle from "@/components/shared/PageTitle";
import { useLanguage } from "@/context/LanguageContext";
import { useUser } from "@/context/UserContext";
import { MapPin, Link2, CheckCircle2 } from "lucide-react";

export default function ProfilePage() {
  const { t } = useLanguage();
  const router = useRouter();
  const { user, updateUser, logout } = useUser();
  const [firstName, setFirstName] = useState(user.name.split(" ")[0] || "");
  const [lastName, setLastName] = useState(user.name.split(" ").slice(1).join(" "));
  const [phone, setPhone] = useState(user.phone);
  const [saved, setSaved] = useState(false);

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [passwordSaved, setPasswordSaved] = useState(false);

  const [confirmingDelete, setConfirmingDelete] = useState(false);

  const handleSaveProfile = () => {
    updateUser({ name: `${firstName} ${lastName}`.trim(), phone });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleSavePassword = () => {
    if (!currentPassword || !newPassword) return;
    setCurrentPassword("");
    setNewPassword("");
    setPasswordSaved(true);
    setTimeout(() => setPasswordSaved(false), 2000);
  };

  const handleDeleteAccount = () => {
    try {
      localStorage.removeItem("ft_user");
      localStorage.removeItem("ft_favourites");
      localStorage.removeItem("ft_logged_in");
    } catch {}
    logout();
    router.push("/");
  };

  return (
    <>
      <PageTitle title="Profile — Food Turtle" />
      <Navbar />
      <main className="max-w-2xl mx-auto px-4 py-6 pb-20 sm:pb-6">
        <h1 className="text-2xl font-bold text-turtle-dark mb-6">{t("profile_title")}</h1>

        {/* My profile */}
        <div className="bg-white rounded-xl border border-gray-100 p-5 mb-4 space-y-3">
          <p className="font-bold text-turtle-dark mb-1">My profile</p>
          <div>
            <label className="text-xs font-medium text-turtle-gray-2 block mb-1">Email</label>
            <input
              type="email"
              value={user.email}
              disabled
              className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-lg bg-turtle-gray text-turtle-gray-2 cursor-not-allowed"
            />
          </div>
          <div>
            <label className="text-xs font-medium text-turtle-gray-2 block mb-1">First name</label>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-turtle-pink"
              placeholder="First name"
            />
          </div>
          <div>
            <label className="text-xs font-medium text-turtle-gray-2 block mb-1">Last name</label>
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-turtle-pink"
              placeholder="Last name"
            />
          </div>
          <div>
            <label className="text-xs font-medium text-turtle-gray-2 block mb-1">Mobile</label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-turtle-pink"
              placeholder="+880 1234 567890"
            />
          </div>
          <button
            onClick={handleSaveProfile}
            className={`w-full py-3 rounded-full text-sm font-bold transition-colors ${
              saved ? "bg-turtle-green text-white" : "bg-turtle-pink text-white hover:bg-turtle-pink-light"
            }`}
          >
            {saved ? "Saved! ✓" : t("profile_save")}
          </button>
        </div>

        {/* Password */}
        <div className="bg-white rounded-xl border border-gray-100 p-5 mb-4 space-y-3">
          <p className="font-bold text-turtle-dark mb-1">Password</p>
          <input
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            placeholder="Current password"
            className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-turtle-pink"
          />
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="New password"
            className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-turtle-pink"
          />
          <button
            onClick={handleSavePassword}
            disabled={!currentPassword || !newPassword}
            className={`w-full py-3 rounded-full text-sm font-bold transition-colors ${
              !currentPassword || !newPassword
                ? "bg-gray-200 text-turtle-gray-2 cursor-not-allowed"
                : passwordSaved
                ? "bg-turtle-green text-white"
                : "bg-turtle-pink text-white hover:bg-turtle-pink-light"
            }`}
          >
            {passwordSaved ? "Saved! ✓" : "Save"}
          </button>
        </div>

        {/* My payments */}
        <div className="bg-white rounded-xl border border-gray-100 p-5 mb-4">
          <p className="font-bold text-turtle-dark mb-3">My payments</p>
          <p className="text-sm text-turtle-gray-2">You have no saved payment options yet.</p>
        </div>

        {/* Connected accounts */}
        <div className="bg-white rounded-xl border border-gray-100 p-5 mb-4">
          <p className="font-bold text-turtle-dark mb-3">Connected accounts</p>
          <div className="grid grid-cols-2 gap-3">
            <button className="flex items-center gap-2 border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-turtle-dark hover:bg-turtle-gray transition-colors">
              <Link2 size={16} className="text-turtle-gray-2 shrink-0" />
              Facebook — Connect
            </button>
            <div className="flex items-center gap-2 border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-turtle-dark">
              <Link2 size={16} className="text-turtle-green shrink-0" />
              Google — Connected
              <CheckCircle2 size={14} className="text-turtle-green ml-auto shrink-0" />
            </div>
          </div>
        </div>

        {/* Saved addresses */}
        <div className="bg-white rounded-xl border border-gray-100 p-5 mb-4">
          <h2 className="font-bold text-turtle-dark mb-3">{t("profile_addresses")}</h2>
          {user.address ? (
            <div className="flex items-start gap-2">
              <MapPin size={16} className="text-turtle-pink mt-0.5 shrink-0" />
              <div>
                <p className="text-sm font-medium text-turtle-dark">{user.address}</p>
                <p className="text-xs text-turtle-gray-2">{user.city}</p>
              </div>
            </div>
          ) : (
            <p className="text-sm text-turtle-gray-2">No saved addresses</p>
          )}
        </div>

        {/* Account management */}
        <div className="bg-white rounded-xl border border-gray-100 p-5">
          <p className="font-bold text-turtle-dark mb-2">Account Management</p>
          <p className="text-sm text-turtle-gray-2 mb-3">You can delete your account and personal data associated with it.</p>
          {!confirmingDelete ? (
            <button
              onClick={() => setConfirmingDelete(true)}
              className="border border-gray-300 text-turtle-dark text-sm font-medium px-4 py-2 rounded-lg hover:bg-turtle-gray transition-colors"
            >
              Delete my account
            </button>
          ) : (
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-sm text-turtle-dark">Are you sure? This clears your saved profile and favourites.</span>
              <button
                onClick={handleDeleteAccount}
                className="bg-red-500 text-white text-sm font-bold px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
              >
                Yes, delete
              </button>
              <button
                onClick={() => setConfirmingDelete(false)}
                className="border border-gray-300 text-turtle-dark text-sm font-medium px-4 py-2 rounded-lg hover:bg-turtle-gray transition-colors"
              >
                Cancel
              </button>
            </div>
          )}
        </div>
      </main>
      <Footer />
      <MobileNav />
    </>
  );
}

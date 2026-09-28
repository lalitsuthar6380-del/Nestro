"use client";

import { useState } from "react";
import { Lock } from "lucide-react";

export default function ChangePasswordTab() {
  const [password, setPassword] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);

  const API_BASE_URL =
    process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000/api";

  // Handle Input
  const handleChange = (e) => {
    setPassword({
      ...password,
      [e.target.name]: e.target.value,
    });
  };

  // Change Password
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Confirm password check
    if (password.newPassword !== password.confirmPassword) {
      alert("New password and confirm password do not match");
      return;
    }

    // Minimum password length
    if (password.newPassword.length < 6) {
      alert("Password must be at least 6 characters");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        `${API_BASE_URL}/user/change-password`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            currentPassword: password.currentPassword,
            newPassword: password.newPassword,
          }),
        }
      );

      const data = await response.json();

      if (data.success) {
        alert(data.message || "Password changed successfully");

        // Clear form
        setPassword({
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        });
      } else {
        alert(data.message || "Failed to change password");
      }
    } catch (error) {
      console.error("Change password error:", error);

      alert("Something went wrong while changing password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full min-w-0 max-w-3xl">
      {/* Security Box */}
      <div className="mb-5 flex min-w-0 items-start gap-3 rounded-xl border border-gray-200 bg-gray-50 p-3 sm:items-center sm:p-4">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-black text-white sm:h-10 sm:w-10">
          <Lock
            size={17}
            strokeWidth={1.8}
            className="sm:h-[18px] sm:w-[18px]"
          />
        </div>

        <div className="min-w-0">
          <h3 className="text-sm font-bold text-gray-900">
            Account Security
          </h3>

          <p className="mt-0.5 break-words text-[10px] leading-4 text-gray-500 sm:text-[11px]">
            Choose a strong password that you don't use anywhere else.
          </p>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="min-w-0 space-y-4">
        {/* Current Password */}
        <div className="min-w-0">
          <label className="mb-1.5 block text-xs font-semibold text-gray-700">
            Current Password
          </label>

          <input
            type="password"
            name="currentPassword"
            value={password.currentPassword}
            onChange={handleChange}
            placeholder="Enter current password"
            required
            className="h-10 w-full min-w-0 rounded-lg border border-gray-200 bg-white px-3 text-xs text-gray-900 outline-none transition focus:border-black focus:ring-2 focus:ring-gray-100"
          />
        </div>

        {/* New Password */}
        <div className="min-w-0">
          <label className="mb-1.5 block text-xs font-semibold text-gray-700">
            New Password
          </label>

          <input
            type="password"
            name="newPassword"
            value={password.newPassword}
            onChange={handleChange}
            placeholder="Enter new password"
            required
            minLength={6}
            className="h-10 w-full min-w-0 rounded-lg border border-gray-200 bg-white px-3 text-xs text-gray-900 outline-none transition focus:border-black focus:ring-2 focus:ring-gray-100"
          />

          <p className="mt-1.5 text-[10px] text-gray-400">
            Password must be at least 6 characters.
          </p>
        </div>

        {/* Confirm Password */}
        <div className="min-w-0">
          <label className="mb-1.5 block text-xs font-semibold text-gray-700">
            Confirm New Password
          </label>

          <input
            type="password"
            name="confirmPassword"
            value={password.confirmPassword}
            onChange={handleChange}
            placeholder="Confirm new password"
            required
            minLength={6}
            className="h-10 w-full min-w-0 rounded-lg border border-gray-200 bg-white px-3 text-xs text-gray-900 outline-none transition focus:border-black focus:ring-2 focus:ring-gray-100"
          />
        </div>

        {/* Button */}
        <div className="border-t border-gray-100 pt-4">
          <button
            type="submit"
            disabled={loading}
            className="h-10 w-full rounded-lg bg-black px-5 text-xs font-semibold text-white transition hover:bg-gray-800 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
          >
            {loading ? "Changing..." : "Change Password"}
          </button>
        </div>
      </form>
    </div>
  );
}


"use client";

import { useEffect, useState } from "react";
import { User } from "lucide-react";

export default function ProfileTab() {
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    mobile: "",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const API_BASE_URL =
    process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000/api";

  // Get Profile
  useEffect(() => {
    const getProfile = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/user/get-me`, {
          method: "GET",
          credentials: "include",
        });

        const data = await response.json();

        if (data.success && data.user) {
          setProfile({
            name: data.user.name || "",
            email: data.user.email || "",
            mobile: data.user.mobile || "",
          });
        }
      } catch (error) {
        console.error("Get profile error:", error);
      } finally {
        setLoading(false);
      }
    };

    getProfile();
  }, [API_BASE_URL]);

  // Input Change
  const handleChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value,
    });
  };

  // Update Profile
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setSaving(true);

      const response = await fetch(`${API_BASE_URL}/user/update-profile`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          name: profile.name,
          email: profile.email,
          mobile: profile.mobile,
        }),
      });

      const data = await response.json();

      if (data.success) {
        alert(data.message || "Profile updated successfully");

        if (data.user) {
          setProfile({
            name: data.user.name || "",
            email: data.user.email || "",
            mobile: data.user.mobile || "",
          });
        }
      } else {
        alert(data.message || "Failed to update profile");
      }
    } catch (error) {
      console.error("Update profile error:", error);
      alert("Something went wrong while updating profile");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="w-full min-w-0 max-w-3xl">
      {/* Profile Header */}
      <div className="mb-5 flex min-w-0 items-start gap-3 rounded-xl border border-gray-200 bg-gray-50 p-3 sm:items-center sm:p-4">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-black text-white sm:h-10 sm:w-10">
          <User
            size={18}
            strokeWidth={1.8}
            className="sm:h-[19px] sm:w-[19px]"
          />
        </div>

        <div className="min-w-0">
          <h3 className="text-sm font-bold text-gray-900">
            Personal Information
          </h3>

          <p className="mt-0.5 break-words text-[10px] leading-4 text-gray-500 sm:text-[11px]">
            Keep your account details up to date
          </p>
        </div>
      </div>

      {/* Loading */}
      {loading ? (
        <div className="flex min-h-[100px] w-full items-center justify-center rounded-xl border border-gray-200 bg-white p-4 text-center text-xs text-gray-500 sm:min-h-[110px]">
          Loading profile...
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="min-w-0 space-y-4">
          {/* Name */}
          <div className="min-w-0">
            <label className="mb-1.5 block text-xs font-semibold text-gray-700">
              Full Name
            </label>

            <input
              type="text"
              name="name"
              value={profile.name}
              onChange={handleChange}
              placeholder="Enter your name"
              required
              className="h-10 w-full min-w-0 rounded-lg border border-gray-200 bg-white px-3 text-xs text-gray-900 outline-none transition focus:border-black focus:ring-2 focus:ring-gray-100"
            />
          </div>

          {/* Email */}
          <div className="min-w-0">
            <label className="mb-1.5 block text-xs font-semibold text-gray-700">
              Email Address
            </label>

            <input
              type="email"
              name="email"
              value={profile.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
              className="h-10 w-full min-w-0 rounded-lg border border-gray-200 bg-white px-3 text-xs text-gray-900 outline-none transition focus:border-black focus:ring-2 focus:ring-gray-100"
            />
          </div>

          {/* Mobile */}
          <div className="min-w-0">
            <label className="mb-1.5 block text-xs font-semibold text-gray-700">
              Mobile Number
            </label>

            <input
              type="tel"
              name="mobile"
              value={profile.mobile}
              onChange={handleChange}
              placeholder="Enter mobile number"
              className="h-10 w-full min-w-0 rounded-lg border border-gray-200 bg-white px-3 text-xs text-gray-900 outline-none transition focus:border-black focus:ring-2 focus:ring-gray-100"
            />
          </div>

          {/* Button */}
          <div className="border-t border-gray-100 pt-4">
            <button
              type="submit"
              disabled={saving}
              className="h-10 w-full rounded-lg bg-black px-5 text-xs font-semibold text-white transition hover:bg-gray-800 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
            >
              {saving ? "Updating..." : "Update Profile"}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}


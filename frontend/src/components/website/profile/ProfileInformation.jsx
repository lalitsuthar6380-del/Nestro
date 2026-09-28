"use client";

import { useEffect, useState } from "react";
import { User, Loader2 } from "lucide-react";

import { client } from "@/utils/helper";
import { toast } from "sonner";

export default function ProfileInformation() {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // =========================
  // GET LOGGED-IN USER
  // =========================
  const fetchProfile = async () => {
    try {
      setLoading(true);

      const response = await client.get("user/get-me");

      if (response.data?.success) {
        const user = response.data.user;

        setForm({
          fullName: user?.name || "",
          email: user?.email || "",
          phone: user?.mobile || "",
        });
      }
    } catch (error) {
      console.error("Get Profile Error:", error);

      toast.error(
        error.response?.data?.message ||
          "Unable to load profile"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  // =========================
  // HANDLE INPUT
  // =========================
  const handleChange = (field) => (e) => {
    setForm((prev) => ({
      ...prev,
      [field]: e.target.value,
    }));
  };

  // =========================
  // UPDATE PROFILE
  // =========================
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setSaving(true);

      const response = await client.put(
        "user/update-profile",
        {
          name: form.fullName,
          email: form.email,
          mobile: form.phone,
        }
      );

      if (response.data?.success) {
        const user = response.data.user;

        setForm({
          fullName: user?.name || "",
          email: user?.email || "",
          phone: user?.mobile || "",
        });

        toast.success("Profile updated successfully");
      }
    } catch (error) {
      console.error("Update Profile Error:", error);

      toast.error(
        error.response?.data?.message ||
          "Unable to update profile"
      );
    } finally {
      setSaving(false);
    }
  };

  // =========================
  // LOADING
  // =========================
  if (loading) {
    return (
      <section className="flex min-h-[240px] w-full items-center justify-center rounded-2xl bg-white shadow-sm sm:min-h-[280px] md:min-h-[300px]">
        <Loader2
          size={22}
          className="animate-spin text-[#5C4A3A] sm:h-6 sm:w-6"
        />
      </section>
    );
  }

  return (
    <section className="w-full min-w-0 rounded-2xl bg-white p-3 shadow-sm sm:p-4 md:p-5">

      {/* =========================
          HEADER
      ========================= */}
      <div className="mb-5 flex min-w-0 items-start gap-2.5 sm:items-center">

        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#5C4A3A] text-white">
          <User
            size={17}
            strokeWidth={1.75}
          />
        </div>

        <div className="min-w-0">
          <h2 className="text-sm font-semibold leading-tight text-stone-900">
            Profile Information
          </h2>

          <p className="mt-0.5 break-words text-[10px] leading-4 text-stone-500 sm:text-[11px]">
            Keep your personal information up to date.
          </p>
        </div>

      </div>

      {/* =========================
          FORM
      ========================= */}
      <form onSubmit={handleSubmit} className="min-w-0">

        <div className="grid min-w-0 grid-cols-1 gap-3.5 sm:gap-4 md:grid-cols-2">

          {/* FULL NAME */}
          <Field label="Full Name">
            <input
              type="text"
              value={form.fullName}
              onChange={handleChange("fullName")}
              placeholder="Enter your full name"
              required
              className="h-10 w-full min-w-0 rounded-lg border border-stone-300 bg-white px-3 text-xs text-stone-900 outline-none transition focus:border-[#5C4A3A] focus:ring-1 focus:ring-[#5C4A3A]/20"
            />
          </Field>

          {/* EMAIL */}
          <Field label="Email Address">
            <input
              type="email"
              value={form.email}
              disabled
              className="h-10 w-full min-w-0 cursor-not-allowed rounded-lg border border-stone-200 bg-stone-100 px-3 text-xs text-stone-500"
            />
          </Field>

          {/* PHONE */}
          <Field label="Phone Number">
            <input
              type="tel"
              value={form.phone}
              onChange={handleChange("phone")}
              placeholder="Enter phone number"
              className="h-10 w-full min-w-0 rounded-lg border border-stone-300 bg-white px-3 text-xs text-stone-900 outline-none transition focus:border-[#5C4A3A] focus:ring-1 focus:ring-[#5C4A3A]/20"
            />
          </Field>

          {/* SAVE BUTTON */}
          <div className="flex items-end md:justify-end">
            <button
              type="submit"
              disabled={saving}
              className="h-10 w-full rounded-lg bg-stone-900 px-4 text-xs font-medium text-white transition hover:bg-stone-800 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
            >
              {saving ? "Saving..." : "Save Changes"}
            </button>
          </div>

        </div>

      </form>
    </section>
  );
}

// =========================
// FIELD COMPONENT
// =========================
function Field({ label, children }) {
  return (
    <label className="block min-w-0">
      <span className="mb-1.5 block text-[11px] font-medium text-stone-600">
        {label}
      </span>

      {children}
    </label>
  );
}


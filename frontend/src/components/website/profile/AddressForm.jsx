"use client";

import { useState } from "react";
import { MapPin, Loader2 } from "lucide-react";
import { client } from "@/utils/helper";
import { toast } from "sonner";

export default function AddressForm({ onAddressAdded }) {
  const [address, setAddress] = useState({
    fullName: "",
    mobile: "",
    pincode: "",
    addressLine: "",
    city: "",
    state: "",
    country: "India",
  });

  const [loading, setLoading] = useState(false);

  // =========================
  // HANDLE INPUT
  // =========================
  const handleChange = (e) => {
    const { name, value } = e.target;

    setAddress((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // =========================
  // SUBMIT ADDRESS
  // =========================
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const response = await client.post(
        "/user/add-address",
        {
          ...address,
          isDefault: false,
        }
      );

      if (response.data?.success) {
        toast.success(
          response.data.message || "Address added successfully"
        );

        if (onAddressAdded) {
          onAddressAdded(response.data.addresses);
        }

        setAddress({
          fullName: "",
          mobile: "",
          pincode: "",
          addressLine: "",
          city: "",
          state: "",
          country: "India",
        });
      }
    } catch (error) {
      console.error("Add Address Error:", error);

      toast.error(
        error.response?.data?.message ||
          "Unable to add address"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full min-w-0 rounded-2xl border border-stone-200 bg-stone-50 p-3 sm:p-4">

      {/* ================= HEADER ================= */}
      <div className="mb-4 flex min-w-0 items-center gap-2.5">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#5C4A3A] text-white sm:h-9 sm:w-9">
          <MapPin
            size={16}
            strokeWidth={1.75}
            className="sm:h-[17px] sm:w-[17px]"
          />
        </div>

        <div className="min-w-0">
          <h3 className="truncate text-sm font-semibold text-stone-900">
            Add New Address
          </h3>

          <p className="mt-0.5 text-[10px] text-stone-500 sm:text-[11px]">
            Add an address for faster checkout.
          </p>
        </div>
      </div>

      {/* ================= FORM ================= */}
      <form onSubmit={handleSubmit}>

        <div className="grid min-w-0 grid-cols-1 gap-3 md:grid-cols-2">

          {/* FULL NAME */}
          <div className="min-w-0">
            <label className="mb-1.5 block text-xs font-medium text-stone-700">
              Full Name
            </label>

            <input
              type="text"
              name="fullName"
              value={address.fullName}
              onChange={handleChange}
              placeholder="Enter full name"
              required
              className="h-10 w-full min-w-0 rounded-lg border border-stone-200 bg-white px-3 text-sm text-stone-900 outline-none transition placeholder:text-stone-400 focus:border-[#5C4A3A] focus:ring-1 focus:ring-[#5C4A3A]/20"
            />
          </div>

          {/* MOBILE */}
          <div className="min-w-0">
            <label className="mb-1.5 block text-xs font-medium text-stone-700">
              Mobile
            </label>

            <input
              type="tel"
              name="mobile"
              value={address.mobile}
              onChange={handleChange}
              placeholder="Enter mobile number"
              required
              className="h-10 w-full min-w-0 rounded-lg border border-stone-200 bg-white px-3 text-sm text-stone-900 outline-none transition placeholder:text-stone-400 focus:border-[#5C4A3A] focus:ring-1 focus:ring-[#5C4A3A]/20"
            />
          </div>

          {/* PINCODE */}
          <div className="min-w-0">
            <label className="mb-1.5 block text-xs font-medium text-stone-700">
              Pincode
            </label>

            <input
              type="text"
              name="pincode"
              value={address.pincode}
              onChange={handleChange}
              placeholder="Enter pincode"
              required
              className="h-10 w-full min-w-0 rounded-lg border border-stone-200 bg-white px-3 text-sm text-stone-900 outline-none transition placeholder:text-stone-400 focus:border-[#5C4A3A] focus:ring-1 focus:ring-[#5C4A3A]/20"
            />
          </div>

          {/* CITY */}
          <div className="min-w-0">
            <label className="mb-1.5 block text-xs font-medium text-stone-700">
              City
            </label>

            <input
              type="text"
              name="city"
              value={address.city}
              onChange={handleChange}
              placeholder="Enter city"
              required
              className="h-10 w-full min-w-0 rounded-lg border border-stone-200 bg-white px-3 text-sm text-stone-900 outline-none transition placeholder:text-stone-400 focus:border-[#5C4A3A] focus:ring-1 focus:ring-[#5C4A3A]/20"
            />
          </div>

          {/* STATE */}
          <div className="min-w-0">
            <label className="mb-1.5 block text-xs font-medium text-stone-700">
              State
            </label>

            <input
              type="text"
              name="state"
              value={address.state}
              onChange={handleChange}
              placeholder="Enter state"
              required
              className="h-10 w-full min-w-0 rounded-lg border border-stone-200 bg-white px-3 text-sm text-stone-900 outline-none transition placeholder:text-stone-400 focus:border-[#5C4A3A] focus:ring-1 focus:ring-[#5C4A3A]/20"
            />
          </div>

          {/* COUNTRY */}
          <div className="min-w-0">
            <label className="mb-1.5 block text-xs font-medium text-stone-700">
              Country
            </label>

            <input
              type="text"
              name="country"
              value={address.country}
              onChange={handleChange}
              className="h-10 w-full min-w-0 rounded-lg border border-stone-200 bg-white px-3 text-sm text-stone-900 outline-none transition focus:border-[#5C4A3A] focus:ring-1 focus:ring-[#5C4A3A]/20"
            />
          </div>

          {/* ADDRESS */}
          <div className="min-w-0 md:col-span-2">
            <label className="mb-1.5 block text-xs font-medium text-stone-700">
              Address
            </label>

            <textarea
              name="addressLine"
              value={address.addressLine}
              onChange={handleChange}
              placeholder="House no, street, area..."
              required
              rows={3}
              className="w-full min-w-0 resize-none rounded-lg border border-stone-200 bg-white px-3 py-2.5 text-sm text-stone-900 outline-none transition placeholder:text-stone-400 focus:border-[#5C4A3A] focus:ring-1 focus:ring-[#5C4A3A]/20"
            />
          </div>

        </div>

        {/* ================= BUTTON ================= */}
        <div className="mt-4 flex w-full justify-end">

          <button
            type="submit"
            disabled={loading}
            className="inline-flex h-10 w-full items-center justify-center gap-2 rounded-lg bg-[#5C4A3A] px-5 text-sm font-medium text-white transition hover:bg-[#4b3c30] disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
          >
            {loading ? (
              <>
                <Loader2
                  size={16}
                  className="animate-spin"
                />
                Saving...
              </>
            ) : (
              "Save Address"
            )}
          </button>

        </div>

      </form>
    </div>
  );
}


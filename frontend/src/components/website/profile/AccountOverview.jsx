
"use client";

import { useEffect, useState } from "react";
import {
  LayoutGrid,
  Package,
  Heart,
  MapPin,
  Crown,
  Loader2,
} from "lucide-react";

import { client } from "@/utils/helper";
import { toast } from "sonner";

export default function AccountOverview() {
  const [stats, setStats] = useState([
    {
      label: "Total Orders",
      value: "—",
      icon: Package,
    },
    {
      label: "Wishlist Items",
      value: "—",
      icon: Heart,
    },
    {
      label: "Saved Addresses",
      value: "—",
      icon: MapPin,
    },
    {
      label: "Member Since",
      value: "—",
      icon: Crown,
    },
  ]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOverview = async () => {
      try {
        setLoading(true);

        const [profileResponse, ordersResponse] =
          await Promise.all([
            client.get("user/get-me"),
            client.get("order/my-orders?limit=1"),
          ]);

        const user = profileResponse.data.user;

        const totalOrders =
          ordersResponse.data.total || 0;

        const savedAddresses =
          user?.addresses?.length || 0;

        const memberSince = user?.createdAt
          ? new Date(user.createdAt).toLocaleDateString(
              "en-IN",
              {
                month: "short",
                year: "numeric",
              }
            )
          : "—";

        setStats([
          {
            label: "Total Orders",
            value: totalOrders,
            icon: Package,
          },
          {
            label: "Wishlist Items",
            value: "—",
            icon: Heart,
          },
          {
            label: "Saved Addresses",
            value: savedAddresses,
            icon: MapPin,
          },
          {
            label: "Member Since",
            value: memberSince,
            icon: Crown,
          },
        ]);
      } catch (error) {
        console.error("Account Overview Error:", error);

        toast.error(
          error.response?.data?.message ||
            "Unable to load account overview"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchOverview();
  }, []);

  return (
    <section className="w-full min-w-0 rounded-2xl bg-white p-3 shadow-sm sm:p-4">

      {/* ================= HEADER ================= */}
      <div className="mb-3 flex min-w-0 items-center gap-2.5 sm:mb-4">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#5C4A3A] text-white sm:h-9 sm:w-9">
          <LayoutGrid
            size={16}
            strokeWidth={1.75}
            className="sm:h-[17px] sm:w-[17px]"
          />
        </div>

        <div className="min-w-0">
          <h2 className="truncate text-sm font-semibold leading-tight text-stone-900">
            Account Overview
          </h2>

          <p className="mt-0.5 text-[10px] leading-tight text-stone-500 sm:text-[11px]">
            Your activity at a glance.
          </p>
        </div>
      </div>

      {/* ================= LOADING ================= */}
      {loading ? (
        <div className="flex items-center justify-center py-5 text-stone-500 sm:py-6">
          <Loader2
            size={17}
            className="mr-2 animate-spin sm:h-[18px] sm:w-[18px]"
          />

          <span className="text-[11px] sm:text-xs">
            Loading...
          </span>
        </div>
      ) : (

        /* ================= STATS ================= */
        <div className="grid grid-cols-2 gap-2 sm:gap-2.5">
          {stats.map(
            ({ label, value, icon: Icon }) => (
              <div
                key={label}
                className="min-h-[86px] min-w-0 rounded-xl bg-stone-50 p-2.5 sm:min-h-[92px] sm:p-3"
              >

                {/* ICON */}
                <div className="mb-1.5 flex h-7 w-7 items-center justify-center rounded-full bg-[#EADFCB] text-[#5C4A3A] sm:mb-2 sm:h-8 sm:w-8">
                  <Icon
                    size={14}
                    strokeWidth={1.75}
                    className="sm:h-[15px] sm:w-[15px]"
                  />
                </div>

                {/* VALUE */}
                <p className="truncate text-sm font-semibold leading-none text-stone-900 sm:text-base">
                  {value}
                </p>

                {/* LABEL */}
                <p className="mt-1 break-words text-[9px] leading-tight text-stone-500 sm:text-[10px]">
                  {label}
                </p>
              </div>
            )
          )}
        </div>
      )}
    </section>
  );
}

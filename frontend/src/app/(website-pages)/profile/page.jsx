"use client";

import { useState } from "react";

import AccountSidebar from "@/components/website/profile/AccountSidebar";
import WelcomeBanner from "@/components/website/profile/WelcomeBanner";
import ProfileInformation from "@/components/website/profile/ProfileInformation";
import SavedAddresses from "@/components/website/profile/SaveAddresses";
import RecentOrders from "@/components/website/profile/RecentOrders";
import AccountOverview from "@/components/website/profile/AccountOverview";
import QuickActions from "@/components/website/profile/QuickActions";
import ChangePasswordTab from "@/components/website/profile/ChangePasswordTab";

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("profile");

  return (
    <div className="min-h-screen bg-[#F6F4EF]">
      <div className="mx-auto w-full max-w-[1440px] px-3 py-4 sm:px-4 sm:py-5 md:px-7 lg:px-8 lg:py-6">

        {/* Breadcrumb */}
        <div className="mb-4 flex items-center gap-2 overflow-x-auto whitespace-nowrap text-[11px] text-stone-500">
          <span>Home</span>
          <span className="text-stone-300">›</span>
          <span>My Account</span>
          <span className="text-stone-300">›</span>
          <span className="font-semibold text-stone-900">
            Profile
          </span>
        </div>

        {/* Welcome Banner - TOP */}
        <div className="mb-4 w-full">
          <WelcomeBanner />
        </div>

        {/* Sidebar + Main Content */}
        <div className="grid grid-cols-1 items-start gap-4 lg:grid-cols-[176px_minmax(0,1fr)] xl:gap-5">

          {/* Sidebar */}
          <AccountSidebar
            activeTab={activeTab}
            onTabChange={setActiveTab}
          />

          {/* Main */}
          <main className="min-w-0 w-full">

            {activeTab === "profile" && (
              <div className="grid grid-cols-1 gap-3.5 xl:grid-cols-[minmax(0,1fr)_264px]">

                <div className="min-w-0 space-y-3.5">
                  <ProfileInformation />
                  {/* <SavedAddresses /> */}
                  <RecentOrders />
                </div>

                <div className="min-w-0 space-y-3.5">
                  <AccountOverview />
                  <QuickActions onTabChange={setActiveTab} />
                  {/* <PromoCard /> */}
                </div>

              </div>
            )}

            {activeTab === "addresses" && (
              <SavedAddresses />
            )}

            {activeTab === "password" && (
              <div className="rounded-xl border border-stone-200 bg-white p-4 shadow-sm sm:p-5 md:p-8">

                <div className="mb-6 border-b border-stone-100 pb-5 sm:mb-7 sm:pb-6">
                  <h2 className="text-xl font-semibold text-stone-900 sm:text-2xl">
                    Change Password
                  </h2>

                  <p className="mt-1 text-xs text-stone-500 sm:text-sm">
                    Update your password to keep your account secure
                  </p>
                </div>

                <ChangePasswordTab />
              </div>
            )}

            {activeTab === "orders" && (
              <RecentOrders />
            )}

            {activeTab === "wishlist" && (
              <div className="rounded-xl bg-white p-5 text-center shadow-sm sm:p-8">
                <h2 className="text-lg font-semibold text-stone-900 sm:text-xl">
                  My Wishlist
                </h2>

                <p className="mt-2 text-xs text-stone-500 sm:text-sm">
                  Wishlist will appear here.
                </p>
              </div>
            )}

            {activeTab === "notifications" && (
              <div className="rounded-xl bg-white p-5 text-center shadow-sm sm:p-8">
                <h2 className="text-lg font-semibold text-stone-900 sm:text-xl">
                  Notifications
                </h2>

                <p className="mt-2 text-xs text-stone-500 sm:text-sm">
                  Notifications will appear here.
                </p>
              </div>
            )}

          </main>
        </div>
      </div>
    </div>
  );
}


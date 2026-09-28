"use client";

import {
  Zap,
  ClipboardList,
  MapPin,
  Heart,
  Lock,
  Bell,
  HelpCircle,
  ChevronRight,
} from "lucide-react";

const actions = [
  {
    label: "View Orders",
    icon: ClipboardList,
    tab: "orders",
  },
  {
    label: "Manage Addresses",
    icon: MapPin,
    tab: "addresses",
  },
  {
    label: "My Wishlist",
    icon: Heart,
    tab: "wishlist",
  },
  {
    label: "Change Password",
    icon: Lock,
    tab: "password",
  },
  {
    label: "Notifications",
    icon: Bell,
    tab: "notifications",
  },
  {
    label: "Help & Support",
    icon: HelpCircle,
    tab: "help",
  },
];

export default function QuickActions({ onTabChange }) {
  const handleAction = (tab) => {
    if (onTabChange) {
      onTabChange(tab);
    }
  };

  return (
    <section className="w-full min-w-0 rounded-2xl bg-white p-3 shadow-sm sm:p-4">
      {/* Header */}
      <div className="mb-2.5 flex min-w-0 items-center gap-2.5">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#5C4A3A] text-white sm:h-9 sm:w-9">
          <Zap
            size={15}
            strokeWidth={1.8}
            className="sm:h-4 sm:w-4"
          />
        </div>

        <h2 className="min-w-0 truncate text-sm font-semibold text-stone-900">
          Quick Actions
        </h2>
      </div>

      {/* Actions */}
      <ul className="min-w-0">
        {actions.map(({ label, icon: Icon, tab }) => (
          <li key={label} className="min-w-0">
            <button
              type="button"
              onClick={() => handleAction(tab)}
              className="flex min-h-[40px] w-full min-w-0 items-center justify-between gap-2 border-b border-stone-100 py-2.5 text-xs text-stone-700 transition-colors last:border-b-0 hover:text-stone-900"
            >
              <span className="flex min-w-0 items-center gap-2.5">
                <Icon
                  size={15}
                  strokeWidth={1.75}
                  className="shrink-0 text-stone-500"
                />

                <span className="truncate">
                  {label}
                </span>
              </span>

              <ChevronRight
                size={14}
                strokeWidth={1.75}
                className="shrink-0 text-stone-400"
              />
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}


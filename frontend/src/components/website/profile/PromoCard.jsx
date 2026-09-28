"use client";

import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";

export default function PromoCard() {
  const router = useRouter();

  return (
    <section className="relative h-[260px] w-full min-w-0 overflow-hidden rounded-2xl sm:h-[280px] md:h-[300px]">
      {/* Background Image */}
      <img
        src="https://images.unsplash.com/photo-1550254478-ead40cc54513?q=80&w=800&auto=format&fit=crop"
        alt="Bright living room"
        className="absolute inset-0 h-full w-full object-cover"
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/30 to-transparent" />

      {/* Content */}
      <div className="relative flex h-full min-w-0 flex-col justify-between p-4 sm:p-5">
        {/* Heading */}
        <div className="min-w-0">
          <p className="mb-1 text-[9px] font-medium uppercase tracking-[0.15em] text-white/70 sm:text-[10px]">
            Nestro Collection
          </p>

          <h3 className="font-serif text-lg font-medium leading-tight text-white sm:text-xl">
            Make Every
            <br />
            Corner Count
          </h3>
        </div>

        {/* Bottom */}
        <div className="min-w-0">
          <p className="mb-3 max-w-[190px] text-[10px] leading-4 text-white/85 sm:text-[11px]">
            Premium furniture for a better tomorrow.
          </p>

          <button
            type="button"
            onClick={() => router.push("/store")}
            className="inline-flex h-9 max-w-full items-center gap-2 rounded-lg bg-white px-3 text-[10px] font-semibold text-gray-900 transition hover:bg-gray-100 sm:px-3.5 sm:text-[11px]"
          >
            <span className="truncate">Explore Collection</span>
            <ArrowRight size={14} className="shrink-0" />
          </button>
        </div>
      </div>
    </section>
  );
}

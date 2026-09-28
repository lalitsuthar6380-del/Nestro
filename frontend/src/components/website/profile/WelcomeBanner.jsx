"use client";

export default function WelcomeBanner({ name = "Lalit" }) {
  return (
    <div className="relative w-full min-w-0 overflow-hidden rounded-2xl bg-[#DCD3C4]">
      <div className="grid min-w-0 grid-cols-1 items-stretch md:grid-cols-[1.1fr_1.35fr_0.9fr]">

        {/* Left Content */}
        <div className="flex min-w-0 flex-col justify-center p-4 sm:p-5 md:p-6">

          <p className="mb-1.5 text-[9px] font-semibold uppercase tracking-[0.18em] text-stone-500">
            Welcome back
          </p>

          <h1 className="mb-2 truncate font-serif text-2xl leading-tight text-stone-900 sm:text-[28px] md:text-3xl">
            Hey, {name}!
          </h1>

          <p className="mb-3 text-xs text-stone-700">
            Good furniture brings good vibes.
          </p>

          <div className="mb-3 h-px w-7 bg-stone-500" />

          <p className="max-w-[230px] text-[10px] leading-4 text-stone-600">
            Manage your account and make your home more beautiful with
            Nestro.
          </p>

        </div>

        {/* Middle Image */}
        <div className="relative min-h-[150px] w-full sm:min-h-[175px] md:min-h-[190px]">

          <img
            src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=1200&auto=format&fit=crop"
            alt="Warm living room console with lamp and plant"
            className="absolute inset-0 h-full w-full object-cover"
          />

          <div className="absolute inset-0 bg-black/5" />

        </div>

        {/* Right Quote */}
        <div className="flex min-w-0 items-center bg-[#C9BCA6] p-4 sm:p-5 md:p-6">

          <div className="min-w-0">
            <p className="mb-2 text-[9px] font-semibold uppercase tracking-[0.18em] text-stone-500">
              Nestro
            </p>

            <p className="font-serif text-lg leading-snug text-stone-900 sm:text-xl md:text-xl">
              &ldquo;A Better Home For A Brighter Tomorrow&rdquo;
            </p>
          </div>

        </div>

      </div>
    </div>
  );
}


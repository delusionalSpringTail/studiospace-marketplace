import React from "react";
import Link from "next/link";
import {
  ShieldCheck,
  CalendarClock,
  Users,
  Camera,
  ArrowRight,
  Plus,
} from "lucide-react";

interface FeatureItem {
  title: string;
  description: string;
  icon: React.ElementType;
}

const FEATURES: FeatureItem[] = [
  {
    title: "Conflict-Free Scheduling",
    description:
      "Protected by atomic version mutexes. Zero double bookings, guaranteed.",
    icon: ShieldCheck,
  },
  {
    title: "Hourly Flexibility",
    description:
      "Book only the exact hours you need. No monthly minimums or subscriptions.",
    icon: CalendarClock,
  },
  {
    title: "Direct Host Access",
    description:
      "Coordinate load-in, gear requests, and logistics directly with the host.",
    icon: Users,
  },
  {
    title: "Verified Production Gear",
    description:
      "Detailed lighting, acoustic, and electrical specs validated before you walk in.",
    icon: Camera,
  },
];

export default function AboutUs() {
  return (
    <section
      id="about-us"
      className="scroll-mt-16 relative py-20 sm:py-24 lg:py-28 bg-background transition-colors"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Outer Elevated Container */}
        <div className="relative overflow-hidden rounded-3xl border border-border/80 bg-zinc-50/90 dark:bg-zinc-900/60 p-6 sm:p-10 lg:p-14 xl:p-16 shadow-xs">
          {/* Subtle Ambient Emerald Glow */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-24 -left-24 h-80 w-80 rounded-full bg-emerald-500/10 dark:bg-emerald-500/10 blur-3xl"
          />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* Left Column: Story & CTAs */}
            <div className="lg:col-span-5 flex flex-col items-start text-left">
              <span className="inline-flex items-center rounded-full border border-emerald-600/20 bg-emerald-600/10 dark:border-emerald-400/20 dark:bg-emerald-500/10 px-3.5 py-1 text-xs font-semibold tracking-[0.14em] uppercase text-[#15803d] dark:text-emerald-400">
                Built for creators &amp; hosts
              </span>

              <h2 className="mt-5 text-3xl sm:text-4xl lg:text-[40px] font-bold tracking-tight text-foreground leading-[1.15]">
                Your creativity deserves the right environment.
              </h2>

              <p className="mt-5 text-sm sm:text-base text-muted-foreground leading-relaxed">
                StudioSpace eliminates double bookings through database mutex
                locking, provides verified audio/lighting specs, and lets you
                book by the hour with instant confirmation.
              </p>

              {/* Action Buttons */}
              <div className="mt-8 flex flex-wrap items-center gap-3.5 w-full sm:w-auto">
                <Link
                  href="/studios"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-zinc-900 text-white hover:bg-zinc-800 dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-200 px-6 py-3 text-sm font-semibold shadow-xs transition-all duration-200 hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
                >
                  <span>Explore Studios</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>

                <Link
                  href="/studios/new"
                  className="inline-flex items-center justify-center gap-1.5 rounded-full border border-border bg-background/80 hover:bg-accent dark:bg-zinc-900/80 dark:hover:bg-zinc-800 px-6 py-3 text-sm font-semibold text-foreground transition-all duration-200 hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
                >
                  <Plus className="h-4 w-4 text-[#15803d] dark:text-emerald-400" />
                  <span>List Your Space</span>
                </Link>
              </div>
            </div>

            {/* Right Column: 2x2 Feature Cards Grid */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
              {FEATURES.map((feature) => {
                const Icon = feature.icon;
                return (
                  <div
                    key={feature.title}
                    className="group relative rounded-2xl border border-border/80 bg-card dark:bg-zinc-950/75 p-6 sm:p-7 shadow-2xs transition-all duration-300 hover:-translate-y-1 hover:border-emerald-600/40 dark:hover:border-emerald-500/40 hover:shadow-md"
                  >
                    {/* Icon Badge */}
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-border bg-muted/60 dark:bg-zinc-900 text-[#15803d] dark:text-emerald-400 transition-all duration-300 group-hover:scale-105 group-hover:border-emerald-600/30 group-hover:bg-emerald-600/10">
                      <Icon className="h-5 w-5 stroke-[1.8]" />
                    </div>

                    {/* Feature Title & Description */}
                    <h3 className="mt-6 text-base sm:text-lg font-semibold tracking-tight text-foreground">
                      {feature.title}
                    </h3>

                    <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
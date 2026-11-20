import React from "react";
import Link from "next/link";
import {
  Camera,
  CalendarCheck,
  ShieldCheck,
  Users,
  ArrowUpRight,
} from "lucide-react";

interface StepItem {
  number: string;
  title: string;
  description: string;
  footerLabel: string;
  icon: React.ElementType;
}

const STEPS: StepItem[] = [
  {
    number: "01",
    title: "Discover Spaces",
    description:
      "Explore inspiring studios that match your creative vision.",
    footerLabel: "Step 01 of 04",
    icon: Camera,
  },
  {
    number: "02",
    title: "Select Your Hours",
    description:
      "Choose your preferred date and available time slot.",
    footerLabel: "Step 02 of 04",
    icon: CalendarCheck,
  },
  {
    number: "03",
    title: "Book Your Space",
    description:
      "Reserve your studio and manage your booking easily.",
    footerLabel: "Step 03 of 04",
    icon: ShieldCheck,
  },
  {
    number: "04",
    title: "Create & Produce",
    description:
      "Walk in, create something extraordinary and make it yours.",
    footerLabel: "Step 04 of 04",
    icon: Users,
  },
];

export default function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="scroll-mt-16 relative overflow-hidden py-20 sm:py-24 lg:py-28 bg-zinc-50/80 dark:bg-zinc-950 border-b border-border/60 transition-colors"
    >
      {/* Subtle Ambient Background Glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 flex justify-center overflow-hidden"
      >
        <div className="h-80 w-190 rounded-full bg-emerald-500/8 dark:bg-emerald-500/10 blur-3xl" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-emerald-600/20 bg-emerald-600/10 dark:border-emerald-400/20 dark:bg-emerald-500/10 px-3.5 py-1 text-xs font-semibold tracking-[0.16em] uppercase text-[#15803d] dark:text-emerald-400">
            Simple by design
          </span>

          <h2 className="mt-4 text-3xl sm:text-4xl lg:text-[42px] font-bold tracking-tight text-foreground leading-[1.15]">
            Your next project, four steps away.
          </h2>

          <p className="mt-4 text-sm sm:text-base text-muted-foreground leading-relaxed">
            Discover verified spaces, lock in your exact hours with zero double
            bookings, and start creating.
          </p>
        </div>

        {/* Steps Grid with Desktop Connector Line */}
        <div className="relative mt-14 sm:mt-16">
          {/* Horizontal Connector Line behind cards on large screens */}
          <div
            aria-hidden="true"
            className="hidden lg:block absolute top-1/2 left-8 right-8 h-px -translate-y-1/2 bg-linear-to-r from-transparent via-border to-transparent"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
            {STEPS.map((step) => {
              const Icon = step.icon;
              return (
                <div
                  key={step.number}
                  className="group relative flex flex-col justify-between rounded-2xl border border-border/80 bg-card/95 dark:bg-zinc-900/90 p-6 sm:p-7 shadow-xs backdrop-blur-xs transition-all duration-300 hover:-translate-y-1.5 hover:border-emerald-600/40 dark:hover:border-emerald-500/40 hover:shadow-lg hover:shadow-emerald-950/5 dark:hover:shadow-emerald-950/30"
                >
                  {/* Top Subtle Hover Accent Line */}
                  <div
                    aria-hidden="true"
                    className="absolute inset-x-6 top-0 h-px bg-linear-to-r from-transparent via-emerald-500/0 to-transparent transition-all duration-300 group-hover:via-emerald-500/70"
                  />

                  <div>
                    {/* Top Row: Step Number Badge & Icon */}
                    <div className="flex items-center justify-between">
                      <span className="inline-flex h-10 w-11 items-center justify-center rounded-xl border border-border bg-muted/60 dark:bg-zinc-800/80 text-sm font-bold tracking-wider text-[#15803d] dark:text-emerald-400 transition-colors group-hover:border-emerald-600/30 group-hover:bg-emerald-600/10">
                        {step.number}
                      </span>

                      <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-background dark:bg-zinc-800/60 text-muted-foreground transition-all duration-300 group-hover:scale-105 group-hover:border-emerald-600/30 group-hover:text-[#15803d] dark:group-hover:text-emerald-400">
                        <Icon className="h-4.5 w-4.5 stroke-[1.8]" />
                      </div>
                    </div>

                    {/* Title & Description */}
                    <div className="mt-8">
                      <h3 className="text-lg font-semibold tracking-tight text-foreground">
                        {step.title}
                      </h3>
                      <p className="mt-2.5 text-sm text-muted-foreground leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>

                  {/* Card Footer */}
                  <div className="mt-8 pt-4 border-t border-border/70 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#15803d] dark:bg-emerald-400 transition-transform duration-300 group-hover:scale-125" />
                      <span className="text-xs font-medium text-muted-foreground group-hover:text-foreground transition-colors">
                        {step.footerLabel}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom Action Strip */}
        <div className="mt-12 sm:mt-14 flex flex-col sm:flex-row items-center justify-center gap-3 text-center">
          <p className="text-xs sm:text-sm text-muted-foreground">
            Ready to find the right space for your shoot or session?
          </p>
          <Link
            href="/studios"
            className="inline-flex items-center gap-1 text-xs sm:text-sm font-semibold text-[#15803d] dark:text-emerald-400 hover:underline underline-offset-4"
          >
            <span>Browse all verified studios</span>
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
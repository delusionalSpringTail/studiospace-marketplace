"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import {
  Clapperboard,
  Users,
  Trees,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  Plus,
  Sparkles,
  CheckCircle2,
} from "lucide-react";

interface ShowcaseSlide {
  id: number;
  image: string;
  alt: string;
  icon: React.ElementType;
  category: string;
  title: string;
  subtitle: string;
  badgeText: string;
}

const SLIDES: ShowcaseSlide[] = [
  {
    id: 0,
    image:
      "https://i.ibb.co.com/4x8mZ8W/image.png",
    alt: "Creator sitting inside an inspiring studio space",
    icon: Clapperboard,
    category: "Create",
    title: "Create within inspired walls",
    subtitle: "Film, photography & podcast rooms",
    badgeText: "Lighting & Acoustic Ready",
  },
  {
    id: 1,
    image: "https://i.ibb.co.com/Kc59WvrD/image.png",
    alt: "Group of people gathering in a creative venue",
    icon: Users,
    category: "Meet",
    title: "Meet in places of all sorts",
    subtitle: "Workshops, castings & creative offsites",
    badgeText: "Flexible Group Capacities",
  },
  {
    id: 2,
    image: "https://i.ibb.co.com/9myrgTtV/image.png",
    alt: "Architectural house and outdoor location",
    icon: Trees,
    category: "Locations",
    title: "A better way to book locations",
    subtitle: "Architectural homes & daylight sets",
    badgeText: "Hourly Instant Booking",
  },
];

export default function Banner() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % SLIDES.length);
  }, []);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);
  }, []);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(handleNext, 5500);
    return () => clearInterval(timer);
  }, [isPaused, handleNext]);

  const activeSlide = SLIDES[currentIndex];

  return (
    <section
      aria-label="Hero showcase"
      className="relative overflow-hidden bg-background border-b border-border/60 transition-colors"
    >
      {/* Subtle Ambient Background Glow matching HowItWorks & AboutUs */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-32 right-1/4 -z-10 h-105 w-155 rounded-full bg-emerald-500/10 dark:bg-emerald-500/10 blur-3xl"
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Editorial Copy & CTAs */}
          <div className="lg:col-span-6 flex flex-col items-start text-left">
            <span className="inline-flex items-center gap-2 rounded-full border border-emerald-600/20 bg-emerald-600/10 dark:border-emerald-400/20 dark:bg-emerald-500/10 px-3.5 py-1 text-xs font-semibold tracking-[0.14em] uppercase text-[#15803d] dark:text-emerald-400">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Hourly Creative Spaces</span>
            </span>

            <h1 className="mt-5 text-4xl sm:text-5xl lg:text-[54px] font-bold tracking-tight text-foreground leading-[1.1]">
              Create Within{" "}
              <span className="text-[#15803d] dark:text-emerald-400">
                Inspired Walls.
              </span>
            </h1>

            <p className="mt-5 max-w-xl text-base sm:text-lg text-muted-foreground leading-relaxed">
              A better way to book verified studios, daylight lofts, and
              production locations by the hour—with zero double bookings and
              transparent gear specs.
            </p>

            {/* Primary & Secondary CTAs */}
            <div className="mt-8 flex flex-wrap items-center gap-3.5 w-full sm:w-auto">
              <Link
                href="/studios"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#15803d] hover:bg-[#166534] dark:bg-emerald-600 dark:hover:bg-emerald-500 px-6 py-3.5 text-sm sm:text-base font-semibold text-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
              >
                <span>Explore Studios</span>
                <ArrowRight className="h-4 w-4" />
              </Link>

              <Link
                href="/studios/new"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-card hover:bg-accent dark:bg-zinc-900 dark:hover:bg-zinc-800 px-6 py-3.5 text-sm sm:text-base font-semibold text-foreground transition-all duration-200 hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-emerald-500/40"
              >
                <Plus className="h-4 w-4 text-[#15803d] dark:text-emerald-400" />
                <span>List Your Space</span>
              </Link>
            </div>

            {/* Subtle Trust Highlights */}
            <div className="mt-9 pt-6 border-t border-border/70 w-full flex flex-wrap items-center gap-x-6 gap-y-2.5 text-xs sm:text-sm text-muted-foreground">
              <div className="inline-flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-[#15803d] dark:text-emerald-400 shrink-0" />
                <span>Zero double bookings</span>
              </div>
              <div className="inline-flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-[#15803d] dark:text-emerald-400 shrink-0" />
                <span>Book by the hour</span>
              </div>
              <div className="inline-flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-[#15803d] dark:text-emerald-400 shrink-0" />
                <span>Verified lighting &amp; audio</span>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Framed Showcase Card */}
          <div
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            className="lg:col-span-6"
          >
            <div className="rounded-3xl border border-border/80 bg-card dark:bg-zinc-900/90 p-3 sm:p-4 shadow-lg shadow-zinc-950/5 dark:shadow-black/40">
              {/* Top Category Switcher Tabs */}
              <div
                role="tablist"
                aria-label="Studio space categories"
                className="grid grid-cols-3 gap-2 mb-3 sm:mb-4"
              >
                {SLIDES.map((slide, index) => {
                  const Icon = slide.icon;
                  const isActive = index === currentIndex;
                  return (
                    <button
                      key={slide.id}
                      type="button"
                      role="tab"
                      aria-selected={isActive}
                      onClick={() => setCurrentIndex(index)}
                      className={`cursor-pointer flex items-center justify-center gap-2 rounded-2xl px-3 py-2.5 text-xs sm:text-sm font-semibold transition-all duration-200 ${
                        isActive
                          ? "bg-[#15803d] text-white dark:bg-emerald-600 shadow-xs"
                          : "bg-muted/60 dark:bg-zinc-800/70 text-muted-foreground hover:text-foreground hover:bg-muted"
                      }`}
                    >
                      <Icon className="h-4 w-4 shrink-0" />
                      <span>{slide.category}</span>
                    </button>
                  );
                })}
              </div>

              {/* Framed Image Container */}
              <div className="relative h-75 sm:h-95 lg:h-105 w-full overflow-hidden rounded-2xl bg-zinc-900">
                {SLIDES.map((slide, index) => {
                  const isActive = index === currentIndex;
                  return (
                    <div
                      key={slide.id}
                      aria-hidden={!isActive}
                      className={`absolute inset-0 transition-opacity duration-500 ease-in-out ${
                        isActive
                          ? "opacity-100 z-0"
                          : "opacity-0 -z-10 pointer-events-none"
                      }`}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={slide.image}
                        alt={slide.alt}
                        className={`h-full w-full object-cover object-center transition-transform duration-700 ease-out ${
                          isActive ? "scale-100" : "scale-105"
                        }`}
                      />
                    </div>
                  );
                })}

                {/* Top-Left Floating Spec Pill */}
                <div className="absolute top-3.5 left-3.5 z-10 inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-black/55 px-3 py-1 text-xs font-medium text-white backdrop-blur-md">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  <span>{activeSlide.badgeText}</span>
                </div>

                {/* Bottom Gradient Caption Strip (Only at the very bottom so the photo stays bright) */}
                <div className="absolute inset-x-0 bottom-0 z-10 bg-linear-to-t from-black/85 via-black/45 to-transparent p-4 sm:p-5 pt-14 flex items-end justify-between gap-4">
                  <div className="text-left text-white">
                    <p className="text-base sm:text-lg font-semibold leading-snug">
                      {activeSlide.title}
                    </p>
                    <p className="text-xs sm:text-sm text-white/75 mt-0.5">
                      {activeSlide.subtitle}
                    </p>
                  </div>

                  {/* Bottom-Right Prev / Next Buttons */}
                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      type="button"
                      onClick={handlePrev}
                      aria-label="Previous space"
                      className="cursor-pointer flex h-9 w-9 items-center justify-center rounded-full border border-white/25 bg-black/50 text-white backdrop-blur-md transition-colors hover:bg-white hover:text-zinc-900"
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </button>
                    <button
                      type="button"
                      onClick={handleNext}
                      aria-label="Next space"
                      className="cursor-pointer flex h-9 w-9 items-center justify-center rounded-full border border-white/25 bg-black/50 text-white backdrop-blur-md transition-colors hover:bg-white hover:text-zinc-900"
                    >
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
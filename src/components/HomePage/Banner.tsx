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
} from "lucide-react";
import Image from "next/image";

interface Slide {
  id: number;
  image: string;
  alt: string;
  icon: React.ElementType;
  label: string;
  headingTop: string;
  headingBottom: string;
}

const SLIDES: Slide[] = [
  {
    id: 0,
    image: "https://i.ibb.co.com/9myrgTtV/image.png",
    alt: "Architectural house and outdoor location",
    icon: Trees,
    label: "Locations",
    headingTop: "A better way",
    headingBottom: "to book locations",
  },
  {
    id: 1,
    image:
      "https://i.ibb.co.com/4x8mZ8W/image.png",
    alt: "Creator sitting inside an inspiring studio space",
    icon: Clapperboard,
    label: "Create",
    headingTop: "Create",
    headingBottom: "within inspired walls",
  },
  {
    id: 2,
    image: "https://i.ibb.co.com/Kc59WvrD/image.png",
    alt: "Group of people gathering in a creative venue",
    icon: Users,
    label: "Meet",
    headingTop: "Meet",
    headingBottom: "in places of all sorts",
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

  // Auto-play every 6 seconds (pauses on hover)
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(handleNext, 6000);
    return () => clearInterval(timer);
  }, [isPaused, handleNext]);

  // Keyboard arrow navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "ArrowLeft") handlePrev();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleNext, handlePrev]);

  const activeSlide = SLIDES[currentIndex];

  return (
    <section
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      aria-roledescription="carousel"
      aria-label="Featured Studio Categories"
      className="relative w-full h-130 sm:h-150 lg:h-[calc(100vh-4rem)] lg:min-h-150 lg:max-h-210 overflow-hidden bg-zinc-900 dark:bg-zinc-950 select-none border-b border-border/50"
    >
      {/* Background Images with Smooth Crossfade */}
      {SLIDES.map((slide, index) => {
        const isActive = index === currentIndex;
        return (
          <div
            key={slide.id}
            aria-hidden={!isActive}
            className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
              isActive
                ? "opacity-100 z-0"
                : "opacity-0 -z-10 pointer-events-none"
            }`}
          >
            <Image
              src={slide.image}
              alt={slide.alt}
              fill
              priority={index === 0}
              sizes="100vw"
              className={`object-cover object-center transition-transform duration-1000 ease-out ${
                isActive ? "scale-100" : "scale-105"
              }`}
            />

            {/* Lighter, Theme-Aware Overlay (Crisp in Light Mode, Moody in Dark Mode) */}
            <div className="absolute inset-0 bg-black/25 dark:bg-black/40 transition-colors duration-300" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.38)_0%,rgba(0,0,0,0.12)_65%,rgba(0,0,0,0.45)_100%)] dark:bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.45)_0%,rgba(0,0,0,0.25)_65%,rgba(0,0,0,0.65)_100%)]" />
          </div>
        );
      })}

      {/* Center Content Container */}
      <div className="relative z-10 mx-auto flex h-full max-w-6xl flex-col items-center justify-center px-4 sm:px-8 lg:px-12 text-center text-white">
        {/* Top Interactive Category Icons Row */}
        <div
          role="tablist"
          aria-label="Slide categories"
          className="mb-6 sm:mb-8 lg:mb-10 flex items-center gap-5 sm:gap-8 lg:gap-10"
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
                aria-label={`Show ${slide.label} slide`}
                onClick={() => setCurrentIndex(index)}
                className={`cursor-pointer group relative flex flex-col items-center gap-2 p-1.5 rounded-xl transition-all duration-300 focus:outline-none ${
                  isActive
                    ? "text-white scale-110"
                    : "text-white/65 hover:text-white"
                }`}
              >
                <div
                  className={`flex h-11 w-11 sm:h-12 sm:w-12 lg:h-14 lg:w-14 items-center justify-center rounded-full border backdrop-blur-sm transition-all duration-300 ${
                    isActive
                      ? "border-emerald-400 bg-emerald-500/25 text-white shadow-[0_0_24px_rgba(16,185,129,0.45)]"
                      : "border-white/25 bg-black/20 group-hover:border-white/50 group-hover:bg-black/30"
                  }`}
                >
                  <Icon className="h-5 w-5 sm:h-6 sm:w-6 lg:h-7 lg:w-7 stroke-[1.75]" />
                </div>
                <span
                  className={`h-1 rounded-full transition-all duration-300 ${
                    isActive ? "w-6 bg-emerald-400" : "w-0 bg-transparent"
                  }`}
                />
              </button>
            );
          })}
        </div>

        {/* Main Hero Typography */}
        <h1
          key={activeSlide.id}
          className="max-w-4xl text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1] [text-shadow:0_2px_16px_rgba(0,0,0,0.45)] animate-in fade-in slide-in-from-bottom-2 duration-500"
        >
          <span className="block">{activeSlide.headingTop}</span>
          <span className="block mt-1.5">{activeSlide.headingBottom}</span>
        </h1>

        {/* Main CTA Button -> /studios */}
        <div className="mt-8 sm:mt-10 lg:mt-11">
          <Link
            href="/studios"
            className="inline-flex items-center gap-2.5 rounded-xl bg-[#15803d] hover:bg-[#166534] dark:bg-emerald-600 dark:hover:bg-emerald-500 px-6 sm:px-8 py-3 sm:py-3.5 lg:py-4 text-sm sm:text-base lg:text-lg font-semibold text-white shadow-lg transition-all duration-200 hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-emerald-400/70"
          >
            <span>Explore Studios</span>
            <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5" />
          </Link>
        </div>
      </div>

      {/* Bottom-Left Slide Counter */}
      <div className="absolute bottom-5 left-5 sm:bottom-8 sm:left-10 lg:bottom-10 lg:left-12 z-20 flex items-center gap-2.5 text-xs sm:text-sm font-medium text-white/85 [text-shadow:0_1px_4px_rgba(0,0,0,0.5)]">
        <span className="text-white font-semibold">0{currentIndex + 1}</span>
        <span className="h-px w-7 bg-white/50" />
        <span>0{SLIDES.length}</span>
      </div>

      {/* Bottom-Right Left/Right Navigation Controls */}
      <div className="absolute bottom-4 right-4 sm:bottom-8 sm:right-10 lg:bottom-10 lg:right-12 z-20 flex items-center gap-3">
        <button
          type="button"
          onClick={handlePrev}
          aria-label="Previous slide"
          className="cursor-pointer flex h-10 w-10 sm:h-11 sm:w-11 lg:h-12 lg:w-12 items-center justify-center rounded-full border border-white/30 bg-black/30 dark:bg-black/50 text-white backdrop-blur-md transition-all hover:bg-white hover:text-zinc-900 hover:border-white focus:outline-none focus:ring-2 focus:ring-white/60"
        >
          <ChevronLeft className="h-5 w-5 lg:h-6 lg:w-6" />
        </button>

        <button
          type="button"
          onClick={handleNext}
          aria-label="Next slide"
          className="cursor-pointer flex h-10 w-10 sm:h-11 sm:w-11 lg:h-12 lg:w-12 items-center justify-center rounded-full border border-white/30 bg-black/30 dark:bg-black/50 text-white backdrop-blur-md transition-all hover:bg-white hover:text-zinc-900 hover:border-white focus:outline-none focus:ring-2 focus:ring-white/60"
        >
          <ChevronRight className="h-5 w-5 lg:h-6 lg:w-6" />
        </button>
      </div>
    </section>
  );
}

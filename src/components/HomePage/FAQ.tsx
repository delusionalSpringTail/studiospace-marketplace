"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Plus, Minus, HelpCircle, ArrowUpRight } from "lucide-react";

interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

const FAQ_ITEMS: FAQItem[] = [
  {
    id: "booking-hours",
    question: "How does hourly booking work on StudioSpace?",
    answer:
      "Every studio on StudioSpace is booked strictly by the hour with zero monthly commitments. Simply pick your date, select your exact start and end hours on the studio's live calendar, and confirm your reservation—remembering to include setup and wrap time in your selected window.",
  },
  {
    id: "double-bookings",
    question: "How does StudioSpace prevent double bookings?",
    answer:
      "When you confirm a time slot, our booking engine locks that window atomically at the database level. Once your reservation is submitted, those hours are immediately blocked off from other creators so you never have to worry about overlapping schedules.",
  },
  {
    id: "gear-and-specs",
    question: "Are lighting, audio, and power specs verified before I arrive?",
    answer:
      "Yes. Every listing includes a detailed breakdown of included grip, lighting rigs, acoustic treatment, backdrop options, and electrical capacity. You can also message the host directly before or after booking to confirm specific equipment availability or load-in access.",
  },
  {
    id: "reschedule-cancel",
    question: "Can I reschedule or cancel a confirmed studio booking?",
    answer:
      "You can view and manage all upcoming reservations from your My Bookings dashboard. Cancellations or time adjustments made at least 24 hours before your session start time qualify for a full refund or free reschedule, subject to the host's listed policy.",
  },
  {
    id: "list-studio",
    question: "How do I list my own creative studio on StudioSpace?",
    answer:
      "Create a free account, open Add New Studio from your profile menu, and upload high-resolution photos along with your hourly rate, available hours, and included equipment. Once published, creators can discover and book your space immediately.",
  },
];

export default function FAQ() {
  const [openId, setOpenId] = useState<string | null>(FAQ_ITEMS[0].id);

  const toggleItem = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section
      id="faq"
      className="scroll-mt-16 relative overflow-hidden py-20 sm:py-24 lg:py-28 bg-zinc-50/80 dark:bg-zinc-950 border-t border-border/60 transition-colors"
    >
      {/* Subtle Ambient Glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 flex justify-center overflow-hidden"
      >
        <div className="h-75 w-180 rounded-full bg-emerald-500/8 dark:bg-emerald-500/10 blur-3xl" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Left Sticky Header Column */}
          <div className="lg:col-span-5 lg:sticky lg:top-24 text-left">
            <span className="inline-flex items-center gap-2 rounded-full border border-emerald-600/20 bg-emerald-600/10 dark:border-emerald-400/20 dark:bg-emerald-500/10 px-3.5 py-1 text-xs font-semibold tracking-[0.16em] uppercase text-[#15803d] dark:text-emerald-400">
              <HelpCircle className="h-3.5 w-3.5" />
              <span>Got Questions?</span>
            </span>

            <h2 className="mt-4 text-3xl sm:text-4xl lg:text-[40px] font-bold tracking-tight text-foreground leading-[1.15]">
              Frequently asked questions.
            </h2>

            <p className="mt-4 text-sm sm:text-base text-muted-foreground leading-relaxed">
              Everything you need to know about booking creative spaces,
              included studio gear, and hosting on StudioSpace.
            </p>

            {/* Support / Explore Card */}
            <div className="mt-8 rounded-2xl border border-border/80 bg-card/90 dark:bg-zinc-900/80 p-5 sm:p-6 shadow-2xs">
              <p className="text-sm font-semibold text-foreground">
                Still looking for the right space?
              </p>
              <p className="mt-1.5 text-xs sm:text-sm text-muted-foreground leading-relaxed">
                Browse verified photography, podcast, and production studios
                with transparent hourly pricing.
              </p>
              <Link
                href="/studios"
                className="mt-4 inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#15803d] dark:text-emerald-400 hover:underline underline-offset-4"
              >
                <span>Explore Studios</span>
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          {/* Right Accordion Column */}
          <div className="lg:col-span-7 flex flex-col gap-3.5">
            {FAQ_ITEMS.map((item, index) => {
              const isOpen = openId === item.id;
              return (
                <div
                  key={item.id}
                  className={`rounded-2xl border transition-all duration-300 ${
                    isOpen
                      ? "border-emerald-600/40 dark:border-emerald-500/40 bg-card dark:bg-zinc-900 shadow-sm"
                      : "border-border/80 bg-card/80 dark:bg-zinc-900/50 hover:border-border hover:bg-card dark:hover:bg-zinc-900/80"
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => toggleItem(item.id)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-panel-${item.id}`}
                    className="cursor-pointer flex w-full items-center justify-between gap-4 p-5 sm:p-6 text-left focus:outline-none"
                  >
                    <div className="flex items-start sm:items-center gap-3.5">
                      <span
                        className={`mt-0.5 sm:mt-0 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-xs font-bold transition-colors ${
                          isOpen
                            ? "bg-[#15803d] text-white dark:bg-emerald-500 dark:text-zinc-950"
                            : "bg-muted text-muted-foreground dark:bg-zinc-800"
                        }`}
                      >
                        0{index + 1}
                      </span>
                      <span className="text-base sm:text-[17px] font-semibold text-foreground leading-snug">
                        {item.question}
                      </span>
                    </div>

                    <span
                      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-colors ${
                        isOpen
                          ? "border-emerald-600/30 bg-emerald-600/10 text-[#15803d] dark:border-emerald-400/30 dark:bg-emerald-500/15 dark:text-emerald-400"
                          : "border-border bg-background dark:bg-zinc-800/70 text-muted-foreground"
                      }`}
                    >
                      {isOpen ? (
                        <Minus className="h-4 w-4" />
                      ) : (
                        <Plus className="h-4 w-4" />
                      )}
                    </span>
                  </button>

                  {/* Smooth Expandable Answer */}
                  <div
                    id={`faq-panel-${item.id}`}
                    role="region"
                    className={`grid transition-all duration-300 ease-in-out ${
                      isOpen
                        ? "grid-rows-[1fr] opacity-100"
                        : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <div className="px-5 pb-5 sm:px-6 sm:pb-6 pl-14.5 sm:pl-16.5 text-sm sm:text-[15px] text-muted-foreground leading-relaxed">
                        {item.answer}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
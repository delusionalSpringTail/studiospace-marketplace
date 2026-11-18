"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
  isAuthenticated: boolean;
  navLinks: { label: string; href: string }[];
}

export function MobileNav({
  isOpen,
  onClose,
  isAuthenticated,
  navLinks,
}: MobileNavProps) {
  const pathname = usePathname();

  if (!isOpen) return null;

  return (
    <div className="md:hidden border-t border-border bg-background px-4 pt-3 pb-5 space-y-3 animate-in fade-in slide-in-from-top-1 duration-150">
      <nav className="flex flex-col space-y-1">
        {navLinks.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              onClick={onClose}
              className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                isActive
                  ? "bg-accent text-foreground font-semibold"
                  : "text-muted-foreground hover:bg-accent/60 hover:text-foreground"
              }`}
            >
              {link.label}
            </Link>
          );
        })}
      </nav>

      {!isAuthenticated && (
        <div className="pt-2 border-t border-border flex flex-col gap-2">
          <Link
            href="/login"
            onClick={onClose}
            className="w-full text-center rounded-lg border border-border py-2 text-sm font-medium text-foreground hover:bg-accent transition-colors"
          >
            Log in
          </Link>
          <Link
            href="/register"
            onClick={onClose}
            className="w-full text-center rounded-lg bg-[#15803d] hover:bg-[#166534] dark:bg-emerald-600 dark:hover:bg-emerald-500 py-2 text-sm font-medium text-white transition-colors"
          >
            Sign up
          </Link>
        </div>
      )}
    </div>
  );
}
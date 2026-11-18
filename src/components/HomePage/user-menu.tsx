"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import {
  LayoutGrid,
  PlusCircle,
  Building2,
  Calendar,
  LogOut,
  ChevronDown,
  User,
} from "lucide-react";
import { signOut } from "@/lib/auth-client";

interface UserMenuProps {
  user: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
  };
}

export function UserMenu({ user }: UserMenuProps) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // "test name" -> "Test"
  const formatFirstName = (fullName?: string | null) => {
    if (!fullName) return "User";
    const firstWord = fullName.trim().split(/\s+/)[0] || "User";
    return firstWord.charAt(0).toUpperCase() + firstWord.slice(1).toLowerCase();
  };

  // First letter capitalized for fallback avatar
  const getInitial = (fullName?: string | null) => {
    if (!fullName) return "U";
    return fullName.trim().charAt(0).toUpperCase();
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSignOut = async () => {
    setOpen(false);
    await signOut({
      fetchOptions: {
        onSuccess: () => {
          toast.success("Logged out successfully");
          router.push("/");
          router.refresh();
        },
      },
    });
  };

  const navItems = [
    {
      label: "Dashboard",
      href: "/dashboard",
      icon: LayoutGrid,
      iconClass: "text-muted-foreground",
    },
    {
      label: "Add New Studio",
      href: "/studios/new",
      icon: PlusCircle,
      iconClass: "text-green-500 dark:text-green-400",
    },
    {
      label: "My Studio Listings",
      href: "/dashboard/listings",
      icon: Building2,
      iconClass: "text-muted-foreground",
    },
    {
      label: "My Bookings",
      href: "/dashboard/bookings",
      icon: Calendar,
      iconClass: "text-muted-foreground",
    },
  ];

  return (
    <div className="relative" ref={menuRef}>
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
        className="cursor-pointer flex items-center gap-2 rounded-full border border-transparent hover:border-border hover:bg-accent/60 p-1 sm:pr-2.5 transition-colors focus:outline-none"
      >
        {user.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={user.image}
            alt={formatFirstName(user.name)}
            className="h-8 w-8 rounded-full object-cover border border-border"
          />
        ) : (
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-600/15 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-400 font-semibold text-sm border border-emerald-600/20">
            {getInitial(user.name)}
          </div>
        )}

        <span className="hidden sm:inline text-sm font-medium text-foreground">
          {formatFirstName(user.name)}
        </span>

        <ChevronDown
          size={14}
          className={`hidden sm:inline text-muted-foreground transition-transform duration-150 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-56 rounded-xl border border-border bg-popover text-popover-foreground py-1.5 shadow-lg z-50 animate-in fade-in slide-in-from-top-1 duration-150">
          {/* Profile Link */}
          <Link
            href="/profile"
            onClick={() => setOpen(false)}
            className="flex items-center gap-3 px-3.5 py-2.5 text-sm font-medium text-foreground hover:bg-accent transition-colors"
          >
            <User size={17} className="text-muted-foreground shrink-0" />
            <span>Profile</span>
          </Link>

          <div className="my-1 border-t border-border" />

          {/* Main Dashboard Links */}
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 px-3.5 py-2.5 text-sm font-medium text-foreground hover:bg-accent transition-colors"
              >
                <Icon size={17} className={`${item.iconClass} shrink-0`} />
                <span>{item.label}</span>
              </Link>
            );
          })}

          <div className="my-1 border-t border-border" />

          {/* Logout */}
          <button
            type="button"
            onClick={handleSignOut}
            className="cursor-pointer flex w-full items-center gap-3 px-3.5 py-2.5 text-sm font-medium text-red-600 dark:text-red-400 hover:bg-red-500/10 transition-colors"
          >
            <LogOut size={17} className="shrink-0" />
            <span>Logout</span>
          </button>
        </div>
      )}
    </div>
  );
}
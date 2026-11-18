import React from "react";
import Navbar from "@/components/HomePage/Navbar";
import { ProfileSettings } from "@/components/profile/profile-settings";

export default function ProfilePage() {
  return (
    <div className="min-h-screen flex flex-col bg-zinc-50 dark:bg-zinc-950 text-foreground transition-colors">
      <Navbar />
      <main className="flex-1 mx-auto w-full max-w-3xl px-4 py-8 sm:px-6 sm:py-12">
        <ProfileSettings />
      </main>
    </div>
  );
}
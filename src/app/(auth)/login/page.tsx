import React, { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import SignInForm from "@/components/auth/sign-in-form";

function LoginFormSkeleton() {
  return (
    <div className="w-full max-w-[440px] rounded-xl border border-border bg-card p-6 sm:p-8 shadow-sm animate-pulse">
      <div className="mx-auto h-7 w-40 rounded bg-muted mb-2" />
      <div className="mx-auto h-4 w-56 rounded bg-muted mb-6" />
      <div className="space-y-3 mb-6">
        <div className="h-11 w-full rounded-lg bg-muted" />
        <div className="h-11 w-full rounded-lg bg-muted" />
        <div className="h-11 w-full rounded-lg bg-muted" />
      </div>
      <div className="space-y-4">
        <div className="h-11 w-full rounded-lg bg-muted" />
        <div className="h-11 w-full rounded-lg bg-muted" />
        <div className="h-11 w-full rounded-lg bg-muted" />
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col bg-zinc-50 dark:bg-zinc-950 text-foreground transition-colors">

      {/* Centered Card Container */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-8 sm:px-6">
        <Suspense fallback={<LoginFormSkeleton />}>
          <SignInForm />
        </Suspense>

        <div className="mt-6 text-xs sm:text-sm text-muted-foreground hover:text-foreground transition-colors">
          <Link href="/">← Back to home</Link>
        </div>
      </main>
    </div>
  );
}
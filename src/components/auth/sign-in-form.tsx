"use client";

import React, { useState } from "react";
import { Eye, EyeOff, Mail } from "lucide-react";
import Link from "next/link";
import toast from "react-hot-toast";
import { SocialAuthButtons } from "./social-auth-buttons";
import { PasswordChecklist } from "./password-checklist";
// import { signIn } from "@/lib/auth-client"; // Uncomment when Better Auth is setup

export default function SignInForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [touched, setTouched] = useState({ email: false, password: false });

  // Email Validation Rule
  const isValidEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email);

  // 6 characters minimum and added lowercase requirement
  const passwordRules = [
    { label: "At least 6 characters", test: password.length >= 6 },
    { label: "At least one uppercase letter", test: /[A-Z]/.test(password) },
    { label: "At least one lowercase letter", test: /[a-z]/.test(password) },
    { label: "At least one number", test: /[0-9]/.test(password) },
  ];

  const isValidPassword = passwordRules.every((rule) => rule.test);

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setTouched({ email: true, password: true });

    if (!isValidEmail || !isValidPassword) {
      return;
    }

    setIsLoading(true);
    try {
      // TODO: Uncomment when Better Auth is configured
      /*
      const { error } = await signIn.email({
        email,
        password,
        callbackURL: "/",
      });

      if (error) {
        toast.error(error.message || "Invalid credentials");
        return;
      }
      */

      toast.success("Login Successful");
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-[440px] rounded-xl border border-border bg-card text-card-foreground p-6 sm:p-8 shadow-sm">
      {/* Header Section */}
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold tracking-tight text-foreground">
          Welcome back
        </h1>
        <p className="text-xs sm:text-sm text-muted-foreground mt-1.5">
          Don&apos;t have an account?{" "}
          <Link
            href="/register"
            className="font-semibold text-[#15803d] dark:text-emerald-400 hover:underline"
          >
            Sign up
          </Link>
        </p>
      </div>

      {/* Social Login Buttons (Facebook, Google, Apple) */}
      <SocialAuthButtons isLoading={isLoading} />

      {/* Divider */}
      <div className="relative my-6 flex items-center justify-center">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-border" />
        </div>
        <span className="relative bg-card px-3 text-xs sm:text-sm text-muted-foreground">
          or
        </span>
      </div>

      {/* Email & Password Form */}
      <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
        {/* Email Field */}
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="email"
            className="text-sm font-medium text-foreground"
          >
            Email
          </label>
          <div className="relative">
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onBlur={() => setTouched((prev) => ({ ...prev, email: true }))}
              placeholder="Email"
              className={`w-full rounded-lg border pl-3.5 pr-10 py-2.5 text-sm transition-colors outline-none bg-background text-foreground placeholder:text-muted-foreground ${
                touched.email && !isValidEmail
                  ? "border-red-500 focus:border-red-500 ring-1 ring-red-500"
                  : "border-border focus:border-[#15803d] dark:focus:border-emerald-500 focus:ring-1 focus:ring-[#15803d] dark:focus:ring-emerald-500"
              }`}
            />
            <Mail
              size={18}
              className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground"
            />
          </div>
          {touched.email && !isValidEmail && (
            <p className="text-xs text-red-500 dark:text-red-400">
              Please enter a valid email address.
            </p>
          )}
        </div>

        {/* Password Field */}
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center justify-between">
            <label
              htmlFor="password"
              className="text-sm font-medium text-foreground"
            >
              Password
            </label>
            <span
              className="text-xs cursor-pointer text-[#15803d] dark:text-emerald-400 hover:underline"
            >
              Forgot password?
            </span>
          </div>

          <div className="relative">
            <input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onBlur={() => setTouched((prev) => ({ ...prev, password: true }))}
              
              placeholder="At least 6 characters"
              className={`w-full rounded-lg border pl-3.5 pr-10 py-2.5 text-sm transition-colors outline-none bg-background text-foreground placeholder:text-muted-foreground ${
                touched.password && !isValidPassword
                  ? "border-red-500 focus:border-red-500 ring-1 ring-red-500"
                  : "border-border focus:border-[#15803d] dark:focus:border-emerald-500 focus:ring-1 focus:ring-[#15803d] dark:focus:ring-emerald-500"
              }`}
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="cursor-pointer absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground focus:outline-none"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          {/* Dynamic Requirement Checklist */}
          <PasswordChecklist rules={passwordRules} />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="cursor-pointer mt-1 w-full rounded-lg bg-[#15803d] hover:bg-[#166534] dark:bg-emerald-600 dark:hover:bg-emerald-500 py-2.5 text-sm font-semibold text-white transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-600/40 shadow-sm disabled:opacity-60"
        >
          {isLoading ? "Logging in..." : "Log In"}
        </button>
      </form>

      {/* Terms & Privacy Footer */}
      <p className="mt-5 text-center text-xs text-muted-foreground leading-relaxed">
        By logging in you agree to our{" "}
        <span className="text-[#15803d] cursor-pointer dark:text-emerald-400 hover:underline">
          Terms of Service
        </span>{" "}
        and{" "}
        <span className="text-[#15803d] cursor-pointer dark:text-emerald-400 hover:underline">
          Privacy Policy
        </span>
        .
      </p>
    </div>
  );
}
"use client";

import React, { useState } from "react";
import { Eye, EyeOff, Check, X, User, Mail, Lock } from "lucide-react";
import Link from "next/link";
import toast from "react-hot-toast";
import { useRouter, useSearchParams } from "next/navigation";
import { SocialAuthButtons } from "./social-auth-buttons";
import { signUp } from "@/lib/auth-client";

export default function RegisterForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/dashboard";

  const [touched, setTouched] = useState({
    name: false,
    email: false,
    password: false,
    confirmPassword: false,
  });

  // Validations
  const isValidName = name.trim().length >= 2;
  const isValidEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email);

  const passwordRules = [
    { label: "At least 6 characters", test: password.length >= 6 },
    { label: "At least one uppercase letter", test: /[A-Z]/.test(password) },
    { label: "At least one lowercase letter", test: /[a-z]/.test(password) },
    { label: "At least one number", test: /[0-9]/.test(password) },
  ];

  const isValidPassword = passwordRules.every((rule) => rule.test);
  const isValidConfirmPassword =
    confirmPassword.length > 0 && confirmPassword === password;

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setTouched({
      name: true,
      email: true,
      password: true,
      confirmPassword: true,
    });

    if (
      !isValidName ||
      !isValidEmail ||
      !isValidPassword ||
      !isValidConfirmPassword
    ) {
      return;
    }

    setIsLoading(true);
    try {
      // TODO: Uncomment when Better Auth is configured

      const { data, error } = await signUp.email({
        email: email,
        password: password,
        name: name.trim(),
      });

      if (error) {
        toast.error(error.message || "Failed to create account");
        return;
      }

      if (data?.user?.name) {
        toast.success("Account created successfully! Log in to continue.");
        router.push(callbackUrl);
        return;
      }

      toast.success("Account created successfully! Log in to continue.");
      router.push(callbackUrl);
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
          Create an account
        </h1>
        <p className="text-xs sm:text-sm text-muted-foreground mt-1.5">
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-semibold text-[#15803d] dark:text-emerald-400 hover:underline"
          >
            Log in
          </Link>
        </p>
      </div>

      {/* Social Register Buttons at Top (Facebook, Google, Apple) */}
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

      {/* Registration Form */}
      <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
        {/* Name Field */}
        <div className="flex flex-col gap-1.5">
          <label htmlFor="name" className="text-sm font-medium text-foreground">
            Full Name
          </label>
          <div className="relative">
            <input
              id="name"
              name="name"
              type="text"
              autoComplete="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onBlur={() => setTouched((prev) => ({ ...prev, name: true }))}
              placeholder="John Doe"
              className={`w-full rounded-lg border pl-3.5 pr-10 py-2.5 text-sm transition-colors outline-none bg-background text-foreground placeholder:text-muted-foreground ${
                touched.name && !isValidName
                  ? "border-red-500 focus:border-red-500 ring-1 ring-red-500"
                  : "border-border focus:border-[#15803d] dark:focus:border-emerald-500 focus:ring-1 focus:ring-[#15803d] dark:focus:ring-emerald-500"
              }`}
            />
            <User
              size={18}
              className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground"
            />
          </div>
          {touched.name && !isValidName && (
            <p className="text-xs text-red-500 dark:text-red-400">
              Please enter your name (at least 2 characters).
            </p>
          )}
        </div>

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
              placeholder="you@example.com"
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

        {/* Password Field with Responsive Floating Tooltip */}
        <div className="relative flex flex-col gap-1.5">
          <label
            htmlFor="password"
            className="text-sm font-medium text-foreground"
          >
            Password
          </label>
          <div className="relative">
            <input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              autoComplete="new-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onFocus={() => setIsPasswordFocused(true)}
              onBlur={() => {
                setIsPasswordFocused(false);
                setTouched((prev) => ({ ...prev, password: true }));
              }}
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

          {/* Password Validation Tooltip: Up on mobile/tablet, Right side on desktop */}
          {isPasswordFocused && (
            <div className="absolute bottom-[calc(100%+8px)] left-0 lg:bottom-auto lg:left-[calc(100%+12px)] lg:top-0 z-30 w-full lg:w-72 rounded-xl bg-popover text-popover-foreground p-3.5 shadow-xl border border-border transition-all animate-in fade-in slide-in-from-bottom-2 lg:slide-in-from-left-2">
              <p className="text-xs font-semibold text-muted-foreground mb-2">
                Password requirement checklist:
              </p>
              <div className="flex flex-col gap-1.5">
                {passwordRules.map((rule, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2 text-xs sm:text-sm"
                  >
                    {rule.test ? (
                      <Check
                        size={15}
                        className="text-emerald-600 dark:text-emerald-400 shrink-0"
                      />
                    ) : (
                      <X
                        size={15}
                        className="text-red-500 dark:text-red-400 shrink-0"
                      />
                    )}
                    <span
                      className={
                        rule.test
                          ? "text-emerald-600 dark:text-emerald-400 font-medium"
                          : "text-muted-foreground"
                      }
                    >
                      {rule.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {touched.password && !isValidPassword && !isPasswordFocused && (
            <p className="text-xs text-red-500 dark:text-red-400">
              Password does not meet requirements.
            </p>
          )}
        </div>

        {/* Confirm Password Field */}
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="confirmPassword"
            className="text-sm font-medium text-foreground"
          >
            Confirm Password
          </label>
          <div className="relative">
            <input
              id="confirmPassword"
              name="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              autoComplete="new-password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              onBlur={() =>
                setTouched((prev) => ({ ...prev, confirmPassword: true }))
              }
              placeholder="Re-enter your password"
              className={`w-full rounded-lg border pl-3.5 pr-10 py-2.5 text-sm transition-colors outline-none bg-background text-foreground placeholder:text-muted-foreground ${
                touched.confirmPassword && !isValidConfirmPassword
                  ? "border-red-500 focus:border-red-500 ring-1 ring-red-500"
                  : "border-border focus:border-[#15803d] dark:focus:border-emerald-500 focus:ring-1 focus:ring-[#15803d] dark:focus:ring-emerald-500"
              }`}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword((prev) => !prev)}
              className="cursor-pointer absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground focus:outline-none"
              aria-label={
                showConfirmPassword ? "Hide password" : "Show password"
              }
            >
              {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          {touched.confirmPassword && !isValidConfirmPassword && (
            <p className="text-xs text-red-500 dark:text-red-400">
              {confirmPassword.length === 0
                ? "Please confirm your password."
                : "Passwords do not match."}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="cursor-pointer mt-1 w-full rounded-lg bg-[#15803d] hover:bg-[#166534] dark:bg-emerald-600 dark:hover:bg-emerald-500 py-2.5 text-sm font-semibold text-white transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-600/40 shadow-sm disabled:opacity-60"
        >
          {isLoading ? "Creating account..." : "Create Account"}
        </button>
      </form>

      {/* Terms & Privacy Footer */}
      <p className="mt-5 text-center text-xs text-muted-foreground leading-relaxed">
        By signing up you agree to our{" "}
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

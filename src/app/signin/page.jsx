"use client";

import React, { useState } from "react";
import Link from "next/link";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // এখানে আপনার সাইন ইন বা Better Auth এর লগইন লজিক যুক্ত করতে পারেন
  };

  return (
    <div className="min-h-screen bg-base-200/50 flex flex-col items-center justify-center px-4 py-12">
      {/* Header Title & Subtitle */}
      <div className="text-center mb-6 space-y-2">
        <h1 className="text-3xl font-black text-base-content">সাইন ইন</h1>
        <p className="text-sm sm:text-base text-base-content/70">
          বিস্তারিত দাম, বাজার তুলনা ও প্রোফাইল দেখতে অ্যাকাউন্টে ঢুকুন।
        </p>
      </div>

      {/* Main Card */}
      <div className="w-full max-w-md bg-base-100 border border-base-300 shadow-sm rounded-2xl p-6 sm:p-8 space-y-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email Field */}
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-base-content/80">
              ইমেইল
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
              className="input input-bordered w-full rounded-xl bg-base-100 text-base-content focus:input-primary"
            />
          </div>

          {/* Password Field */}
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-base-content/80">
              পাসওয়ার্ড
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="কমপক্ষে ৮ অক্ষর"
              required
              className="input input-bordered w-full rounded-xl bg-base-100 text-base-content focus:input-primary"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 rounded-xl font-bold text-white bg-[#047F39] hover:bg-[#036a30] transition shadow-sm mt-2"
          >
            সাইন ইন
          </button>
        </form>

        {/* Divider */}
        <div className="relative flex py-2 items-center">
          <div className="flex grow border-t border-base-300"></div>
          <span className="flex shrink mx-4 text-xs text-base-content/50 uppercase tracking-wider">
            অথবা
          </span>
          <div className="flex grow border-t border-base-300"></div>
        </div>

        {/* Social Logins */}
        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            className="flex items-center justify-center gap-2 border border-base-300 py-2.5 px-3 rounded-xl hover:bg-base-200 transition text-xs sm:text-sm font-semibold text-base-content"
          >
            {/* Google Icon */}
            <svg className="size-4 shrink-0" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"
              />
              <path
                fill="#34A853"
                d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.13 0-5.78-2.11-6.73-4.96H1.15v3.14C3.13 21.37 7.23 24 12 24z"
              />
              <path
                fill="#FBBC05"
                d="M5.27 14.24c-.25-.72-.38-1.49-.38-2.24s.13-1.52.38-2.24V6.62H1.15C.42 8.08 0 9.99 0 12s.42 3.92 1.15 5.38l4.12-3.14z"
              />
              <path
                fill="#EA4335"
                d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.23 0 3.13 2.63 1.15 6.62l4.12 3.14c.95-2.85 3.6-4.96 6.73-4.96z"
              />
            </svg>
            <span>Google দিয়ে চালিয়ে যান</span>
          </button>

          <button
            type="button"
            className="flex items-center justify-center gap-2 border border-base-300 py-2.5 px-3 rounded-xl hover:bg-base-200 transition text-xs sm:text-sm font-semibold text-base-content"
          >
            {/* GitHub Icon */}
            <svg className="size-4 shrink-0 fill-current" viewBox="0 0 24 24">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
            </svg>
            <span>GitHub দিয়ে চালিয়ে যান</span>
          </button>
        </div>

        {/* Sign up prompt */}
        <div className="text-center text-sm text-base-content/70 pt-2">
          অ্যাকাউন্ট নেই?{" "}
          <Link
            href="/sign-up"
            className="text-[#047F39] font-bold hover:underline"
          >
            সাইন আপ করুন
          </Link>
        </div>
      </div>

      {/* Footer Back Link */}
      <div className="mt-6 text-center">
        <Link
          href="/"
          className="text-sm text-base-content/70 hover:text-base-content transition hover:underline"
        >
          ← হোম পেজে ফিরে যান
        </Link>
      </div>
    </div>
  );
}

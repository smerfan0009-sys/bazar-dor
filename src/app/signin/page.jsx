"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    //Better Auth
  };

  return (
    <div className="min-h-screen bg-base-200/50 flex flex-col items-center pt-8 pb-12 px-4">
      {/* Header Title & Subtitle */}
      <div className="text-center mb-6 space-y-2">
        <h1 className="text-3xl font-black text-base-content">সাইন ইন</h1>
        <p className="text-base sm:text-lg text-base-content/70">
          বিস্তারিত দাম, বাজার তুলনা ও প্রোফাইল দেখতে অ্যাকাউন্টে ঢুকুন।
        </p>
      </div>

      {/* Main Card */}
      <div className="w-full max-w-md bg-base-100 border border-base-300 shadow-sm rounded-2xl p-6 sm:p-8 space-y-6">
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email Field */}
          <div className="space-y-2">
            <label className="text-base font-semibold text-base-content/80">
              ইমেইল
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
              className="input input-bordered w-full rounded-xl bg-base-100 text-base-content text-base py-3 focus:input-primary"
            />
          </div>

          {/* Password Field */}
          <div className="space-y-2">
            <label className="text-base font-semibold text-base-content/80">
              পাসওয়ার্ড
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="কমপক্ষে ৮ অক্ষর"
              required
              className="input input-bordered w-full rounded-xl bg-base-100 text-base-content text-base py-3 focus:input-primary"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3.5 rounded-xl font-bold text-lg text-white bg-[#047F39] hover:bg-[#036a30] transition shadow-sm mt-2"
          >
            সাইন ইন
          </button>
        </form>

        {/* Divider */}
        <div className="relative flex py-2 items-center">
          <div className="flex grow border-t border-base-300"></div>
          <span className="flex shrink mx-4 text-sm text-base-content/50 uppercase tracking-wider">
            অথবা
          </span>
          <div className="flex grow border-t border-base-300"></div>
        </div>

        {/* Social Logins */}
        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            className="flex items-center justify-center gap-2 border border-base-300 py-3 px-3 rounded-xl hover:bg-base-200 transition text-sm sm:text-base font-semibold text-base-content"
          >
            <Image
              src="/assets/Google.svg"
              alt="Google"
              width={20}
              height={20}
              className="shrink-0"
            />
            <span>Google দিয়ে চালিয়ে যান</span>
          </button>

          <button
            type="button"
            className="flex items-center justify-center gap-2 border border-base-300 py-3 px-3 rounded-xl hover:bg-base-200 transition text-sm sm:text-base font-semibold text-base-content"
          >
            <Image
              src="/assets/GitHub.svg"
              alt="GitHub"
              width={20}
              height={20}
              className="shrink-0"
            />
            <span>GitHub দিয়ে চালিয়ে যান</span>
          </button>
        </div>

        {/* Sign up prompt */}
        <div className="text-center text-base text-base-content/70 pt-2">
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
          className="text-base text-base-content/70 hover:text-base-content transition hover:underline"
        >
          ← হোম পেজে ফিরে যান
        </Link>
      </div>
    </div>
  );
}

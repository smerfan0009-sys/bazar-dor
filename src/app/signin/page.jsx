"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { authClient } from "@/lib/auth-client";
import Image from "next/image";
import Link from "next/link";

export default function SignInPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { data, error } = await authClient.signIn.email({
      email,
      password,
    });

    if (data) {
      toast.success("সফলভাবে সাইন ইন হয়েছে!");

      setTimeout(() => {
        router.push("/");
        router.refresh();
      }, 600);
    }

    if (error) {
      toast.error(error.message || "ইমেইল বা পাসওয়ার্ড ভুল হয়েছে!");
    }
  };

  const handleSocialSignIn = async (provider) => {
    try {
      await authClient.signIn.social({
        provider,
        callbackURL: "/",
      });
      toast.info(`${provider} দিয়ে সাইন ইন করা হচ্ছে...`);
    } catch (err) {
      toast.error("সোশ্যাল লগইনে সমস্যা হয়েছে!");
    }
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
            className="w-full py-3.5 rounded-xl font-bold text-lg text-white bg-[#047F39] hover:bg-[#036a30] transition shadow-sm mt-2 cursor-pointer"
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
            onClick={() => handleSocialSignIn("google")}
            className="flex items-center justify-center gap-2 border border-base-300 py-3 px-3 rounded-xl hover:bg-base-200 transition text-sm sm:text-base font-semibold text-base-content cursor-pointer"
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
            onClick={() => handleSocialSignIn("github")}
            className="flex items-center justify-center gap-2 border border-base-300 py-3 px-3 rounded-xl hover:bg-base-200 transition text-sm sm:text-base font-semibold text-base-content cursor-pointer"
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
            href="/signup"
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

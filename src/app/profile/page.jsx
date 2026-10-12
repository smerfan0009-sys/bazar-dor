"use client";

import React, { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "react-toastify";

export default function ProfilePage() {
  const { data: session, isPending, refetch } = authClient.useSession();
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");

  if (isPending) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F4F6F4]">
        <span className="loading loading-spinner loading-lg text-[#047F39]"></span>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center space-y-4 px-4 bg-[#F4F6F4]">
        <h1 className="text-2xl font-bold text-gray-800">
          আপনি সাইন ইন করা নেই!
        </h1>
        <p className="text-gray-600">প্রোফাইল দেখতে প্রথমে সাইন ইন করুন।</p>
        <Link
          href="/signin"
          className="px-6 py-3 bg-[#047F39] text-white font-semibold rounded-xl hover:bg-[#036a30] transition cursor-pointer"
        >
          সাইন ইন করুন
        </Link>
      </div>
    );
  }

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await authClient.updateUser({
        name: name || session.user.name,
      });

      if (error) {
        toast.error(error.message || "নাম হালনাগাদ করতে সমস্যা হয়েছে!");
      } else {
        toast.success("নাম সফলভাবে হালনাগাদ করা হয়েছে!");
        refetch();
      }
    } catch (err) {
      toast.error("একটি অনাকাঙ্ক্ষিত ত্রুটি ঘটেছে।");
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          toast.info("সফলভাবে সাইন আউট করা হয়েছে");
          router.push("/signin");
        },
      },
    });
  };

  return (
    <div
      key={session.user.id}
      className="min-h-screen bg-[#F4F6F4] flex flex-col items-center py-10 px-4"
    >
      <div className="w-full max-w-2xl space-y-6">
        {/* Top Header */}
        <div>
          <h1 className="text-3xl font-black text-gray-900">আমার প্রোফাইল</h1>
          <p className="text-gray-600 text-sm mt-0.5">
            আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।
          </p>
        </div>

        {/* Top Card: User Info & Sign Out */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-xl bg-[#047F39] text-white flex items-center justify-center text-xl font-bold uppercase shrink-0">
              {session.user.name?.charAt(0) || "U"}
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-900">
                {session.user.name}
              </h2>
              <p className="text-sm text-gray-500">{session.user.email}</p>
            </div>
          </div>

          <button
            onClick={handleSignOut}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl border border-red-200 text-red-600 hover:bg-red-50 transition text-sm font-semibold cursor-pointer shrink-0"
          >
            <span>← সাইন আউট</span>
          </button>
        </div>

        {/* Bottom Card: Update Profile Form */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6 sm:p-8 shadow-sm space-y-6">
          <div>
            <h2 className="text-xl font-bold text-gray-900">
              নাম হালনাগাদ করুন
            </h2>
          </div>

          <form onSubmit={handleUpdateProfile} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">নাম</label>
              <input
                type="text"
                defaultValue={session.user.name}
                onChange={(e) => setName(e.target.value)}
                required
                className="input input-bordered w-full rounded-xl bg-white text-gray-900 focus:input-primary border-gray-300"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="px-6 py-3 rounded-xl font-bold text-white bg-[#047F39] hover:bg-[#036a30] transition shadow-sm cursor-pointer disabled:opacity-50"
            >
              {loading ? "হালনাগাদ হচ্ছে..." : "নাম হালনাগাদ করুন"}
            </button>
          </form>
        </div>

        {/* Home Back Link */}
        <div className="pt-2">
          <Link
            href="/"
            className="text-sm text-gray-600 hover:text-gray-900 transition hover:underline"
          >
            ← হোম পেজে ফিরে যান
          </Link>
        </div>
      </div>
    </div>
  );
}

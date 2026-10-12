"use client";

import { useParams, useRouter } from "next/navigation";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { toast } from "react-toastify";

const toBengaliNumber = (num) => {
  if (num === null || num === undefined) return "";
  const englishToBengaliMap = {
    0: "০",
    1: "১",
    2: "২",
    3: "৩",
    4: "৪",
    5: "৫",
    6: "৬",
    7: "৭",
    8: "৮",
    9: "৯",
    ".": ".",
  };
  return num
    .toString()
    .replace(/[0-9.]/g, (digit) => englishToBengaliMap[digit] || digit);
};

const unitMap = {
  kg: "কেজি",
  gm: "গ্রাম",
  liter: "লিটার",
  litre: "লিটার",
  pcs: "পিস",
  piece: "পিস",
  dozen: "ডজন",
};

export default function ProductDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id;

  const { data: session, isPending: sessionPending } = authClient.useSession();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const toastIdRef = useRef(null);

  useEffect(() => {
    if (!sessionPending && !session) {
      if (!toast.isActive(toastIdRef.current)) {
        toastIdRef.current = toast.error(
          "প্রোডাক্টের বিস্তারিত দেখতে প্রথমে সাইন ইন করুন!",
        );
      }
      router.push("/signin");
    }
  }, [session, sessionPending, router]);

  useEffect(() => {
    if (!id || !session) return;

    fetch(`https://openapi.programming-hero.com/api/bazardor/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        const item = data.data || data;
        setProduct(item);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [id, session]);

  if (sessionPending || loading) {
    if (!sessionPending && !session) return null;

    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center font-medium text-lg animate-pulse">
        Loading....
      </div>
    );
  }

  if (!session) {
    return null;
  }

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center text-error font-bold">
        Product not found!
      </div>
    );
  }

  const dir = product.change?.dir;
  const pct = product.change?.pct ?? 0;
  const isUp = dir === "up";
  const isDown = dir === "down";

  const unitName = unitMap[product.unit] || product.unit;

  const markets = product.markets || [];
  const allMins = markets.map((m) => m.min);
  const allMaxs = markets.map((m) => m.max);

  const minPrice = allMins.length ? Math.min(...allMins) : 0;
  const maxPrice = allMaxs.length ? Math.max(...allMaxs) : 0;

  const avgPrice = markets.length
    ? Math.round(
        markets.reduce((acc, m) => acc + (m.min + m.max) / 2, 0) /
          markets.length,
      )
    : product.today;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      <div className="text-sm breadcrumbs text-base-content/70">
        <ul>
          <li>
            <Link href="/">হোম</Link>
          </li>
          <li>
            <Link href={`/categories/${product.category}`}>
              {product.categoryNameBn}
            </Link>
          </li>
          <li className="text-base-content font-semibold">{product.nameBn}</li>
        </ul>
      </div>

      {/* Top Banner Card */}
      <div className="card bg-base-100 border border-base-300 shadow-sm p-6 sm:p-8 rounded-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-center gap-5">
          <span className="grid size-16 sm:size-20 shrink-0 place-items-center rounded-2xl bg-base-200 text-4xl sm:text-5xl">
            {product.image}
          </span>
          <div>
            <h1 className="text-3xl sm:text-4xl font-black text-base-content">
              {product.nameBn}
            </h1>
            <p className="text-sm sm:text-base text-base-content/70 mt-1">
              প্রতি {unitName} · {product.categoryNameBn}
            </p>
            <p className="text-sm font-medium mt-2 text-base-content/80">
              গতকালের তুলনায় আজ দাম{" "}
              <span
                className={
                  isUp
                    ? "text-error font-bold"
                    : isDown
                      ? "text-success font-bold"
                      : ""
                }
              >
                {isUp ? "বেড়েছে" : isDown ? "কমেছে" : "পরিবর্তন হয়নি"}{" "}
                {toBengaliNumber(pct)}%
              </span>
            </p>
          </div>
        </div>

        {/* Todays Price Box */}
        <div className="bg-base-100 border border-base-300 px-6 py-4 rounded-2xl text-right w-full md:w-auto flex flex-col items-end shadow-sm">
          <span className="text-xs sm:text-sm text-base-content/70 font-medium">
            আজকের দাম
          </span>
          <div className="text-2xl sm:text-3xl font-black text-base-content">
            {toBengaliNumber(product.today)}{" "}
            <span className="text-sm font-normal">টাকা / {unitName}</span>
          </div>
          <span
            className={`inline-flex items-center gap-1 text-sm font-bold mt-1 ${
              isUp
                ? "text-error"
                : isDown
                  ? "text-success"
                  : "text-base-content/70"
            }`}
          >
            {isUp && "▲"}
            {isDown && "▼"}
            {toBengaliNumber(pct)}%
          </span>
        </div>
      </div>

      {/* Main Container Card Summary and Table */}
      <div className="card bg-base-100 border border-base-300 shadow-sm p-6 sm:p-8 rounded-2xl space-y-8">
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-base-content">
            দামের সারসংক্ষেপ
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            <div className="card bg-base-100 border border-base-300 p-5 rounded-2xl space-y-1 shadow-sm">
              <p className="text-sm text-base-content/70">সর্বনিম্ন দাম</p>
              <p className="text-2xl font-black text-success">
                {toBengaliNumber(minPrice)} টাকা
              </p>
              <p className="text-xs text-base-content/60">
                সবচেয়ে কম দামের বাজার
              </p>
            </div>

            <div className="card bg-base-100 border border-base-300 p-5 rounded-2xl space-y-1 shadow-sm">
              <p className="text-sm text-base-content/70">সর্বাধিক দাম</p>
              <p className="text-2xl font-black text-error">
                {toBengaliNumber(maxPrice)} টাকা
              </p>
              <p className="text-xs text-base-content/60">
                সবচেয়ে বেশি দামের বাজার
              </p>
            </div>

            <div className="card bg-base-100 border border-base-300 p-5 rounded-2xl space-y-1 shadow-sm">
              <p className="text-sm text-base-content/70">গড় দাম</p>
              <p className="text-2xl font-black text-base-content">
                {toBengaliNumber(avgPrice)} টাকা
              </p>
              <p className="text-xs text-base-content/60">
                প্রতি {unitName}-এর হিসাবে
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-bold text-base-content">
            বাজারভিত্তিক আজকের দাম
          </h2>
          <div className="overflow-x-auto border border-base-300 rounded-2xl">
            <table className="table w-full">
              <thead>
                <tr className="border-b border-base-300 text-base-content font-bold bg-base-200/40">
                  <th>বাজার</th>
                  <th>বিভাগ</th>
                  <th>সর্বনিম্ন</th>
                  <th>সর্বাধিক</th>
                  <th>গড়</th>
                </tr>
              </thead>
              <tbody>
                {markets.map((m, index) => {
                  const mAvg = Math.round((m.min + m.max) / 2);
                  return (
                    <tr
                      key={index}
                      className="border-b border-base-200 hover:bg-base-200/30"
                    >
                      <td className="font-semibold">{m.market}</td>
                      <td>{m.division}</td>
                      <td>{toBengaliNumber(m.min)} টাকা</td>
                      <td>{toBengaliNumber(m.max)} টাকা</td>
                      <td>{toBengaliNumber(mAvg)} টাকা</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Back link */}
      <div>
        <Link
          className="btn btn-ghost"
          href={`/categories/${product.category}`}
        >
          {product.categoryIcon || "📦"} সব {product.categoryNameBn}
        </Link>
      </div>
    </div>
  );
}

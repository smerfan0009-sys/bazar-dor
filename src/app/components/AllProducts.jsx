"use client";

import React, { useState, useEffect } from "react";
import ProductCard from "./ProductCard";

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

export default function AllProducts() {
  const [products, setProducts] = useState([]);
  const [sortType, setSortType] = useState("default");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://openapi.programming-hero.com/api/bazardor/products")
      .then((res) => res.json())
      .then((data) => {
        const list = Array.isArray(data) ? data : data.data || [];
        setProducts(list);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const sortedProducts = [...products].sort((a, b) => {
    if (sortType === "low-to-high") return a.today - b.today;
    if (sortType === "high-to-low") return b.today - a.today;
    return 0;
  });

  if (loading) {
    return <div className="text-center py-10 text-lg">Load hocche...</div>;
  }

  return (
    <div id="AllProducts" className="max-w-7xl mx-auto px-4 py-8 space-y-6">
      {/* Header & Sort Section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-base-300 pb-4">
        <div>
          <h1 className="text-3xl font-black text-base-content">সব পণ্য</h1>
          <p className="text-sm text-base-content/70 mt-1">
            মোট {toBengaliNumber(products.length)}টি পণ্য দেখানো হচ্ছে
          </p>
        </div>

        {/* Sort Dropdown */}
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-base-content/70">
            সাজান
          </span>
          <select
            value={sortType}
            onChange={(e) => setSortType(e.target.value)}
            className="select select-bordered select-sm rounded-lg"
          >
            <option value="default">ডিফল্ট</option>
            <option value="low-to-high">কম দাম থেকে বেশি</option>
            <option value="high-to-low">বেশি দাম থেকে কম</option>
          </select>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {sortedProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

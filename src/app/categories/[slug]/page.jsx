"use client";

import { useParams } from "next/navigation";
import React, { useState, useEffect } from "react";
import ProductCard from "../../components/ProductCard";
import SortDropdown from "../../components/SortDropdown";

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

export default function CategoryProductsPage() {
  const params = useParams();
  const categorySlug = params.slug;

  const [products, setProducts] = useState([]);
  const [sortType, setSortType] = useState("default");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!categorySlug) return;

    fetch(
      `https://openapi.programming-hero.com/api/bazardor/products?category=${categorySlug}`
    )
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
  }, [categorySlug]);

  const sortedProducts = [...products].sort((a, b) => {
    if (sortType === "low-to-high") return a.today - b.today;
    if (sortType === "high-to-low") return b.today - a.today;
    return 0;
  });

  if (loading) {
    return <div className="text-center py-20 text-lg">লোড হচ্ছে...</div>;
  }

  const categoryName = products[0]?.categoryNameBn || categorySlug;
  const categoryIcon = products[0]?.categoryIcon || "📦";
  const totalCountText = toBengaliNumber(products.length);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      <div className="card bg-base-100 border border-base-300 shadow-sm p-6 sm:p-8 rounded-2xl flex flex-row items-center gap-5">
        <span className="grid size-16 sm:size-20 shrink-0 place-items-center rounded-2xl bg-base-200 text-4xl sm:text-5xl">
          {categoryIcon}
        </span>
        <div>
          <h1 className="text-3xl sm:text-4xl font-black text-base-content">
            {categoryName}
          </h1>
          <p className="text-sm sm:text-base text-base-content/70 mt-1">
            {totalCountText}টি পণ্যের আজকের দাম ও পরিবর্তন
          </p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-base-300 pb-4">
        <p className="text-sm font-medium text-base-content/70">
          মোট {totalCountText}টি পণ্য দেখানো হচ্ছে
        </p>

        <SortDropdown sortType={sortType} setSortType={setSortType} />
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {sortedProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
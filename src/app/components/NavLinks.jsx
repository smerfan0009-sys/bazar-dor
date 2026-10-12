"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState, useEffect } from "react";

export default function NavLinks() {
  const pathname = usePathname();
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch("https://openapi.programming-hero.com/api/bazardor/categories")
      .then((res) => res.json())
      .then((data) => {
        const list = Array.isArray(data) ? data : data.data || [];
        setCategories(list);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="flex items-center justify-center gap-2 sm:gap-4 border-b border-gray-100 overflow-x-auto">
      {categories.map((n) => {
        const href = `/categories/${n.slug}`;
        const isActive = pathname === href;

        return (
          <Link
            key={n.id}
            href={href}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-200 shrink-0 ${
              isActive
                ? "bg-[#047F39] text-white font-bold shadow-md"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            <span>{n.icon}</span>
            <span>{n.nameBn}</span>
          </Link>
        );
      })}
    </div>
  );
}

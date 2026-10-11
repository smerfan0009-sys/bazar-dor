import Link from "next/link";
import React from "react";

const NavLinks = async () => {
  const res = await fetch(
    "https://openapi.programming-hero.com/api/bazardor/categories",
  );
  const data = await res.json();

  return (
    <div className="flex items-center justify-center gap-4 border-b border-gray-100">
      {data.map((n) => (
        <Link
          href={`/categories/${n.slug}`}
          key={n.id}
          className="flex items-center gap-2 hover:bg-gray-200 px-4 py-2 rounded-xl transition-colors"
        >
          <span>{n.icon}</span>
          <span>{n.nameBn}</span>
        </Link>
      ))}
    </div>
  );
};

export default NavLinks;

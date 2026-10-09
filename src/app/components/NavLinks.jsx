import Link from "next/link";
import React from "react";

const NavLinks = async () => {
  const res = await fetch(
    "https://api.api-store.workers.dev/api/bazardor/categories",
  );
  const data = await res.json();

  return (
    <div className="flex items-center justify-center gap-4 py-4 border-b border-gray-200">
      {data.map((n) => (
        <Link
          href={`/categories/${n.slug}`}
          key={n.id}
          className="flex items-center gap-2 hover:text-[#05893E] transition-colors"
        >
          <span>{n.icon}</span>
          <span>{n.nameBn}</span>
        </Link>
      ))}
    </div>
  );
};

export default NavLinks;

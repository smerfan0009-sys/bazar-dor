import React from "react";

export default function ProductSkeleton() {
  return (
    <div className="flex flex-col gap-4 w-full p-5 bg-base-100 border border-base-300 rounded-2xl shadow-sm">
      <div className="skeleton h-40 w-full rounded-xl bg-base-200"></div>

      <div className="skeleton h-5 w-3/4 bg-base-200"></div>

      <div className="skeleton h-4 w-1/2 bg-base-200"></div>

      <div className="skeleton h-10 w-full rounded-xl bg-base-200 mt-2"></div>
    </div>
  );
}

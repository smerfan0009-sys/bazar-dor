import React from "react";
import ProductCard from "./ProductCard";

const TodayPriceUpAndDown = async () => {
  const res = await fetch(
    "https://openapi.programming-hero.com/api/bazardor/products",
  );
  const data = await res.json();
  const products = Array.isArray(data) ? data : data.data || [];

  const activeProducts = products.filter(
    (n) => n?.change?.dir && n.change.dir !== "flat" && n.change.pct !== 0,
  );

  const upProducts = activeProducts
    .filter((n) => n.change.dir === "up")
    .sort((a, b) => b.change.pct - a.change.pct)
    .slice(0, 6);

  const downProducts = activeProducts
    .filter((n) => n.change.dir === "down")
    .sort((a, b) => b.change.pct - a.change.pct)
    .slice(0, 6);

  return (
    <div className="space-y-10 py-6 max-w-7xl mx-auto px-4">
      {/* Today Price Increase */}
      {upProducts.length > 0 && (
        <section>
          <div className="mb-5 flex items-center gap-2">
            <span aria-hidden="true" className="text-error text-xl font-black">
              ▲
            </span>
            <h2 className="text-2xl font-extrabold text-base-content">
              আজ দাম বেড়েছে
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {upProducts.map((n) => (
              <ProductCard key={n.id} product={n} isUp={true} />
            ))}
          </div>
        </section>
      )}

      {/* Today Price Decrease */}
      {downProducts.length > 0 && (
        <section>
          <div className="mb-5 flex items-center gap-2">
            <span
              aria-hidden="true"
              className="text-success text-xl font-black"
            >
              ▼
            </span>
            <h2 className="text-2xl font-extrabold text-base-content">
              আজ দাম কমেছে
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {downProducts.map((n) => (
              <ProductCard key={n.id} product={n} isUp={false} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default TodayPriceUpAndDown;

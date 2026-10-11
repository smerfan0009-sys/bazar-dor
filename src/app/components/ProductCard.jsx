import Link from "next/link";

const unitMap = {
  kg: "কেজি",
  gm: "গ্রাম",
  liter: "লিটার",
  litre: "লিটার",
  pcs: "পিস",
  piece: "পিস",
  dozen: "ডজন",
};

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

export default function ProductCard({ product, isUp }) {
  return (
    <Link
      href={`/product/${product.slug}`}
      className="card border border-base-300 bg-base-100 transition hover:border-primary hover:shadow-lg rounded-2xl block"
    >
      <div className="card-body gap-3 p-5">
        <div className="flex items-start gap-4">
          <span
            aria-hidden="true"
            className="grid size-14 shrink-0 place-items-center rounded-xl bg-base-200 text-3xl"
          >
            {product.image}
          </span>
          <div className="min-w-0">
            <h3 className="truncate text-lg font-bold text-base-content">
              {product.nameBn}
            </h3>
            <p className="text-sm text-base-content/70">
              প্রতি {unitMap[product.unit] || product.unit}
            </p>
          </div>
        </div>

        <div className="flex items-end justify-between gap-2 mt-2">
          <div>
            <p className="text-sm text-base-content/70">আজকের দাম</p>
            <p className="text-2xl font-black text-base-content">
              {toBengaliNumber(product.today)}{" "}
              <span className="text-base font-medium">টাকা</span>
            </p>
          </div>
          <span
            className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-sm font-bold ${
              isUp
                ? "bg-red-50 text-error border border-red-200"
                : "bg-green-50 text-success border border-green-200"
            }`}
            title={isUp ? "গতকালের তুলনায় বেড়েছে" : "গতকালের তুলনায় কমেছে"}
          >
            <span aria-hidden="true">{isUp ? "▲" : "▼"}</span>
            {toBengaliNumber(product.change.pct)}%
          </span>
        </div>
      </div>
    </Link>
  );
}

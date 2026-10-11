import MarqueeText from "react-marquee-text";
import "react-marquee-text/dist/styles.css";

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

const Marquee = async () => {
  const res = await fetch(
    "https://openapi.programming-hero.com/api/bazardor/products",
  );
  const data = await res.json();

  const headlines = Array.isArray(data) ? data : data.data || [];

  return (
    <div className="flex py-1 border-y border-gray-200">
      <MarqueeText
        duration={15}
        direction="right"
        speed={40}
        pauseOnHover={true}
      >
        {headlines
          .filter((n) => n?.change?.dir !== "flat" && n?.change?.pct !== 0)
          .map((n) => (
            <span
              key={n.id}
              className="inline-flex items-center gap-2 mx-3 pr-6 border-r border-gray-200 text-md"
            >
              <span className="text-lg">{n.image}</span>
              <span className="text-gray-800">{n.nameBn}:</span>

              <span className="text-gray-500 font-medium">
                {toBengaliNumber(n.today)}
              </span>

              <span className="text-gray-500 font-medium">
                টাকা/{unitMap[n.unit] || n.unit}
              </span>
              <span
                className={`font-medium inline-flex items-center gap-1 ${
                  n.change?.dir === "up" ? "text-green-600" : "text-red-600"
                }`}
              >
                {n.change?.dir === "up" ? "▲" : "▼"}{" "}
                {toBengaliNumber(n.change?.pct)}%
              </span>
            </span>
          ))}
      </MarqueeText>
    </div>
  );
};

export default Marquee;

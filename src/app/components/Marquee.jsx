import MarqueeText from "react-marquee-text";
import "react-marquee-text/dist/styles.css";

const Marquee = async () => {
  const res = await fetch(
    "https://api.api-store.workers.dev/api/bazardor/products",
  );
  const headlines = await res.json();

  return (
    <div className="flex py-2 bg-gray-50 border-y border-gray-200">
      <MarqueeText
        duration={5}
        direction="right"
        speed={40}
        pauseOnHover={true}
      >
        {headlines.map((n) => (
          <span
            key={n.id}
            className="inline-flex items-center gap-2 mx-3 pr-6 border-r border-gray-200 text-sm"
          >
            <span className="text-lg">{n.image}</span>
            <span className=" text-gray-900">{n.nameBn}:</span>
            <span className="text-gray-600 font-medium">{n.today}</span>
            <span className="text-gray-600 font-medium">টাকা/{n.unit}</span>
          </span>
        ))}
      </MarqueeText>
    </div>
  );
};

export default Marquee;

import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center text-center px-4 space-y-6">
      <h1 className="text-7xl sm:text-9xl font-black text-[#047F39]">৪০৪</h1>

      <h2 className="text-2xl sm:text-3xl font-bold text-base-content">
        পেইজটি খুঁজে পাওয়া যায়নি!
      </h2>

      <p className="text-base-content/70 max-w-md text-sm sm:text-base">
        আপনি যে পেজ বা পণ্যটি খুঁজছেন তা মুছে ফেলা হয়ে থাকতে পারে অথবা ইউআরএল
        ভুল রয়েছে।
      </p>

      <Link
        href="/"
        className="btn bg-[#047F39] hover:bg-[#036a30] text-white font-bold px-6 py-3 rounded-xl transition shadow-sm cursor-pointer"
      >
        ← হোম পেজে ফিরে যান
      </Link>
    </div>
  );
}

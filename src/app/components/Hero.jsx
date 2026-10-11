import Image from "next/image";
import Link from "next/link";
import React from "react";

const currentDate = new Date().toLocaleDateString("bn-BD", {
  dateStyle: "full",
});

const Hero = () => {
  return (
    <section className="hero max-w-7xl mx-auto rounded-3xl border border-base-300 bg-white shadow-sm p-6 sm:p-10 my-6">
      <div className="hero-content w-full flex-col items-center justify-between gap-8 lg:flex-row">
        <div className="max-w-xl text-left">
          <span className="mb-3 inline-block rounded-full bg-[#E1F0E7] px-3.5 py-2 text-sm font-medium text-[#05893E] border border-emerald-100">
            {currentDate}
          </span>

          <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl lg:text-5xl leading-[1.3] mb-4">
            আজকের বাজারের দাম এক <br /> নজরে
          </h1>

          <p className="text-gray-600 text-base sm:text-lg leading-relaxed mb-6">
            চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক
            বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।
          </p>

          <div>
            <Link
              href="#AllProducts"
              className="inline-flex items-center justify-center px-6 py-4 text-sm font-semibold text-white bg-[#05893E] shadow-emerald-600 hover:bg-[#046e32] hover:text-gray-200 rounded-xl shadow-md transition-all duration-200  "
            >
              সব পণ্য দেখুন
            </Link>
          </div>
        </div>

        <div className="flex justify-center w-full lg:w-auto">
          <Image
            alt="Hero Picture"
            width="360"
            height="288"
            src="/assets/bazar-hero.png"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;

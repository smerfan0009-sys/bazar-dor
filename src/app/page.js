import React from "react";
import Marquee from "./components/Marquee";
import Image from "next/image";
import Hero from "./components/Hero";
import TodayPriceUpAndDown from "./components/TodayPriceUpAndDown";
import AllProducts from "./components/AllProducts";


const Home = () => {
  return (
    <div className="bg-[#F0F5F0] min-h-screen font-bengali">
      <Marquee />
      <Hero />
      <TodayPriceUpAndDown />
      <AllProducts />

    </div>
  );
};

export default Home;

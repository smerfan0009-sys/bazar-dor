import React from "react";
import Image from "next/image";
import Hero from "./components/Hero";
import TodayPriceUpAndDown from "./components/TodayPriceUpAndDown";
import AllProducts from "./components/AllProducts";


const Home = () => {
  return (
    <div className="min-h-screen font-bengali">
      <Hero />
      <TodayPriceUpAndDown />
      <AllProducts />
    </div>
  );
};

export default Home;


import React from "react";
import Marquee from "./components/Marquee";
import Image from "next/image";
import Hero from "./components/Hero";


const Home = () => {
  return (
    <div className="bg-gray-50/50 p-6 min-h-screen font-bengali">
      <Marquee />
      <Hero />

    </div>
  );
};

export default Home;

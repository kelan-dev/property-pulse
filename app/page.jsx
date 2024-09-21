import React from "react";
import Hero from "@/components/hero";
import InfoBoxes from "@/components/info-boxes";
import HomeProperties from "@/components/home-properties";
import FeaturedProperties from "@/components/featured-properties";

export default function HomePage() {
  return (
    <>
      <Hero />
      <InfoBoxes />
      <FeaturedProperties />
      <HomeProperties />
    </>
  );
}

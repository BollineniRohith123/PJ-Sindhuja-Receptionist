
import React from "react";
import Header from "@/components/layout/Header";
import HeroSection from "@/components/sections/HeroSection";
import FeaturesSection from "@/components/sections/FeaturesSection";
import Footer from "@/components/layout/Footer";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <HeroSection />
      <FeaturesSection />
      <Footer />
    </div>
  );
};

export default Index;

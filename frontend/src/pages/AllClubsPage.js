import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import AllClubsHeroSection from "../components/AllClubsHeroSection";

function AllClubsPage() {
  return (
    <div className="w-full">
      <Header />
      <AllClubsHeroSection />
      <Footer />
    </div>
  );
}

export default AllClubsPage;

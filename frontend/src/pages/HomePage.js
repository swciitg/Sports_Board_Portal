import React from "react";
// Import components
import Header from "../components/Header";
import Footer from "../components/Footer";

function HomePage() {
  return (
    <div>
      <Header />
      <div className="bg-gray-500 h-[80vh] w-full"></div>
      <Footer />
    </div>
  );
}

export default HomePage;

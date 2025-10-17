import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoMenu } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";
import swbLogo from "../assets/swb_logo.png";
import { useHomePageData } from "../hooks/useHomePageData";

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { data, error } = useHomePageData();
  const navigate = useNavigate();
  const mobileMenuRef = useRef(null);

  const handleLogoClick = () => {
    navigate("/");
    setIsMenuOpen(false);
  };

  const handleMobileMenuClick = () => {
    setIsMenuOpen(false);
  };

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMenuOpen]);

  // Close mobile menu on window resize to desktop size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div 
      ref={mobileMenuRef}
      className="sticky top-0 z-50 w-full h-auto font-poppins bg-white shadow-sm border-b border-gray-100"
    >
      <div className="w-full h-[100px] md:h-[120px] p-1 md:p-3">
        <div className="w-full h-full flex items-center justify-between px-5 md:px-10 lg:px-20 xl:px-40">
          <div 
            onClick={handleLogoClick}
            className="flex items-center gap-2 md:gap-3 cursor-pointer hover:opacity-80 transition-opacity duration-200"
          >
            <img
              src={data?.homepage[0]?.logoimgurl}
              alt="Sports Board IIT Guwahati"
              className="w-[50px] h-[54px] md:w-[70px] md:h-[75px] object-contain"
            />
            <div className="leading-4 md:leading-5 text-xs md:text-sm text-gray-800">
              <p className="font-semibold">
                SPORTS
                <br /> BOARD <br />
              </p>
              <p className="font-extralight md:font-light">IIT Guwahati</p>
            </div>
          </div>
          <div className="hidden md:flex p-2 gap-5 md:gap-8 lg:gap-12">
            <Link
              to="/"
              className="text-gray-700 hover:text-[#7BB9C4] hover:underline underline-offset-[5px] transition-all duration-200 font-medium"
            >
              Home
            </Link>
            <Link
              to="/clubs"
              className="text-gray-700 hover:text-[#7BB9C4] hover:underline underline-offset-[5px] transition-all duration-200 font-medium"
            >
              Clubs
            </Link>
            <Link
              to="/events"
              className="text-gray-700 hover:text-[#7BB9C4] hover:underline underline-offset-[5px] transition-all duration-200 font-medium"
            >
              Events
            </Link>
            <Link
              to="/contacts"
              className="text-gray-700 hover:text-[#7BB9C4] hover:underline underline-offset-[5px] transition-all duration-200 font-medium"
            >
              Contacts
            </Link>
          </div>
          <div
            onClick={() => setIsMenuOpen((prev) => !prev)}
            className="md:hidden pr-2 sm:pr-5 text-2xl md:text-3xl cursor-pointer text-gray-700 hover:text-[#7BB9C4] transition-colors duration-200"
          >
            {isMenuOpen ? <RxCross2 /> : <IoMenu />}
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      <div
        className={`md:hidden absolute top-full left-0 w-full bg-white border-t border-gray-100 shadow-lg transition-all duration-300 ease-in-out ${
          isMenuOpen 
            ? 'opacity-100 visible translate-y-0' 
            : 'opacity-0 invisible -translate-y-2'
        }`}
      >
        <div className="flex flex-col py-4">
          <Link
            to="/"
            onClick={handleMobileMenuClick}
            className="px-6 py-3 text-gray-700 hover:text-[#7BB9C4] hover:bg-gray-50 transition-all duration-200 font-medium border-b border-gray-100 last:border-b-0"
          >
            Home
          </Link>
          <Link
            to="/clubs"
            onClick={handleMobileMenuClick}
            className="px-6 py-3 text-gray-700 hover:text-[#7BB9C4] hover:bg-gray-50 transition-all duration-200 font-medium border-b border-gray-100 last:border-b-0"
          >
            Clubs
          </Link>
          <Link
            to="/events"
            onClick={handleMobileMenuClick}
            className="px-6 py-3 text-gray-700 hover:text-[#7BB9C4] hover:bg-gray-50 transition-all duration-200 font-medium border-b border-gray-100 last:border-b-0"
          >
            Events
          </Link>
          <Link
            to="/contacts"
            onClick={handleMobileMenuClick}
            className="px-6 py-3 text-gray-700 hover:text-[#7BB9C4] hover:bg-gray-50 transition-all duration-200 font-medium"
          >
            Contacts
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Header;

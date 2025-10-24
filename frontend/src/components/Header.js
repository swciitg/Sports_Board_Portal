import React, { useState } from "react";
import { Link, NavLink } from 'react-router-dom';
import { IoMenu } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";
import sbLogo from "../assets/sports_board_logo.jpg";
import { useHomePageData } from "../hooks/useHomePageData";

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { data, error } = useHomePageData();
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
   const navItems = [
    { name: 'Home', slug: "/"},
    { name: "Clubs", slug: "/clubs"},
    { name: "Events", slug: "/events"},
    { name: "Announcements", slug: "/announcements" },
    { name: "Contacts", slug: "/contacts"},
  ];
// console.log("data", data);
  return (
    <>
    <header className="shadow-lg sticky top-0 z-50 bg-white">
      <div className="w-full mx-auto p-2 md:py-4 md:px-6">
        <nav className="flex items-center justify-between px-4 py-2 sm:px-6 lg:px-8">
          {/* Logo */}
          <div className="mr-4 gap-2 flex items-center">
            <Link to="/">
              <img 
                src={sbLogo}
                alt="Sports Board IIT Guwahati" 
                className="w-[61px] h-[66px] md:w-[86px] md:h-[92px] object-contain"
            />
            </Link>
            <span className="font-bold text-md lg:text-xl text-gray-900 tracking-wide">SPORTS BOARD</span>
          </div>
          <ul className="hidden lg:flex items-center ml-auto space-x-4 text-md">
            {navItems.map((item) =>
              (
                <li key={item.name}>
                  <NavLink
                    to={item.slug}
                    className={({ isActive }) =>
                      `inline-block px-4 py-2 duration-300 rounded-full font-medium transition-all text-center
                      ${isActive ? "text-blue-700 bg-blue-50" : "text-gray-600 hover:text-blue-800 hover:bg-gray-50"}`
                    }
                  >
                    {item.name}
                  </NavLink>
                </li>
              ) 
            )}
          </ul>

          {/* Hamburger Menu Button (Visible on mobile) */}
          <div className="lg:hidden flex">
            <button onClick={toggleMenu}>
              {isMenuOpen ? <RxCross2 size={24} /> : <IoMenu size={24} />}
            </button>
          </div>
        </nav>
        {/* Mobile Menu (Dropdown) */}
        
          <div className={`lg:hidden transition-all duration-300 ease-in-out overflow-hidden ${isMenuOpen ? 'max-h-screen' : 'max-h-0'}`}>
            <ul className="flex flex-col items-start justify-center space-y-3  sm:space-y-4 pt-4 text-sm sm:text-base">
              {navItems.map((item) =>
                  (<li className='m-0 w-full' key={item.name}>
                    <NavLink
                      to={item.slug}
                      onClick={toggleMenu} 
                      className={({ isActive }) =>
                        `inline-block px-4 py-2 duration-200 rounded-lg font-medium w-full text-center
                        ${isActive ? "text-blue-700 bg-blue-50" : "text-gray-700 bg-gray-100 hover:text-blue-700"}`
                      }
                    >
                      {item.name}
                    </NavLink>
                  </li>)
              )}
              
            </ul>
          </div>
      </div>
    </header>
    </>
  );
}

export default Header;

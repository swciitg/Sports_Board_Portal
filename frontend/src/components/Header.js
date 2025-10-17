import React, { useState } from "react";
import { Link } from "react-router-dom";
import { IoMenu } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";
import swbLogo from "../assets/swb_logo.png";
import { useHomePageData } from "../hooks/useHomePageData";

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { data, error } = useHomePageData();
// console.log("data", data);
  return (
    <div className="fixed top-0 left-0 w-full z-50 bg-white shadow-sm font-poppins transition-all duration-200">
      <div className="w-full h-[132px] p-1 md:p-3">
        <div className="w-full h-full flex items-center justify-between px-5 md:px-10 lg:px-20 xl:px-40">
          <div className="flex items-center gap-2 md:gap-3 cursor-pointer">
            <img
              src={data?.homepage[0]?.logoimgurl}
              alt="Sports Board IIT Guwahati"
              className="w-[61px] h-[66px] md:w-[86px] md:h-[92px] object-contain"
            />
            <div className="leading-4 md:leading-6 text-xs md:text-base">
              <p className="font-semibold">
                SPORTS
                <br /> BOARD <br />
              </p>
              <p className="font-extralight md:font-light">IIT Guwahati</p>
            </div>
          </div>
          <div className="hidden md:flex p-2 gap-5 md:gap-10 lg:gap-20">
            <Link
              to="/"
              className="hover:text-[#7BB9C4] hover:underline underline-offset-[5px] duration-100"
            >
              Home
            </Link>
            <Link
              to="/clubs"
              className="hover:text-[#7BB9C4] hover:underline underline-offset-[5px] duration-100"
            >
              Clubs
            </Link>
            <Link
              to="/events"
              className="hover:text-[#7BB9C4] hover:underline underline-offset-[5px] duration-100"
            >
              Events
            </Link>
              <Link
              to="/"
              className="hover:text-[#7BB9C4] hover:underline underline-offset-[5px] duration-100"
            >
              Anouncements
            </Link>
            <Link
              to="/contacts"
              className="hover:text-[#7BB9C4] hover:underline underline-offset-[5px] duration-100"
            >
              Contacts
            </Link>
          </div>
          <div
            onClick={() => setIsMenuOpen((prev) => !prev)}
            className="md:hidden pr-2 sm:pr-5 text-3xl cursor-pointer"
          >
            {isMenuOpen ? <RxCross2 /> : <IoMenu />}
          </div>
        </div>
      </div>
      <div
        style={isMenuOpen ? {} : { display: "none" }}
        className="md:hidden flex w-full flex-col gap-3 p-5 absolute backdrop-blur-[3px]"
      >
        <Link
          to="/"
          className="cursor-pointer text-gray-200 hover:text-gray-300 duration-100"
        >
          Home
        </Link>
        <hr />
        <Link
          to="/clubs"
          className="cursor-pointer text-gray-200 hover:text-gray-300 duration-100"
        >
          Clubs
        </Link>
        <hr />
        <Link
          to="/events"
          className="cursor-pointer text-gray-200 hover:text-gray-300 duration-100"
        >
          Events
        </Link>
        <hr />
        <hr />
        <Link
          to="/contacts"
          className="cursor-pointer text-gray-200 hover:text-gray-300 duration-100"
        >
          Contacts
        </Link>
      </div>
    </div>
  );
}

export default Header;

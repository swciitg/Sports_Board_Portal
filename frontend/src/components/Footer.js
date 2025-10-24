// Footer.js
import React from "react";
import { FaLinkedinIn } from "react-icons/fa6";
import { IoLogoInstagram } from "react-icons/io5";
import { BsYoutube } from "react-icons/bs";
import { FaTwitter } from "react-icons/fa";
import sbLogo from "../assets/sports_board_logo.jpg";
import swcLogo from "../assets/swc_logo.jpg";
import { useHomePageData } from "../hooks/useHomePageData";

function Footer() {
  const socialUrls = {
    instagram: "https://www.instagram.com/sports_iit_guwahati/",
    youtube: "https://www.youtube.com/@sportsboardiitguwahati",
  };
  
  const { data, error } = useHomePageData();

  return (
    <div className="w-full bg-gray-800 text-white font-poppins">
      <div className="flex justify-center px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="flex flex-col sm:flex-row items-center sm:items-start justify-around gap-8 lg:gap-12 w-full">
          {/* Left Section - Logo and Contact Info */}
          <div className="flex flex-col lg:flex-row items-center sm:items-start gap-6 lg:gap-8">
            <div className="flex md:flex-row flex-col items-center sm:items-start gap-4 lg:gap-6">
              <img
                src={sbLogo}
                alt="SPORTS BOARD IIT GUWAHATI"
                className="h-20 lg:h-28 object-contain rounded-xl flex-shrink-0"
              />
              <div className="flex flex-col gap-2">
                <h2 className="font-extrabold text-center sm:text-start text-2xl lg:text-3xl leading-tight">
                  SPORTS BOARD<br />
                  IIT GUWAHATI
                </h2>
                <div className="text-gray-300 text-center sm:text-start text-sm lg:text-base space-y-1">
                  <p>OLD SAC Building IIT Guwahati</p>
                  <p>Guwahati, Assam - 781039</p>
                  <p>+91-361-258162</p>
                  <p>sportsec@iitg.ac.in</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Section - Social Media and SWC Info */}
          <div className="flex flex-col items-center sm:items-end md:items-start gap-6">
            {/* Social Media Links */}
            <div className="flex flex-col items-end lg:items-start gap-4">
              <div className="flex border border-gray-400 rounded-lg overflow-hidden">
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href={socialUrls.instagram}
                  className="p-3 lg:p-4 text-xl lg:text-2xl hover:bg-[#cd486b] transition-colors duration-200 border-r border-gray-400"
                >
                  <IoLogoInstagram />
                </a>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href={socialUrls.youtube}
                  className="p-3 lg:p-4 text-xl lg:text-2xl hover:bg-[#FF0000] transition-colors duration-200"
                >
                  <BsYoutube />
                </a>
              </div>
            </div>

            {/* SWC Info and Copyright */}
            <div className="flex flex-col items-center sm:items-end lg:items-start gap-3 text-right lg:text-left">
              <div className="flex md:flex-row flex-col md:items-center items-center sm:items-end gap-3 lg:gap-4">
                <img
                  src={swcLogo}
                  alt="Students Web Committee"
                  className="h-10 lg:h-14 rounded-full outline object-contain"
                />
                <div className="text-sm lg:text-base text-center sm:text-start text-gray-300">
                  <p>Maintained by Students'</p>
                  <p>Web Committee IITG</p>
                </div>
              </div>
              <p className="text-sm lg:text-base text-center sm:text-start text-gray-400">
                &copy; SPORTS BOARD, IIT Guwahati
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
import React from "react";
import { FaLinkedinIn } from "react-icons/fa6";
import { IoLogoInstagram } from "react-icons/io5";
import { BsYoutube } from "react-icons/bs";
import { FaTwitter } from "react-icons/fa";

function Footer() {
  const socialUrls = {
    linkedin: "https://www.google.com/",
    instagram: "https://www.google.com/",
    youtube: "https://www.google.com/",
    twitter: "https://www.google.com/",
  };

  return (
    <div className="w-full min-h-[400px] px-5 md:px-10 lg:px-20 xl:px-36 py-5 md:py-16 flex items-center bg-gray-400 font-poppins">
      {/* Repeated elements to match the responsiveness of given figma */}
      {/* For upto sm */}
      <div className="sm:hidden w-full h-full flex flex-col gap-10 items-center justify-between px-2">
        <div className="flex items-start justify-center md:items-center gap-3 md:gap-4">
          <img
            src="/sgc_logo.jpg"
            alt="Students Gymkhana Council"
            className="h-[80px]"
          />
          <div className="leading-3 md:leading-4 lg:leading-5 flex flex-col md:gap-3">
            <p className="font-extrabold text-lg md:text-2xl lg:text-3xl">
              STUDENTS GYMKHANA <br />
              COUNCIL
            </p>
          </div>
        </div>
        <div className="flex w-fit border border-white text-white">
          <a
            target="_blank"
            href={socialUrls.linkedin}
            className="border-[1px] p-1 md:p-2 text-2xl lg:text-3xl cursor-pointer duration-150 hover:bg-[#0077B5]"
          >
            <FaLinkedinIn />
          </a>
          <a
            target="_blank"
            href={socialUrls.instagram}
            className="border-[1px] p-1 md:p-2 text-2xl lg:text-3xl cursor-pointer duration-150 hover:bg-[#cd486b]"
          >
            <IoLogoInstagram />
          </a>
          <a
            target="_blank"
            href={socialUrls.youtube}
            className="border-[1px] p-1 md:p-2 text-2xl lg:text-3xl cursor-pointer duration-150 hover:bg-[#FF0000]"
          >
            <BsYoutube />
          </a>
          <a
            target="_blank"
            href={socialUrls.twitter}
            className="border-[1px] p-1 md:p-2 text-2xl lg:text-3xl cursor-pointer duration-150 hover:bg-[#1da1f2]"
          >
            <FaTwitter />
          </a>
        </div>
        <div className="flex gap-5">
          <p className="text-xs md:text-base mb-1 tracking-tight">
            New SAC Building IIT Guwahati,
            <br />
            Guwahati, Assam - 781039
            <br />
            +91-361-258162
            <br />
            sgciitg@gmail.com
          </p>
          <div className="flex flex-col justify-center gap-1 md:gap-3 text-xs md:text-base tracking-tight leading-5 sm:leading-5">
            <div className="flex gap-2 sm:gap-3">
              <img
                className="h-[30px]"
                src="/swc_logo.jpg"
                alt="Students Web Committee"
              />
              <p>
                Maintained by Student's &nbsp;
                <br className="hidden sm:inline" />
                Web Committee &nbsp;
                <br className="hidden sm:inline" />
                &nbsp; IITG
              </p>
            </div>
            <p>&copy; Students Gymkhana Council, IIT Guwahati</p>
          </div>
        </div>
      </div>
      {/* For larger display than sm */}
      <div className="hidden w-full h-full sm:flex flex-col gap-10 sm:flex-row items-center justify-between">
        <div className="flex items-start md:items-center gap-3 md:gap-4">
          <img
            src="/sgc_logo.jpg"
            alt="Students Gymkhana Council"
            className="h-[80%] md:h-full"
          />
          <div className="leading-3 md:leading-4 lg:leading-5 flex flex-col md:gap-3">
            <p className="font-extrabold text-lg md:text-2xl lg:text-3xl">
              STUDENTS GYMKHANA <br />
              COUNCIL
            </p>
            <p className="font-extralight md:font-normal text-xs md:text-base mb-1">
              New SAC Building IIT Guwahati,
              <br />
              Guwahati, Assam - 781039
              <br />
              +91-361-258162
              <br />
              sgciitg@gmail.com
            </p>
            <div className="flex w-fit border border-white text-white">
              <a
                target="_blank"
                href={socialUrls.linkedin}
                className="border-[1px] p-1 md:p-2 text-xl lg:text-3xl cursor-pointer duration-150 hover:bg-[#0077B5]"
              >
                <FaLinkedinIn />
              </a>
              <a
                target="_blank"
                href={socialUrls.instagram}
                className="border-[1px] p-1 md:p-2 text-xl lg:text-3xl cursor-pointer duration-150 hover:bg-[#cd486b]"
              >
                <IoLogoInstagram />
              </a>
              <a
                target="_blank"
                href={socialUrls.youtube}
                className="border-[1px] p-1 md:p-2 text-xl lg:text-3xl cursor-pointer duration-150 hover:bg-[#FF0000]"
              >
                <BsYoutube />
              </a>
              <a
                target="_blank"
                href={socialUrls.twitter}
                className="border-[1px] p-1 md:p-2 text-xl lg:text-3xl cursor-pointer duration-150 hover:bg-[#1da1f2]"
              >
                <FaTwitter />
              </a>
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-center gap-1 md:gap-3 text-xs md:text-base tracking-tight leading-5 sm:leading-5">
          <div className="flex gap-2 sm:gap-3">
            <img
              className="h-[45px] md:h-[74px]"
              src="/swc_logo.jpg"
              alt="Students Web Committee"
            />
            <p>
              Maintained by Student's &nbsp;
              <br className="hidden sm:inline" />
              Web Committee &nbsp;
              <br className="hidden sm:inline" />
              &nbsp; IITG
            </p>
          </div>
          <p>&copy; Students Gymkhana Council, IIT Guwahati</p>
        </div>
      </div>
    </div>
  );
}

export default Footer;

{
  /* <div className="w-full h-full flex flex-col gap-10 sm:flex-row items-center justify-between b g-red-500">
        <div className="h-full flex items-start gap-3 md:gap-4 bg-blue-300">
          <img
            src="/sgc_logo.jpg"
            alt="Students Gymkhana Council"
            className="w-full"
          />
          <div className="leading-4 md:leading-6 flex flex-col gap-2">
            <p className="font-extrabold text-sm md:text-3xl">
              STUDENTS GYMKHANA <br />
              COUNCIL
            </p>
            <p className="font-extralight md:font-normal text-sm md:text-base">
              New SAC Building IIT Guwahati,
              <br />
              Guwahati, Assam - 781039
              <br />
              +91-361-258162
              <br />
              sgciitg@gmail.com
            </p>
            <div className="flex w-fit border border-white text-white">
              <a
                target="_blank"
                href={socialUrls.linkedin}
                className="border-[1px] p-1 md:p-2 text-xl md:text-3xl cursor-pointer duration-150 hover:bg-[#0077B5]"
              >
                <FaLinkedinIn />
              </a>
              <a
                target="_blank"
                href={socialUrls.instagram}
                className="border-[1px] p-1 md:p-2 text-xl md:text-3xl cursor-pointer duration-150 hover:bg-[#cd486b]"
              >
                <IoLogoInstagram />
              </a>
              <a
                target="_blank"
                href={socialUrls.youtube}
                className="border-[1px] p-1 md:p-2 text-xl md:text-3xl cursor-pointer duration-150 hover:bg-[#FF0000]"
              >
                <BsYoutube />
              </a>
              <a
                target="_blank"
                href={socialUrls.twitter}
                className="border-[1px] p-1 md:p-2 text-xl md:text-3xl cursor-pointer duration-150 hover:bg-[#1da1f2]"
              >
                <FaTwitter />
              </a>
            </div>
          </div>
        </div>
        <div className="flex w-fit border border-white text-white">
          <a
            target="_blank"
            href={socialUrls.linkedin}
            className="border-[1px] p-1 md:p-2 text-xl md:text-3xl cursor-pointer duration-150 hover:bg-[#0077B5]"
          >
            <FaLinkedinIn />
          </a>
          <a
            target="_blank"
            href={socialUrls.instagram}
            className="border-[1px] p-1 md:p-2 text-xl md:text-3xl cursor-pointer duration-150 hover:bg-[#cd486b]"
          >
            <IoLogoInstagram />
          </a>
          <a
            target="_blank"
            href={socialUrls.youtube}
            className="border-[1px] p-1 md:p-2 text-xl md:text-3xl cursor-pointer duration-150 hover:bg-[#FF0000]"
          >
            <BsYoutube />
          </a>
          <a
            target="_blank"
            href={socialUrls.twitter}
            className="border-[1px] p-1 md:p-2 text-xl md:text-3xl cursor-pointer duration-150 hover:bg-[#1da1f2]"
          >
            <FaTwitter />
          </a>
        </div>
        <div className="flex flex-col justify-center gap-1 md:gap-3 text-xs md:text-base tracking-tight leading-5 sm:leading-5">
          <div className="flex gap-2 sm:gap-3">
            <img
              className="h-[45px] md:h-[74px]"
              src="/swc_logo.jpg"
              alt="Students Web Committee"
            />
            <p>
              Maintained by Student's &nbsp;
              <br className="hidden sm:inline" />
              Web Committee &nbsp;
              <br className="hidden sm:inline" />
              &nbsp; IITG
            </p>
          </div>
          <p>&copy; Students Gymkhana Council, IIT Guwahati</p>
        </div>
      </div> */
}

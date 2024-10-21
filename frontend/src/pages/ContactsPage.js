import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import RoundedDiv from "../components/RoundedDiv";
import { FaPhone } from "react-icons/fa6";
import { MdMail } from "react-icons/md";
import { IoLogoLinkedin } from "react-icons/io5";

function ContactsPage() {
  return (
    <div>
      <Header />
      {/* Hero Section */}
      <div className="overflow-hidden opa font-poppins flex flex-col">
        {/* Top Section */}
        <div
          className="w-full h-[865px] bg-top bg-cover bg-no-repeat flex flex-col items-center justify-center gap-5 text-gray-200"
          style={{ backgroundImage: "url('/images/contact/main.png')" }}
        >
          <p className="text-4xl md:text-7xl font-semibold tracking-tight text-center">
            GET IN TOUCH
          </p>
          <p className="text-sm sm:text-base md:text-lg tracking-tight text-center">
            Incase you have any queries, don’t be hesitant in reaching out to
            us.
          </p>
        </div>
        {/* Chairman */}
        <RoundedDiv
          Element={() => {
            return (
              <div className="w-full flex flex-col-reverse gap-5 md:flex-row md:justify-between md:items-start px-10 md:px-20 pb-[55vw] xs:pb-[40vw] sm:pb-[30vw] md:pb-[15vw] lg:pb-[10vw] pt-[10vw]">
                {/* Text Section */}
                <div className="w-full md:w-[50%] text-center md:text-left flex flex-col items-center md:items-start justify-start space-y-1">
                  {/* Title */}
                  <h1 className="text-[5vw] leading-none font-semibold text-[#0C0D0D] font-[Fira Sans Extra Condensed]">
                    CHAIRMAN
                  </h1>
                  {/* Paragraph */}
                  <p className="text-[3vw] md:text-[2vw] leading-relaxed text-[#565656] font-[Familjen Grotesk]">
                    Professor Deepak Sharma <br /> Department of Mechanical
                    Engineering
                  </p>
                  <div className="pt-[2vw] flex gap-[5vw] text-black text-[10vw] md:text-[3vw]">
                    <FaPhone className="cursor-pointer hover:text-[#141414]" />
                    <MdMail className="cursor-pointer hover:text-[#141414]" />
                    <IoLogoLinkedin className="cursor-pointer hover:text-[#141414]" />
                  </div>
                </div>
                {/* Image Section */}
                <div className="w-full md:w-[50%] flex items-center justify-center">
                  <img
                    src="/images/contact/chairman.png"
                    alt="Sports activity"
                    className="w-[70%] object-cover"
                  />
                </div>
              </div>
            );
          }}
          bg="#F5F5F5"
          top="-200px"
        />
        {/* General Secretary */}
        <RoundedDiv
          Element={() => {
            return (
              <div className="w-full flex flex-col-reverse gap-5 md:flex-row md:justify-between md:items-start px-10 md:px-20 pt-[10vw]">
                {/* Text Section */}
                <div className="w-full md:w-[50%] text-center md:text-left flex flex-col items-center md:items-start justify-start space-y-1">
                  {/* Title */}
                  <h1 className="text-[5vw] leading-none font-semibold text-[#0C0D0D] font-[Fira Sans Extra Condensed]">
                    GENERAL SECRATERY
                  </h1>
                  {/* Paragraph */}
                  <p className="text-[3vw] md:text-[2vw] leading-relaxed text-[#565656] font-[Familjen Grotesk]">
                    Uttam Meena <br /> Brahmaputra Hostel
                  </p>
                  <div className="pt-[2vw] flex gap-[5vw] text-black text-[10vw] md:text-[3vw]">
                    <FaPhone className="cursor-pointer hover:text-[#141414]" />
                    <MdMail className="cursor-pointer hover:text-[#141414]" />
                    <IoLogoLinkedin className="cursor-pointer hover:text-[#141414]" />
                  </div>
                </div>
                {/* Image Section */}
                <div className="w-full md:w-[50%] flex items-center justify-center">
                  <img
                    src="/images/contact/gensec.png"
                    alt="Sports activity"
                    className="w-[70%] object-cover"
                  />
                </div>
              </div>
            );
          }}
          bg="#7BB9C4"
          top="-200px"
        />
      </div>
      <Footer />
    </div>
  );
}

export default ContactsPage;

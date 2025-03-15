import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { FaRegFilePdf } from "react-icons/fa6";
import useRoundedStyle from "../hooks/useRoundedStyle";

const sections = [
  {
    title: "Welfare Fund",
    description:
      "A bunch of words explaining some fund stuff. If you need money, maybe check this out. Details, forms, and all that jazz.",
    mediaType: "pdf",
    mediaSrc: "pdfs/swb-funds.pdf",
  },
  {
    title: "Career Podcast",
    description:
      "Videos where people talk about jobs and careers. You might learn something, or maybe you'll just listen while pretending to be productive.",
    mediaType: "iframe",
    mediaSrc: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  },
  {
    title: "Code of Conduct",
    description:
      "Rules and guidelines because apparently, people need reminders to behave like decent human beings. Read it or don't, but it's here.",
    mediaType: "pdf",
    mediaSrc: "pdfs/swb-funds.pdf",
  },
  {
    title: "Document Management",
    description:
      "A glorified file dump. Find your forms, policies, and other bureaucratic nonsense here.",
    mediaType: "pdf",
    mediaSrc: "pdfs/swb-funds.pdf",
  },
];

const Section = ({ title, description, mediaType, mediaSrc, isReversed }) => (
    <div
      className={`flex w-full flex-col md:flex-row ${
        isReversed ? "md:flex-row-reverse" : ""
      } my-5 md:my-10 items-center gap-6`}
    >
      {/* Text Section */}
      <div className="md:w-1/2 p-6">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
          {title.toUpperCase()}.
        </h2>
        <p className="text-base sm:text-lg">{description}</p>
      </div>
  
      {/* Media Section */}
      <div className="md:w-1/2 p-6 flex justify-center items-center relative h-[320px]">
        {/* Background Block */}
        <div
          className={`absolute w-[60%] h-[130%] top-1/2 -translate-y-1/2 bg-[#7BB9C4] ${
            isReversed ? "left-0" : "right-0"
          } sm:block hidden`}
        />
  
        {/* Media Content */}
        <div className="relative z-10 flex justify-center items-center">
          {mediaType === "pdf" ? (
            <a href={mediaSrc} target="_blank" rel="noreferrer" className="">
              <FaRegFilePdf size={200} className="text-gray-700" />
            </a>
          ) : mediaType === "iframe" ? (
            <iframe
              src={mediaSrc}
              className="w-auto max-w-full h-48 sm:h-64  md:h-64 border rounded-md bg-red-500"
              title={title}
              allowFullScreen
            ></iframe>
          ) : null}
        </div>
      </div>
    </div>
  );

const SWBSections = () => {
  return (
    <div>
      <Header />
      <div
        className="w-full min-h-[100vh] bg-top bg-cover bg-no-repeat flex flex-col items-center justify-center gap-5 text-gray-200 text-center px-4"
        style={{ backgroundImage: "url('/images/homepage/homepage.png')" }}
      >
        <p className="text-4xl md:text-6xl lg:text-7xl font-semibold tracking-tight">
          LOREM IPSUM
        </p>
        <p className="text-sm sm:text-base md:text-lg">
          Empowering athletes, or whatever. Just some generic motivational
          words.
        </p>
      </div>

      <div className="container mx-auto px-6 sm:pt-32 mb-20 flex flex-col items-center sm:gap-20">
        {sections.map((section, index) => (
          <Section key={index} {...section} isReversed={index % 2 !== 0} />
        ))}
      </div>
      <Footer />
    </div>
  );
};

export default SWBSections;

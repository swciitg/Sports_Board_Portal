import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { FaRegFilePdf } from "react-icons/fa6";

import Header from "../components/Header";
import Footer from "../components/Footer";

import groupImg from "../assets/group.jpeg";
import { useEventPageData } from "../hooks/useEventPageData";

const clubData = {
  name: "Welfare Board",
  topSection: {
    img: groupImg,
  },
};

function EachEventPage() {
  const { data, error } = useEventPageData();
  console.log("AllEventsPage data", data);
  const events = data?.events || []; 
  const imgdata = data?.homepage[0]?.eventimgurl || []; 
  const clubName = data?.homepage[0]?.boardname || [];
  return (
    <div>
      <Header />
      <div className="overflow-hidden font-poppins flex flex-col">
        <div
          className="w-full h-[865px] bg-top bg-cover bg-no-repeat flex flex-col items-center justify-center gap-5 text-gray-200"
          style={{ backgroundImage: `url(${imgdata})` }}
        >
          <p className="text-4xl md:text-7xl font-semibold tracking-tight text-center">
            {clubName}
          </p>
        </div>
        {events.map((event, index) => (
          <RoundedDiv
            key={index}
            top={index > 0 ? `-${100 + index * 200}px` : "-400px"}
            bg={index % 2 === 0 ? "#F5F5F5" : "#7BB9C4"}
          >
            <EventSection data={event} />
          </RoundedDiv>
        ))}
      </div>
      <Footer />
    </div>
  );
}

function RoundedDiv({ children, top = "-100px", bg = "#d9d0d0" }) {
  return (
    <div
      style={{
        borderRadius: "50% 50% 0% 0% / 100px 100px 0% 0%",
        marginTop: top,
        backgroundColor: bg,
      }}
      className="relative left-[50%] translate-x-[-50%] w-[170vw] sm:w-[150vw] md:w-[140vw] lg:w-[120vw] px-[35vw] sm:px-[25vw] md:px-[20vw] lg:px-[10vw] overflow-hidden pt-[35px] sm:pt-[50px] md:pt-[75px] lg:pt-[130px] pb-[50px] md:pb-[100px] flex flex-col items-center"
    >
      {children}
    </div>
  );
}

const EventSection = ({ data }) => {
  console.log("EventSection data", data);
  const images = data?.galleryImages || [];

  return (
    <div className="w-full flex flex-col md:flex-row md:justify-between md:items-start px-10 md:px-20 pb-[65vw] xs:pb-[80vw] sm:pb-[57vw] md:pb-[40vw] lg:pb-[30vw] xl:pb-[22vw]">
      <div className="w-full md:w-[50%] text-center md:text-left flex flex-col items-center md:items-start justify-start space-y-1">
        <h1 className="text-[6vw] leading-none font-semibold text-[#0C0D0D] font-[Fira Sans Extra Condensed]">
          {data?.eventName}
        </h1>
        <p className="text-[2.25vw] md:text-[1.25vw] leading-relaxed text-[#565656] font-[Familjen Grotesk] list-disc">
          {data?.eventActivityDesc}
        </p> 
        {data?.eventPdf && (
          <a
            href={data.eventPdf}
            target="_blank"
            rel="noreferrer"
            className="mt-2"
          >
            <FaRegFilePdf size={40} className="text-gray-700 sm:size-50" />
          </a>
        )}
      </div>
      <div className="w-full md:w-[50%] flex items-center justify-center mt-6 md:mt-0">
        {images && images.length > 0 && (
          <Carousel
            className="w-[70%]"
            autoPlay={true}
            interval={2000}
            infiniteLoop={true}
            showThumbs={false}
            showIndicators={false}
            emulateTouch={true}
            stopOnHover={true}
            transitionTime={1000}
          >
            {images.map((image, index) => (
              <img key={index} src={image} alt={`${data?.eventName} ${index + 1}`} className="object-cover" />
            ))}
          </Carousel>
        )}
      </div>
    </div>
  );
};

export default EachEventPage;
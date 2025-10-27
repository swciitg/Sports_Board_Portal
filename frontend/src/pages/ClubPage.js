import React, { useEffect, useState } from "react";
import ScrollAnimation from "react-animate-on-scroll";
import useScrollDirection from "../hooks/useScrollDirection";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { useParams } from "react-router-dom";
import axios from "axios";
import { LuAlertCircle } from 'react-icons/lu';
import { Loader, RoundedDiv, Errors } from '../components';

function EachClubPage() {
  const scrollDirection = useScrollDirection();
  const { name } = useParams();
  const [clubData, setClubData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchClubData = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/club/${name}`);
        setClubData(response.data);
      } catch (err) {
        setError("Failed to load club data.");
      } finally {
        setLoading(false);
      }
    };
    fetchClubData();
  }, [name]);

  if (loading) {
      return <Loader isOpen={true} message={`Loading ${name} Club...`} />
  }
   if (error) {
      return (
          <>
          <div className="w-full flex flex-col justify-center items-center px-2 py-10 sm:px-5 md:px-10 lg:px-15 xl:px-22 space-y-6">
            <LuAlertCircle className="w-16 h-16 text-red-500" />
            <Errors 
            status_code={error.status || 500}
            title='Error Loading Clubs'
            onClick={() => window.location.reload()}
            message={error.message || 'Failed to load clubs data. Please try again later.'}
            buttonText="Retry"
            />
          </div>
          </>
      );
      }

  return (
    <div>
      <div className="overflow-hidden font-poppins flex flex-col">
        <div
          className="w-full h-[865px] bg-top bg-cover bg-no-repeat flex flex-col items-center justify-center gap-5 text-gray-200"
          style={{ backgroundImage: `url(${clubData.topSection.img})` }}
        >
          <p className="text-4xl md:text-7xl font-semibold tracking-tight text-center">
            {clubData.name} CLUB
          </p>
          <p className="text-sm sm:text-base md:text-lg tracking-tight text-center">
            {clubData.topSection.text}
          </p>
        </div>
        <div className="w-full flex items-center justify-center px-2 pt-[6vw] pb-[37vw] sm:pb-[20vw] md:[5vw] bg-[#F5F5F5] text-center">
          <div className="w-full flex flex-col-reverse md:flex-row gap-2 md:justify-between md:items-start px-10 md:px-20">
            <ScrollAnimation
              className="w-full md:w-[50%] flex items-center justify-center"
              animateIn={scrollDirection === "up" ? "slideInDown" : "slideInUp"}
              animateOut={
                scrollDirection === "up" ? "slideOutDown" : "slideOutUp"
              }
            >
              <img
                src={clubData?.aboutusimg}
                alt="Sports activity"
                className="w-[70%] object-cover"
              />
            </ScrollAnimation>
            <div className="w-full md:w-[50%] text-center md:text-left flex flex-col items-center md:items-start justify-start space-y-1">
              <h1 className="text-[6vw] leading-none font-semibold text-[#0C0D0D] font-[Fira Sans Extra Condensed]">
                ABOUT US
              </h1>
              <p className="text-[3vw] md:text-[2vw] leading-relaxed text-[#565656] font-[Familjen Grotesk] list-disc">
                {clubData?.aboutDesc}
              </p>
            </div>
          </div>
        </div>
        <RoundedDiv Element={() => <RulesAndGuidelinesSection clubData={clubData} />} bg="#7BB9C4" />
        <RoundedDiv
          Element={() => <PastEventsAndAcheivementsSection clubData={clubData} />}
          bg="#F5F5F5"
          top="-200px"
        />
        <RoundedDiv Element={() => <GallerySection clubData={clubData} />} bg="#7BB9C4" top="-300px" />
        <RoundedDiv Element={() => <TeamLeadersSection clubData={clubData} />} bg="#F5F5F5" top="-400px" />
      </div>
    </div>
  );
}

const RulesAndGuidelinesSection = ({ clubData }) => {
  const scrollDirection = useScrollDirection();
  return (
    <div className="w-full flex flex-col md:flex-row md:justify-between md:items-start px-10 md:px-20 pb-[50vw] sm:pb-[35vw] md:pb-[15vw] lg:pb-[10vw]">
      <div className="w-full md:w-[50%] text-center md:text-left flex flex-col items-center md:items-start justify-start space-y-1">
        <h1 className="text-[6vw] leading-none font-semibold text-[#0C0D0D] font-[Fira Sans Extra Condensed]">
          RULES AND GUIDELINES
        </h1>
        <p className="text-[3vw] md:text-[2vw] leading-relaxed text-[#565656] font-[Familjen Grotesk] list-disc">
          {clubData?.rules}
        </p>
      </div>
      <ScrollAnimation
        className="w-full md:w-[50%] flex items-center justify-center"
        animateIn={scrollDirection === "up" ? "slideInDown" : "slideInUp"}
        animateOut={scrollDirection === "up" ? "slideOutDown" : "slideOutUp"}
      >
        <img
          src={clubData?.rulesimg}
          alt="Sports activity"
          className="w-[70%] object-cover"
        />
      </ScrollAnimation>
    </div>
  );
};

const PastEventsAndAcheivementsSection = ({ clubData }) => {
  const scrollDirection = useScrollDirection();
  return (
    <div className="space-y-8 pb-[83vw] xs:pb-[60vw] sm:pb-[40vw] md:pb-[15vw] lg:pb-[13vw]">
      <div className="w-full flex flex-col md:flex-row md:justify-between md:items-start px-10 md:px-20 md:py-20">
        <div className="w-full md:w-[50%] text-center md:text-left flex flex-col items-center md:items-start justify-start space-y-1">
          <h1 className="text-[6vw] leading-none font-semibold text-[#0C0D0D] font-[Fira Sans Extra Condensed]">
            PAST EVENTS
          </h1>
          <p className="text-[3vw] md:text-[2vw] leading-relaxed text-[#565656] font-[Familjen Grotesk] list-disc">
            {clubData.rulesSection.text}
          </p>
        </div>
        <ScrollAnimation
          className="w-full md:w-[50%] flex items-center justify-center"
          animateIn={scrollDirection === "up" ? "slideInDown" : "slideInUp"}
          animateOut={scrollDirection === "up" ? "slideOutDown" : "slideOutUp"}
        >
          <img
            src={clubData?.pastEventsImg}
            alt="Sports activity"
            className="w-[70%] object-cover"
          />
        </ScrollAnimation>
      </div>
      <div className="w-full flex flex-col-reverse md:flex-row md:justify-between md:items-start px-10 md:px-20 md:py-20">
        <ScrollAnimation
          className="w-full md:w-[50%] flex items-center justify-center"
          animateIn={scrollDirection === "up" ? "slideInDown" : "slideInUp"}
          animateOut={scrollDirection === "up" ? "slideOutDown" : "slideOutUp"}
        >
          <img
            src={clubData?.achievementsImg}
            alt="Sports activity"
            className="w-[70%] object-cover"
          />
        </ScrollAnimation>
        <div className="w-full md:w-[50%] text-center md:text-left flex flex-col items-center md:items-start justify-start space-y-1">
          <h1 className="text-[6vw] leading-none font-semibold text-[#0C0D0D] font-[Fira Sans Extra Condensed]">
            ACHEIVEMENTS
          </h1>
          <p className="text-[3vw] md:text-[2vw] leading-relaxed text-[#565656] font-[Familjen Grotesk] list-disc">
            {clubData.aboutUsSection.text}
          </p>
        </div>
      </div>
    </div>
  );
};

const GallerySection = ({ clubData }) => {
  return (
    <div className="w-full flex flex-col md:flex-row md:justify-between md:items-start px-10 md:px-20 pb-[115vw] xs:pb-[80vw] sm:pb-[57vw] md:pb-[40vw] lg:pb-[30vw] xl:pb-[22vw]">
      <div className="w-full md:w-[50%] text-center md:text-left flex flex-col items-center md:items-start justify-start space-y-1">
        <h1 className="text-[6vw] leading-none font-semibold text-[#0C0D0D] font-[Fira Sans Extra Condensed]">
          GALLERY
        </h1>
        <p className="text-[3vw] md:text-[2vw] leading-relaxed text-[#565656] font-[Familjen Grotesk] list-disc">
          {clubData.rulesSection.text}
        </p>
      </div>
      <div className="w-full md:w-[50%] flex items-center justify-center">
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
          {clubData?.leaderImages.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Sports activity ${index + 1}`}
              className="w-[70%] h-[500px] object-cover"
            />
          ))}
        </Carousel>
      </div>
    </div>
  );
};

const TeamLeadersSection = ({ clubData }) => {
  return (
    <div className="w-full flex flex-col md:flex-row md:justify-between md:items-start px-10 md:px-20">
      <div className="w-full md:w-[50%] text-center md:text-left flex flex-col items-center md:items-start justify-start space-y-1">
        <h1 className="text-[6vw] leading-none font-semibold text-[#0C0D0D] font-[Fira Sans Extra Condensed]">
          TEAM LEADERS
        </h1>
        <p className="text-[3vw] md:text-[2vw] leading-relaxed text-[#565656] font-[Familjen Grotesk] list-disc">
          {clubData.rulesSection.text}
        </p>
      </div>
      <div className="w-full md:w-[50%] flex items-center justify-center">
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
          {clubData?.leaderImages.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Sports activity ${index + 1}`}
              className="w-[70%] h-[500px] object-cover"
            />
          ))}
        </Carousel>
      </div>
    </div>
  );
};

export default EachClubPage;
import React, { useEffect, useState } from "react";
import ScrollAnimation from "react-animate-on-scroll";
import useScrollDirection from "../hooks/useScrollDirection";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import Header from "../components/Header";
import Footer from "../components/Footer";
import RoundedDiv from "../components/RoundedDiv";
import { useParams } from "react-router-dom";
import axios from "axios";

function EachClubPage() {
  const scrollDirection = useScrollDirection();
  const { name } = useParams(); // Get the dynamic club name from the URL
  const [clubData, setClubData] = useState(null); // State to store club data
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchClubData = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/club/${name}`); // Fetch club data by name
        console.log(response.data) // Fetch club data by name
        setClubData(response.data); // Store fetched data in state
      } catch (err) {
        setError("Failed to load club data.");
      } finally {
        setLoading(false);
      }
    };

    fetchClubData(); 
  }, [name]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <Header />
      {/* Hero Section */}
      <div className="overflow-hidden font-poppins flex flex-col">
        {/* Top Section */}
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
        {/* Aboutus Section */}
        <div className="w-full flex items-center justify-center px-2 pt-[6vw] pb-[37vw] sm:pb-[20vw] md:[5vw] bg-[#F5F5F5] text-center">
          <div className="w-full flex flex-col-reverse md:flex-row gap-2 md:justify-between md:items-start px-10 md:px-20">
            {/* Image Section */}
            <ScrollAnimation
              className="w-full md:w-[50%] flex items-center justify-center"
              animateIn={scrollDirection === "up" ? "slideInDown" : "slideInUp"}
              animateOut={
                scrollDirection === "up" ? "slideOutDown" : "slideOutUp"
              }
            >
              <img
                src={clubData.aboutUsSection.img}
                alt="Sports activity"
                className="w-[70%] object-cover"
              />
            </ScrollAnimation>
            {/* Text Section */}
            <div className="w-full md:w-[50%] text-center md:text-left flex flex-col items-center md:items-start justify-start space-y-1">
              {/* Title */}
              <h1 className="text-[6vw] leading-none font-semibold text-[#0C0D0D] font-[Fira Sans Extra Condensed]">
                ABOUT US
              </h1>

              {/* Paragraph */}
              <p className="text-[3vw] md:text-[2vw] leading-relaxed text-[#565656] font-[Familjen Grotesk] list-disc">
                {clubData.aboutUsSection.text}
              </p>
            </div>
          </div>
        </div>
        {/* Rules and guidelines section */}
        <RoundedDiv Element={()=> <RulesAndGuidelinesSection clubData={clubData}/>} bg="#7BB9C4" />
        {/* Past Events and acheivements sections */}
        <RoundedDiv
          Element={()=> <PastEventsAndAcheivementsSection clubData={clubData}/>}
          bg="#F5F5F5"
          top="-200px"
        />
        {/* Gallery Section */}
        <RoundedDiv Element={()=> <GallerySection clubData={clubData}/>} bg="#7BB9C4" top="-300px" />
        {/* Team Leaders Section */}
        <RoundedDiv Element={()=> <TeamLeadersSection clubData={clubData}/>} bg="#F5F5F5" top="-400px" />
      </div>
      <Footer />
    </div>
  );
}

// Each section is defined seprately to animate
const RulesAndGuidelinesSection = ({clubData}) => {
  const scrollDirection = useScrollDirection();
  return (
    <div className="w-full flex flex-col md:flex-row md:justify-between md:items-start px-10 md:px-20 pb-[50vw] sm:pb-[35vw] md:pb-[15vw] lg:pb-[10vw]">
      {/* Text Section */}
      <div className="w-full md:w-[50%] text-center md:text-left flex flex-col items-center md:items-start justify-start space-y-1">
        {/* Title */}
        <h1 className="text-[6vw] leading-none font-semibold text-[#0C0D0D] font-[Fira Sans Extra Condensed]">
          RULES AND GUIDELINES
        </h1>

        {/* Paragraph */}
        <p className="text-[3vw] md:text-[2vw] leading-relaxed text-[#565656] font-[Familjen Grotesk] list-disc">
          {clubData.rulesSection.text}
        </p>
      </div>
      {/* Image Section */}
      <ScrollAnimation
        className="w-full md:w-[50%] flex items-center justify-center"
        animateIn={scrollDirection === "up" ? "slideInDown" : "slideInUp"}
        animateOut={scrollDirection === "up" ? "slideOutDown" : "slideOutUp"}
      >
        <img
          src={clubData.aboutUsSection.img}
          alt="Sports activity"
          className="w-[70%] object-cover"
        />
      </ScrollAnimation>
    </div>
  );
};
const PastEventsAndAcheivementsSection = ({clubData}) => {
  const scrollDirection = useScrollDirection();
  return (
    <div className="space-y-8 pb-[83vw] xs:pb-[60vw] sm:pb-[40vw] md:pb-[15vw] lg:pb-[13vw]">
      {/* Past Events */}
      <div className="w-full flex flex-col md:flex-row md:justify-between md:items-start px-10 md:px-20 md:py-20">
        {/* Text Section */}
        <div className="w-full md:w-[50%] text-center md:text-left flex flex-col items-center md:items-start justify-start space-y-1">
          {/* Title */}
          <h1 className="text-[6vw] leading-none font-semibold text-[#0C0D0D] font-[Fira Sans Extra Condensed]">
            PAST EVENTS
          </h1>

          {/* Paragraph */}
          <p className="text-[3vw] md:text-[2vw] leading-relaxed text-[#565656] font-[Familjen Grotesk] list-disc">
            {clubData.rulesSection.text}
          </p>
        </div>
        {/* Image Section */}
        <ScrollAnimation
          className="w-full md:w-[50%] flex items-center justify-center"
          animateIn={scrollDirection === "up" ? "slideInDown" : "slideInUp"}
          animateOut={scrollDirection === "up" ? "slideOutDown" : "slideOutUp"}
        >
          <img
            src={clubData.aboutUsSection.img}
            alt="Sports activity"
            className="w-[70%] object-cover"
          />
        </ScrollAnimation>
      </div>
      {/* Acheivements */}
      <div className="w-full flex flex-col-reverse md:flex-row md:justify-between md:items-start px-10 md:px-20 md:py-20">
        {/* Image Section */}
        <ScrollAnimation
          className="w-full md:w-[50%] flex items-center justify-center"
          animateIn={scrollDirection === "up" ? "slideInDown" : "slideInUp"}
          animateOut={scrollDirection === "up" ? "slideOutDown" : "slideOutUp"}
        >
          <img
            src={clubData.aboutUsSection.img}
            alt="Sports activity"
            className="w-[70%] object-cover"
          />
        </ScrollAnimation>
        {/* Text Section */}
        <div className="w-full md:w-[50%] text-center md:text-left flex flex-col items-center md:items-start justify-start space-y-1">
          {/* Title */}
          <h1 className="text-[6vw] leading-none font-semibold text-[#0C0D0D] font-[Fira Sans Extra Condensed]">
            ACHEIVEMENTS
          </h1>

          {/* Paragraph */}
          <p className="text-[3vw] md:text-[2vw] leading-relaxed text-[#565656] font-[Familjen Grotesk] list-disc">
            {clubData.aboutUsSection.text}
          </p>
        </div>
      </div>
    </div>
  );
};
const GallerySection = ({clubData}) => {
  return (
    <div className="w-full flex flex-col md:flex-row md:justify-between md:items-start px-10 md:px-20 pb-[115vw] xs:pb-[80vw] sm:pb-[57vw] md:pb-[40vw] lg:pb-[30vw] xl:pb-[22vw]">
      {/* Text Section */}
      <div className="w-full md:w-[50%] text-center md:text-left flex flex-col items-center md:items-start justify-start space-y-1">
        {/* Title */}
        <h1 className="text-[6vw] leading-none font-semibold text-[#0C0D0D] font-[Fira Sans Extra Condensed]">
          GALLERY
        </h1>

        {/* Paragraph */}
        <p className="text-[3vw] md:text-[2vw] leading-relaxed text-[#565656] font-[Familjen Grotesk] list-disc">
          {clubData.rulesSection.text}
        </p>
      </div>
      {/* Image Section */}
      {/* Carousal */}
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
          <img src={clubData.aboutUsSection.img} alt="Sports activity" />
          <img
            src={clubData.aboutUsSection.img}
            alt="Sports activity"
            className="w-[70%] object-cover"
          />
          <img
            src={clubData.aboutUsSection.img}
            alt="Sports activity"
            className="w-[70%] object-cover"
          />
        </Carousel>
      </div>
    </div>
  );
};
const TeamLeadersSection = ({clubData}) => {
  return (
    <div className="w-full flex flex-col md:flex-row md:justify-between md:items-start px-10 md:px-20">
      {/* Text Section */}
      <div className="w-full md:w-[50%] text-center md:text-left flex flex-col items-center md:items-start justify-start space-y-1">
        {/* Title */}
        <h1 className="text-[6vw] leading-none font-semibold text-[#0C0D0D] font-[Fira Sans Extra Condensed]">
          TEAM LEADERS
        </h1>

        {/* Paragraph */}
        <p className="text-[3vw] md:text-[2vw] leading-relaxed text-[#565656] font-[Familjen Grotesk] list-disc">
          {clubData.rulesSection.text}
        </p>
      </div>
      {/* Image Section */}
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
          <img src={clubData.aboutUsSection.img} alt="Sports activity" />
          <img
            src={clubData.aboutUsSection.img}
            alt="Sports activity"
            className="w-[70%] object-cover"
          />
          <img
            src={clubData.aboutUsSection.img}
            alt="Sports activity"
            className="w-[70%] object-cover"
          />
        </Carousel>
      </div>
    </div>
  );
};

export default EachClubPage;
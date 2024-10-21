import React from "react";
import ZigZagLine from "./ZigZagLine";
import ClubCard from "./ClubCard";
import ScrollAnimation from "react-animate-on-scroll";
import RoundedDiv from "./RoundedDiv";

function AllClubsHeroSection() {
  const clubsData = [
    {
      name: "BASKETBALL",
      img: "/images/clubs/wide.png",
    },
    {
      name: "AQUATICS",
      img: "/images/clubs/wide.png",
    },
    {
      name: "HOCKEY",
      img: "/images/clubs/wide.png",
    },
    {
      name: "ATHLETICS",
      img: "/images/clubs/wide.png",
    },
    {
      name: "VOLLEYBALL",
      img: "/images/clubs/wide.png",
    },
    {
      name: "CRICKET",
      img: "/images/clubs/wide.png",
    },
    {
      name: "LAWN TENNIS",
      img: "/images/clubs/wide.png",
    },
    {
      name: "TABLE TENNIS",
      img: "/images/clubs/wide.png",
    },
    {
      name: "FOOTBALL",
      img: "/images/clubs/wide.png",
    },
    {
      name: "SQUASH",
      img: "/images/clubs/wide.png",
    },
    {
      name: "BADMINTON",
      img: "/images/clubs/wide.png",
    },
    {
      name: "WEIGHTLIFTING",
      img: "/images/clubs/wide.png",
    },
  ];

  return (
    <div className="overflow-x-hidden font-poppins flex flex-col text-gray-200 bg-[#F5F5F5]">
      <div
        className="w-full h-[865px] bg-top bg-cover bg-no-repeat flex flex-col items-center justify-center gap-5 text-gray-200 z-1"
        style={{ backgroundImage: "url('/images/allclubspage/first.png')" }}
      >
        <p className="text-4xl md:text-7xl font-semibold tracking-tight text-center">
          LOREM IPSUM
        </p>
        <p className="text-sm sm:text-base md:text-lg tracking-tight text-center">
          Empowering atheles something something content.
        </p>
      </div>
      <RoundedDiv
        Element={() => (
          <div className="flex flex-col relative items-center">
            {clubsData.map((clubData, index) => {
              return (
                <ScrollAnimation
                  key={index}
                  animateIn="fadeInUp"
                  animateOut="fadeOutUp"
                  className="z-[1000]"
                >
                  <ClubCard index={index} clubData={clubData} />
                </ScrollAnimation>
              );
            })}
            <ZigZagLine />
          </div>
        )}
        top="-100px"
        bg="#F5F5F5"
      />
    </div>
  );
}

export default AllClubsHeroSection;

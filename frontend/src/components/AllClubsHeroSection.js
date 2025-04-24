import React, { useEffect, useState } from "react";
import axios from "axios";
import ZigZagLine from "./ZigZagLine";
import ClubCard from "./ClubCard";
import ScrollAnimation from "react-animate-on-scroll";
import RoundedDiv from "./RoundedDiv";
import clubImg from "../assets/images/clubs/wide.png";
function AllClubsHeroSection() {
  const BACKEND_BASE_URL=process.env.BACKEND_BASE_URL;
  const [clubsData, setClubsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [heroimg , setheroimg] = useState(null)
  useEffect(() => {
    console.log(process.env.REACT_APP_API_BASE_URL)
    axios
      .get(`${process.env.REACT_APP_API_BASE_URL}/allclubs`) // Replace with your actual API route
      .then((response) => {
        setClubsData(response.data.club);
        setheroimg(response.data.homepage[0].clubheroimg) // Ensure API response structure matches expected format
        setLoading(false);
        console.log(response.data.club);
      })
      .catch((error) => {
        console.error("Error fetching clubs data:", error);
        setError("Failed to load clubs.");
        setLoading(false);
      });
  }, []);

  return (
    <div className="overflow-x-hidden font-poppins flex flex-col text-gray-200 bg-[#F5F5F5]">
      <div
        className="w-full h-[865px] bg-top bg-cover bg-no-repeat flex flex-col items-center justify-center gap-5 text-gray-200 z-1"
        style={{ backgroundImage:`url(${heroimg})`}}
      >
        <p className="text-4xl md:text-7xl font-semibold tracking-tight text-center">
          LOREM IPSUM
        </p>
        <p className="text-sm sm:text-base md:text-lg tracking-tight text-center">
          Empowering athletes something something content.
        </p>
      </div>

      {loading ? (
        <p className="text-center py-10 text-xl">Loading clubs...</p>
      ) : error ? (
        <p className="text-center py-10 text-red-500">{error}</p>
      ) : (
        <RoundedDiv
          Element={() => (
            <div className="flex flex-col relative items-center">
              {clubsData.map((clubData, index) => (
                <ScrollAnimation
                  key={index}
                  animateIn="fadeInUp"
                  animateOut="fadeOutUp"
                  className="z-[1000]"
                >
                  <ClubCard index={index} clubData={clubData} />
                </ScrollAnimation>
              ))}
              <ZigZagLine />
            </div>
          )}
          top="-100px"
          bg="#F5F5F5"
        />
      )}
    </div>
  );
}

export default AllClubsHeroSection;

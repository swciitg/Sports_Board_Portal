import React from "react";
import { useNavigate } from "react-router-dom";

function ClubCard({ index, clubData }) {
  const navigate = useNavigate();
  const handleNavigate = () => {
    const urlSafeName = clubData.name.replace(/\s+/g, "-").toLowerCase();
    navigate(`/club/${urlSafeName}`); 
  };

  return (
    <div
      className={`relative my-[2vw] md:-my-[3vw] w-fit cursor-pointer ${
        index % 2 === 0
          ? "right-[15vw] md:right-[25vw]"
          : "left-[15vw] md:left-[25vw]"
      }`}
      onClick={handleNavigate}
    >
      <img
        src={clubData.img}
        alt="Club Image"
        className="h-[40vw] md:h-[20vw]"
      />
      <p className="absolute top-1 left-2 font-semibold text-[2vw]">
        {clubData.name}
      </p>
      <p className="absolute bottom-0 md:-bottom-2 right-2 font-semibold text-[4vw]">
        {index < 9 ? `0${index + 1}` : index + 1}
      </p>
    </div>
  );
}

export default ClubCard;
 
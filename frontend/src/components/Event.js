import React, { useState } from "react";

const Event = ({ number, title, imageUrl }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div
      className="flex-row justify-between border-b-[#F5F5F5] border-b-2 px-4 lg:w-[1080px] lg:h-[250px] h-[200px] mx-auto relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ overflow: "visible" }}
    >
      <div className="flex flex-col justify-center">
        <p className="font-bold text-[40px] lg:text-[60px] text-[#0C0D0D] leading-[48px] lg:leading-[48px] font-['Fira_Sans_Extra_Condensed']">
          {number}
        </p>
      </div>
      <div className="flex flex-col justify-center cursor-pointer">
        <p className="font-semibold text-[56px] lg:text-[96px] text-[#0C0D0D] font-['Fira_Sans_Extra_Condensed']">
          {title}
        </p>
      </div>

      {isHovered && (
        <div
          className="absolute hidden lg:block"
          style={{
            width: "390px",
            height: "335px",
            top: "0px",
            right: "100px",
            zIndex: 10,
          }}
        >
          <img
            src={imageUrl}
            alt={title}
            style={{
              width: "100%", // Make the image fill the container
              height: "100%", // Adjust the image height to fit the container
              objectFit: "cover", // Ensures the image maintains its aspect ratio
            }}
          />

          {/* Title inside the image */}
          <p
            className="absolute font-semibold text-[2vw]"
            style={{
              top: "10px", // Adjust to position the title at the top of the image
              left: "10px", // Adjust spacing from the left edge
              color: "white", // Ensure text is visible over the image
            }}
          >
            {title}
          </p>

          {/* Number inside the image */}
          <p
            className="absolute font-semibold text-[4vw]"
            style={{
              bottom: "10px", // Position at the bottom of the image
              right: "10px", // Adjust spacing from the right edge
              color: "white", // Ensure text is visible over the image
            }}
          >
            {number}
          </p>
        </div>
      )}
    </div>
  );
};

export default Event;

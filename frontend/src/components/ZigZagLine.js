import React, { useEffect, useState } from "react";

function ZigZagLine() {
  // No. of lines
  const lines = Array.from({ length: 25 });
  const [height, setHeight] = useState(0);

  // To change the height of ZigZag based on scrollY
  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight / 2 + window.scrollY > 900)
        setHeight(window.innerHeight / 2 + window.scrollY - 900);
      else setHeight(0);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      className="absolute w-[113%] md:w-[225%] flex flex-col items-center gap-[25vw] -z-9 overflow-hidden"
      style={{ height: `${height}px` }}
    >
      {lines.map((_, index) => {
        return (
          <div
            key={index}
            className=" border-dashed border-t border-black w-full"
            style={index % 2 === 0 ? { rotate: "30deg" } : { rotate: "-30deg" }}
          ></div>
        );
      })}
    </div>
  );
}

export default ZigZagLine;

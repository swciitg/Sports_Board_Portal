import { useState, useEffect } from "react";

// Custom hook to check if the device is mobile
const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const updateMobileStatus = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", updateMobileStatus);

    // Cleanup event listener on unmount
    return () => {
      window.removeEventListener("resize", updateMobileStatus);
    };
  }, []);

  return isMobile;
};

// Combined hook to return rounded style based on mobile status
const useRoundedStyle = () => {
  const isMobile = useIsMobile();

  const roundedStyle = isMobile
    ? {
        borderRadius: "50% 50% 0% 0% / 100px 100px 0% 0%",
        clipPath: "inset(0% 10% 0% 10%)",
        padding: "0 20%",
        width: "130%",
        position: "relative",
      }
    : {
        borderRadius: "50% 50% 0% 0% / 100px 100px 0% 0%",
        clipPath: "inset(0% 10% 0% 10%)",
        padding: "0 25%",
        width: "145%",
        position: "relative",
      };

  return roundedStyle;
};

export default useRoundedStyle;

import React from "react";

// Rounded div component with dynamic content render support
function RoundedDiv({
  Element = () => <p>I'm a rounded element</p>,
  top = "-100px",
  bg = "#d9d0d0",
}) {
  return (
    <div
      style={{
        borderRadius: "50% 50% 0% 0% / 100px 100px 0% 0%",
        marginTop: top,
        backgroundColor: bg,
      }}
      className="relative left-[50%] translate-x-[-50%] w-[170vw] sm:w-[150vw] md:w-[140vw] lg:w-[120vw] px-[35vw] sm:px-[25vw] md:px-[20vw] lg:px-[10vw] overflow-hidden pt-[35px] sm:pt-[50px] md:pt-[75px] lg:pt-[130px] pb-[50px] md:pb-[100px] flex flex-col items-center"
    >
      <Element />
    </div>
  );
}

export default RoundedDiv;

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#0C0D0D",
        muted: "#565656",
        subtle: "#8A8A8A",
        line: "#E8E8E8",
        surface: "#F5F5F5",
        slate: "#1F2937",
        accent: {
          DEFAULT: "#7BB9C4",
          deep: "#2E6C78",
          soft: "#EAF4F6",
          pale: "#B9DDE4",
        },
        danger: "#C0492F",
      },
      fontFamily: {
        display: ["'Fira Sans Extra Condensed'", "sans-serif"],
        body: ["'Familjen Grotesk'", "sans-serif"],
        poppins: ["Poppins", "sans-serif"],
      },
      screens: {
        xs: "480px",
      },
      maxWidth: {
        container: "1240px",
      },
      keyframes: {
        shimmer: {
          "0%": { backgroundPosition: "-420px 0" },
          "100%": { backgroundPosition: "420px 0" },
        },
      },
      animation: {
        shimmer: "shimmer 1.3s linear infinite",
      },
    },
  },
  plugins: [],
};

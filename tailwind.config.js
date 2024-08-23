/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      keyframes: {
        poof: {
          "0%": { opacity: "1", transform: "scale(1)" },
          "50%": { opacity: "0", transform: "scale(1.5)" },
          "100%": { opacity: "0", transform: "scale(0)" },
        },
      },
      animation: {
        poof: "poof 0.5s forwards",
      },
    },
  },
  plugins: [],
};

/** @type {import('tailwindcss').Config} */
import withMT from "@material-tailwind/react/utils/withMT";

export default withMT({
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      animation: {
        fontFamily: {
          slab: ["Roboto Slab", "serif"], // For headings
          sans: ["Roboto", "sans-serif"], // For body text
        },
        poof: "poof 0.5s forwards",
      },
    },
  },
  plugins: [],
});

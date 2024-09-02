import svgToDataUri from "mini-svg-data-uri";
import flattenColorPalette from "tailwindcss/lib/util/flattenColorPalette";
import withMT from "@material-tailwind/react/utils/withMT";

/** @type {import('tailwindcss').Config} */
export default withMT({
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        slab: ["Roboto Slab", "serif"], // For headings
        sans: ["Roboto", "sans-serif"], // For body text
      },
      animation: {
        poof: "poof 0.5s forwards",
      },
    },
  },
  plugins: [
    addVariablesForColors,
    function ({ matchUtilities, theme }) {
      matchUtilities(
        {
          "bg-dot-thick": (value) => ({
            backgroundImage: `url("${svgToDataUri(
              `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="16" height="16" fill="none"><circle fill="${value}" id="pattern-circle" cx="10" cy="10" r="2.5"></circle></svg>`
            )}")`,
          }),
        },
        { values: flattenColorPalette(theme("backgroundColor")), type: "color" }
      );
    },
  ],
});

// This plugin adds each Tailwind color as a global CSS variable, e.g., var(--gray-200).
function addVariablesForColors({ addBase, theme }) {
  let allColors = flattenColorPalette(theme("colors"));
  let newVars = Object.fromEntries(
    Object.entries(allColors).map(([key, val]) => [`--${key}`, val])
  );

  addBase({
    ":root": newVars,
  });
}

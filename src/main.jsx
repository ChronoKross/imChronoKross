// import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { VortexBG } from "./components/vortexBG.jsx";

createRoot(document.getElementById("root")).render(
  // <StrictMode>
  <div className="text-white min-h-screen bg-black">
    <VortexBG
      backgroundColor="black"
      rangeY={800}
      particleCount={500}
      baseHue={120}
      className="flex items-center flex-col justify-center px-2 md:px-10  py-4 w-full h-full"
    >
      <App />
    </VortexBG>
  </div>
  // </StrictMode>
);

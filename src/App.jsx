// import FeaturesSectionDemo from "./components/FeaturesSectionDemo";
import NavbarSimple from "./components/NavbarSimple";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import { RegisterForm } from "./components/register/RegisterForm";
// import { TextGenerateEffect } from "./components/wrapper/aceternity/textGenerate";
// import { Typography } from "@material-tailwind/react";
import { HeroHighlight, Highlight } from "./components/HeroHighlights";
// import { FeatureSection } from "./components/FeatureSection";

import { VideoPlayer } from "./components/VideoPlayer";
import { RegisterForm } from "./components/register/RegisterForm";

// const textEffect =
//   "Eventually this will be my digital home :).... until then, idk what it is lol. I am mainly using Material Tailwind, and Aceternty for my ui/ux styling";

function App() {
  const url = "https://www.youtube.com/watch?v=2QTDcffpunY";
  return (
    <Router>
      <div>
        <NavbarSimple />
        <main>
          {/* <RegisterForm /> */}
          <HeroHighlight containerClassName="custom-container-class">
            <VideoPlayer
              url={`${url}?controls=0&modestbranding=1&rel=0&autoplay=true`}
              playing={true}
              controls={true}
              width="100%"
              height="480px"
              loop={false}
              volume={0.7}
              muted={true}
            />
            <p className=" flex text-center max-w-prose pt-20"></p>
            <p className="mt-4 text-xl text-center">
              <Highlight className="text-indigo-500">Experience</Highlight> the
              best features and{" "}
              <Highlight className="text-purple-500">technologies</Highlight>{" "}
              with us.
            </p>
          </HeroHighlight>
        </main>
        <Routes>
          <Route path="/" element={<HeroHighlight />} />
          <Route path="/register" element={<RegisterForm />} />
        </Routes>

        {/* <div className="flex justify-center pt-16">
        <p className=" flex text-center max-w-prose">
          <TextGenerateEffect
            words={textEffect}
            className="text-white text-3xl tracking-wide "
            filter={true} // Optional: apply the blur effect before animating
            duration={0.8}
          />
        </p>
      </div> */}
        {/* <FeaturesSectionDemo />
      <FeatureSection /> */}
      </div>
    </Router>
  );
}

export default App;

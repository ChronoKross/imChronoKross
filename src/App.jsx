// import FeaturesSectionDemo from "./components/FeaturesSectionDemo";
import NavbarSimple from "./components/NavbarSimple";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { TextGenerateEffect } from "./components/wrapper/aceternity/textGenerate";
// import { Typography } from "@material-tailwind/react";
import { HeroHighlight, Highlight } from "./components/HeroHighlights";
// import { FeatureSection } from "./components/FeatureSection";
import { VideoPlayer } from "./components/VideoPlayer";
import { RegisterForm } from "./components/register/RegisterForm";

const textEffect = 
  `Hey there! 👋 My name is Nathan Gwyn, though I also go by ChronoKross//ImChronoKross. I am the sole owner of this brand. This website is a work in progress, so it's not being actively advertised to the public yet. Eventually, the site will feature a blog and focus on educational content. 🔧📚 Once the site is live, I do not give consent for web crawlers to train language models on my data. If you wish to do so in the future, please contact me @ nathanblainegwyn@gmail.com. Thank you for your understanding! 🙏`;

function App() {
  const url = "https://www.youtube.com/watch?v=2QTDcffpunY";
  
  return (
    <Router>
      <div>
        <NavbarSimple />
        <main>
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

        <div className="flex justify-center pt-16">
          <p className="flex text-center max-w-prose">
            <TextGenerateEffect
              words={textEffect}
              className="text-white text-3xl tracking-wide "
              filter={true} // Optional: apply the blur effect before animating
              duration={0.8}
            />
          </p>
        </div>
      </div>
    </Router>
  );
}

export default App;

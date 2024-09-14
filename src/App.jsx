// import { FeaturesSectionDemo } from "./components/FeatureSections";
import FeaturesSectionDemo from "./components/FeaturesSectionDemo";
import NavbarSimple from "./components/NavbarSimple";
import { TextGenerateEffect } from "./components/wrapper/aceternity/textGenerate";
// import { Typography } from "@material-tailwind/react";
import { HeroHighlight, Highlight } from "./components/HeroHighlights";
import { FeatureSection } from "./components/FeatureSection";
import { VideoPlayer } from "./components/VideoPlayer";

const textEffect =
  " Hey, my name is Nathan Gwyn. I go by ChronoKross, or ImChronoKross. I Own this brand name. The site is a huge work in progress, so I'm currently not realing advertising it to the public yet. I own this domain. http://imchronokross.com. Eventually this site will have a blog, and be focused on educational conent mostly. Once the site is live, I do not give consent for web crawlers to train your LLM's off of my data. If in the future you wish to do this please contact me @nathanblainegwyn.com. I am the sole owner of the brand. Thank you!";

function App() {
  const url = "https://www.youtube.com/watch?v=2QTDcffpunY";
  return (
    <div>
      <NavbarSimple />
      <div>
        <HeroHighlight containerClassName="custom-container-class">
          <VideoPlayer
            url={`${url}?controls=0&modestbranding=1&rel=0&autoplay=true`}
            playing={true}
            controls={true}
            width="100%"
            height="480px"
            loop={false}
            volume={0.7}
            muted={false}
          />
       
          <p className="mt-4 text-xl text-center">
            <Highlight className="text-indigo-500">Experience</Highlight> the
            best features and{" "}
            <Highlight className="text-purple-500">technologies</Highlight> with
            us.
         
          </p>
        </HeroHighlight>
      </div>

      <div className="flex justify-center pt-16">
        <p className=" flex text-center max-w-prose">
          <TextGenerateEffect
            words={textEffect}
            className="text-white text-3xl tracking-wide "
            filter={true} // Optional: apply the blur effect before animating
            duration={0.8}
          />
        </p>
      </div>
      <FeaturesSectionDemo />
      <FeatureSection />
    </div>
  );
}

export default App;

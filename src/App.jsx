// import { FeaturesSectionDemo } from "./components/FeatureSections";
import FeaturesSectionDemo from "./components/FeaturesSectionDemo";
import NavbarSimple from "./components/NavbarSimple";
import { TextGenerateEffect } from "./components/wrapper/aceternity/textGenerate";
// import { Typography } from "@material-tailwind/react";
import { HeroHighlight, Highlight } from "./components/HeroHighlights";
import { FeatureSection } from "./components/FeatureSection";

const textEffect =
  "Eventually this will be my digital home :).... until then, idk what it is lol. I am mainly using Material Tailwind, and Aceternty for my ui/ux styling";

function App() {
  return (
    <div>
      <NavbarSimple />
      <div>
        <HeroHighlight containerClassName="custom-container-class">
          <p className=" flex text-center max-w-prose">
            <h1 className="text-4xl font-bold text-center">
              <TextGenerateEffect
                words={textEffect}
                className="text-white text-3xl tracking-wide "
                filter={true} // Optional: apply the blur effect before animating
                duration={0.8}
              />
            </h1>
          </p>
          <p className="mt-4 text-xl text-center">
            <Highlight className="text-indigo-500">Experience</Highlight> the
            best features and{" "}
            <Highlight className="text-purple-500">technologies</Highlight> with
            us.
          </p>
        </HeroHighlight>
      </div>

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
      <FeaturesSectionDemo />
      <FeatureSection />
    </div>
  );
}

export default App;

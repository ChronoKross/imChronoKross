import { VideoPlayer } from "../../VideoPlayer";
import { HeroHighlight, Highlight } from "../../HeroHighlights";

// import { TextGenerateEffect } from "./../../wrapper/aceternity/textGenerate";
// import { FeatureSection } from "./../../FeatureSection";

const url = "https://www.youtube.com/watch?v=2QTDcffpunY";
// const textEffect = `Hey there! 👋 My name is Nathan Gwyn, though I also go by ChronoKross//ImChronoKross. I am the sole owner of this brand. This website is a work in progress, so it's not being actively advertised to the public yet. Eventually, the site will feature a blog and focus on educational content. 🔧📚 Once the site is live, I do not give consent for web crawlers to train language models on my data. If you wish to do so in the future, please contact me @ nathanblainegwyn@gmail.com. Thank you for your understanding! 🙏`;
export default function Home() {
  return (
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
          <Highlight className="text-indigo-500">Experience</Highlight> the best
          features and{" "}
          <Highlight className="text-purple-500">technologies</Highlight> with
          us.
        </p>
        {/* <FeatureSection /> */}
      </HeroHighlight>
    </main>
  );
}

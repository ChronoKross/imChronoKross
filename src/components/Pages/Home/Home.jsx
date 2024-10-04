import { VideoPlayer } from "../../VideoPlayer";
import { HeroHighlight, Highlight } from "../../HeroHighlights";

const url = "https://www.youtube.com/watch?v=2QTDcffpunY";

export default function Home() {
  return (
    <main>
      <HeroHighlight containerClassName="custom-container-class pt-32">
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
      </HeroHighlight>
    </main>
  );
}

// import { VideoPlayer } from "../../VideoPlayer";
import { HeroHighlight, Highlight } from "../../HeroHighlights";

// const url = "https://www.youtube.com/watch?v=2QTDcffpunY";

export default function Home() {
  return (
    <main>
      <HeroHighlight containerClassName="custom-container-class pt-32">
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

// import { VideoPlayer } from "../../VideoPlayer";
import { HeroHighlight, Highlight } from "../../HeroHighlights";
import SinglePost from "../../features/blog/pages/SinglePost";
// import useState from "react";
import useAuth from "../../../context/useAuth";
import Write from "../../features/blog/components/Write";
import Posts from "../../features/blog/pages/Posts";

// const url = "https://www.youtube.com/watch?v=2QTDcffpunY";

export default function Home() {
  const { user, setUser } = useAuth();
  // Get user from AuthContext
  if (user) console.log(user);
  return (
    <main>
      {/* <SinglePost /> */}
      <Write />
      {/* <Posts /> */}
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

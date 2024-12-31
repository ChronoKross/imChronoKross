// import { VideoPlayer } from "../../VideoPlayer";
import { HeroHighlight, Highlight } from "../../HeroHighlights";

// import useState from "react";
import useAuth from "../../../context/useAuth";
import Write from "../../features/blog/components/Write";
import Posts from "../../features/blog/pages/Posts";

// const url = "https://www.youtube.com/watch?v=2QTDcffpunY";
//
export default function Home() {
  const { user, setUser } = useAuth();
  // Get user from AuthContext
  if (user) console.log(user);
  return (
    <main>
      <HeroHighlight containerClassName="custom-container-class pt-32">
        <p className="mt-4 text-xl text-center">
           <Highlight className="text-indigo-500">Go away.</Highlight> please..{" "}
          <Highlight className="text-purple-500">the site is DOWN.</Highlight> (it's a side side side project). May be a while before it is up 😂 😂 
        </p>
      </HeroHighlight>

      {user ? (
        <Write />
      ) : (
        <p className="text-center font-medium mt-4 mb-4 text-red-800">
          You must be logged in to create a post.
        </p>
      )}
      <Posts />
    </main>
  );
}

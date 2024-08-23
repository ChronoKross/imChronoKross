import "./App.css";
import Hero from "./components/HeroCard";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import TwitchCTA from "./components/TwitchCTA";

function App() {
  return (
    <div className="flex flex-col min-h-screen w-full ">
      {/* <Navbar /> */}
      <TwitchCTA />
      <div className="flex-grow">
        <div className="flex justify-center flex-col md:flex-row md:gap-2">
          {/* <Hero
            title="ImChronoKross"
            description="This is just filler test for now. Lorem kdjfgh;idj This is just filler test for now. Lorem kdjfgh;idj This is just filler test for now. Lorem kdjfgh;idj This is just filler test for now. Lorem kdjfgh;idj"
          /> */}
        </div>
      </div>
      {/* <Footer /> */}
    </div>
  );
}

export default App;

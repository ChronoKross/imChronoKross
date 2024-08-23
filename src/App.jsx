import "./App.css";
import Hero from "./components/HeroCard";
// import Footer from "./components/Footer";
// import Navbar from "./components/Navbar";
import TwitchCTA from "./components/TwitchCTA";

function App() {
  return (
    <div className="flex flex-col min-h-screen w-full">
      {/* <Navbar /> */}

      {/* <Hero
        title="ImChronoKross"
        description="Still have a TON of work to do on the site. Until then slide by my Twitch and see if I'm live!"
      /> */}

      <div className="flex flex-1 justify-center items-center">
        <TwitchCTA />
      </div>

      {/* <Footer /> */}
    </div>
  );
}

export default App;

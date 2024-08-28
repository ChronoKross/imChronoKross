import "./App.css";
import Hero from "./components/HeroCard";

import { VortexWrapper } from "./components/wrapper/vortexWrapper";
import TwitchCTA from "./components/TwitchCTA";

function App() {
  return (
    <div className=" flex flex-col min-h-screen w-full">
      <VortexWrapper>
        {/* <Hero title="Yo mamma" description="Is Noice" /> */}
        <TwitchCTA />
      </VortexWrapper>
    </div>
  );
}

export default App;

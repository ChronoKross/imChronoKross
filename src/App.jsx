import NavbarSimple from "./components/NavbarSimple";
import { TextGenerateEffect } from "./components/wrapper/aceternity/textGenerate";
// import { Typography } from "@material-tailwind/react";

const textEffect =
  "Eventually this will be my digital home :).... until then, idk what it is lol. I am mainly using Material Tailwind, and Aceternty for my ui/ux styling";

function App() {
  return (
    <div>
      <NavbarSimple />
      <div className="flex justify-center items-center min-h-screen ">
        <p className="text-center max-w-prose">
          <TextGenerateEffect
            words={textEffect}
            className="text-white text-3xl tracking-wide "
            filter={true} // Optional: apply the blur effect before animating
            duration={0.8}
          />
        </p>
      </div>
    </div>
  );
}

export default App;

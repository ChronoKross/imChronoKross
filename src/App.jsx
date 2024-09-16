// import FeaturesSectionDemo from "./components/FeaturesSectionDemo";
import Navbar from "./components/Nav";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import { TextGenerateEffect } from "./components/wrapper/aceternity/textGenerate";
// import { Typography } from "@material-tailwind/react";
// import { HeroHighlight } from "./components/HeroHighlights";
// import { FeatureSection } from "./components/FeatureSection";

import RegisterForm from "./components/Pages/register/RegisterForm";
import Home from "./components/Pages/Home/Home";

function App() {
  return (
    <Router>
      <div className=" ">
        {" "}
        <Navbar />
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/register" element={<RegisterForm />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

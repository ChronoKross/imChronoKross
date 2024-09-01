import React from "react";
import ReactDOM from "react-dom/client";
import { ThemeProvider } from "@material-tailwind/react";
import App from "./App";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider className=" bg-black w-full h-full">
      <App />
    </ThemeProvider>
  </React.StrictMode>
);

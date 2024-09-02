import ReactDOM from "react-dom/client";
import "./styles/tailwind.css";

import App from "./App";

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>

  <div className=" bg-black  min-h-screen text-white ">
    <App />
  </div>

  // </React.StrictMode>
);

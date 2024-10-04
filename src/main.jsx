import ReactDOM from "react-dom/client";
import App from "./App";
import { UserContext } from "./context/UserContext"; // Import UserContext
import "./styles/tailwind.css";

const user = JSON.parse(localStorage.getItem("user")); // Fetch user from localStorage

ReactDOM.createRoot(document.getElementById("root")).render(
  <UserContext.Provider value={user}>
    <div className="bg-black min-h-screen text-white">
      <App />
    </div>
  </UserContext.Provider>
);

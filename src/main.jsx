import ReactDOM from "react-dom/client";
import App from "./App";
import { AuthProvider } from "./context/AuthContext"; // Import UserContext
import "./styles/tailwind.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <div className="bg-black min-h-screen text-white">
      <App />
    </div>
  </AuthProvider>
);

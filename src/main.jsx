import { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import "./styles/tailwind.css";
import { UserContext } from "./context/UserContext";
import Nav from "./components/Nav";
import App from "./App";

function Main() {
  const [user, setUser] = useState(null);

  // Retrieve user from localStorage when the component mounts
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <UserContext.Provider value={user}>
      <div className="bg-black min-h-screen text-white">
        <App />
      </div>
    </UserContext.Provider>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<Main />);

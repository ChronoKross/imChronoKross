import { useEffect } from "react";
import axios from "axios";
import Navbar from "./components/Nav";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthContext } from "./context/AuthContext";
import { useContext } from "react";
import RegisterForm from "./components/pages/register/RegisterForm";
import Home from "./components/pages/Home/Home";
import LoginForm from "./components/pages/Login/Login";
import Posts from "./components/features/blog/pages/Posts";
import SinglePost from "./components/features/blog/pages/SinglePost";
import PrivacyPolicy from "./components/legal/PrivacyPolicy";

function App() {
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const processCallback = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const idToken = urlParams.get("id_token");
      const accessToken = urlParams.get("access_token");

      if (idToken || accessToken) {
        console.log("ID Token:", idToken);
        console.log("Access Token:", accessToken);

        // Send the tokens to Strapi for processing using GET request
        try {
          const response = await axios.get(
            "http://localhost:1338/api/connect/google/callback",
            {
              params: {
                id_token: idToken,
                access_token: accessToken,
              },
            }
          );

          // Handle the response, e.g., save JWT or user data
          console.log("Strapi response:", response.data);

          // Optionally, save tokens to localStorage or set user session
          localStorage.setItem("idToken", idToken || "");
          localStorage.setItem("accessToken", accessToken || "");

          // Clean up the URL
          // const newUrl = window.location.origin + window.location.pathname;
          console.log("Cleaning up URL...");
        } catch (error) {
          console.error("Error sending tokens to Strapi:", error);
        }
      } else {
        console.log("No tokens found in the URL.");
      }
    };

    // Run the callback processing logic once
    processCallback();
  }, []);

  console.log("User from context in App component:", user);

  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/blog" element={<Posts />} />
          <Route path="/blog/:id" element={<SinglePost />} />
          <Route path="/auth/google" element={<Home />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

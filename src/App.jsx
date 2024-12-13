import Navbar from "./components/Nav";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthContext } from "./context/AuthContext";
import { useContext } from "react";
import RegisterForm from "./components/Pages/Register/RegisterForm.jsx";
import Home from "./components/pages/Home/Home.jsx";
import LoginForm from "./components/pages/Login/LoginForm.jsx";
import Posts from "./components/features/blog/pages/Posts";
import SinglePost from "./components/features/blog/pages/SinglePost";
import PrivacyPolicy from "./components/legal/PrivacyPolicy";
import GoogleOAuthRedirect from "./components/auth/GoogleOAuth/GoogleOAuthRedirect.jsx";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function App() {
  const { user } = useContext(AuthContext);
  //
  // useEffect(() => {
  //   const checkAuth = async () => {
  //     try {
  //       // Optionally fetch the logged-in user from your Strapi custom endpoint
  //       const response = await axios.get(
  //         "http://localhost:1338/api/checkAuth",
  //         {
  //           withCredentials: true, // Include session cookies
  //         }
  //       );
  //       console.log("Authenticated user:", response.data);
  //     } catch (error) {
  //       console.error("Error checking authentication:", error);
  //     }
  //   };

  //   checkAuth();
  // }, []);

  console.log("User from context in App component:", user);
  const DebugLogger = () => {
    const location = useLocation();
    useEffect(() => {
      console.log("Current Path:", location.pathname);
      console.log("Full Location:", location);
    }, [location]);
    return null;
  };

  return (
    <Router>
      <div>
        <DebugLogger />
        <Navbar />
        <Routes>
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/blog" element={<Posts />} />
          <Route path="/blog/:id" element={<SinglePost />} />

          {/* Alternatively, add both routes to be safe */}
          <Route
            path="/connect/google/redirect/*"
            element={<GoogleOAuthRedirect />}
          />
          <Route
            path="*"
            element={
              <div>
                <h1>Unmatched Route</h1>
                <p>Path: {window.location.pathname}</p>
              </div>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

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
// import GoogleOAuthRedirect from "./components/auth/GoogleOAuth/GoogleOAuthRedirect.jsx";
//

function App() {
  //checks user against server to make sure user is properly authenticated
  const { user } = useContext(AuthContext);
  ////////////////////////////////////

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

  useEffect(() => {
    const getQueryParams = () => {
      const urlParams = new URLSearchParams(location.search);
      const idToken = urlParams.get("id_token");
      const accessToken = urlParams.get("access_token");
      console.log("Google OAuth Redirect Params:");
      console.log("ID Token:", idToken);
      console.log("Access Token:", accessToken);
    };

    getQueryParams();
  }, []);
  console.log("User from context in App component:", user);

  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route
            path="/connect/google/redirect/*"
            element={<GoogleOAuthRedirect />}
          />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/blog" element={<Posts />} />
          <Route path="/blog/:id" element={<SinglePost />} />

          {/* <Route path="*" element={<GoogleOAuthRedirect />} /> */}
        </Routes>

        {/* SOME REASON THIS DOES NOT WORK {  <Route
            path="/connect/google/redirect/*"
            element={<GoogleOAuthRedirect />}
          />
          {"Fall Back Route"}
          <Route path="*" element={<GoogleOAuthRedirect />} />
        </Routes>} */}
      </div>
    </Router>
  );
}

export default App;

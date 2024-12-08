import Navbar from "./components/Nav";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthContext } from "./context/AuthContext";
import { useContext } from "react";
import RegisterForm from "./components/pages/register/RegisterForm";
import Home from "./components/pages/Home/Home";
import LoginForm from "./components/pages/Login/LoginForm";
import Posts from "./components/features/blog/pages/Posts";
import SinglePost from "./components/features/blog/pages/SinglePost";
import PrivacyPolicy from "./components/legal/PrivacyPolicy";
import GoogleOAuthRedirect from "./components/auth/GoogleOAuth/GoogleOAuthRedirect";

function App() {
  const { user } = useContext(AuthContext);

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
          <Route
            path="/connect/:provider/redirect"
            element={<GoogleOAuthRedirect />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

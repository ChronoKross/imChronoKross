import Navbar from "./components/Nav";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthContext } from "./context/AuthContext";
import { useContext } from "react";
import RegisterForm from "./components/Pages/register/RegisterForm";
import Home from "./components/Pages/Home/Home";
import LoginForm from "./components/Pages/Login/Login";
import Posts from "./components/features/blog/pages/Posts";
import SinglePost from "./components/features/blog/pages/SinglePost";
import PrivacyPolicy from "./components/legal/PrivacyPolicy";
import OAuthCallback from "./components/useGoogleOauth"; // Import the OAuth callback component

function App() {
  const { user } = useContext(AuthContext);
  console.log("User from context in App component:", user);

  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          {/* Define the routes for each page */}
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/blog" element={<Posts />} />
          <Route path="/blog/:id" element={<SinglePost />} />

          {/* OAuth callback route for dynamic provider handling */}
          <Route path="/callback/:provider" element={<OAuthCallback />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const GoogleOAuthRedirect = () => {
  const location = useLocation(); // To access query params
  const navigate = useNavigate(); // To redirect users

  useEffect(() => {
    const handleOAuthCallback = async () => {
      try {
        // Step 1: Extract id_token or access_token from URL
        const params = new URLSearchParams(location.search);
        const idToken = params.get("id_token");
        const accessToken = params.get("access_token");

        if (!idToken && !accessToken) {
          throw new Error("Missing token in redirect URL");
        }

        // Log to debug (can be removed later)
        console.log("Received token:", idToken || accessToken);

        // Step 2: Send the token to Strapi's callback endpoint

        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/auth/google/callback`,
          {
            params: { access_token: accessToken || idToken },
          }
        );

        // Step 3: Extract the JWT and user info from Strapi's response
        const { jwt, user } = response.data;

        // Step 4: Store the JWT securely
        localStorage.setItem("jwt", jwt); // Replace with secure storage like HttpOnly cookies for production

        // Optional: Save user info for app state if needed
        console.log("Authenticated user:", user);

        // Step 5: Redirect the user to your desired page
        navigate("/");
      } catch (error) {
        console.error("OAuth callback error:", error);
        navigate("/login"); // Redirect to login page on failure
      }
    };

    handleOAuthCallback();
  }, [location, navigate]);

  return <p>Processing your authentication...</p>;
};

export default GoogleOAuthRedirect;

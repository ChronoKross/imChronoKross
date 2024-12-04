import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

const useGoogleOauth = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const isLocalhost = window.location.hostname === "localhost";
  const backendURL = isLocalhost
    ? "http://localhost:1338/api/connect/google/callback"
    : "https://api.imchronokross.com/api/connect/google/callback";

  // Get the authorization code from the query parameters
  const queryParams = new URLSearchParams(location.search);
  const authCode = queryParams.get("code");

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const processOAuth = async () => {
      if (authCode) {
        setIsLoading(true);
        try {
          // Send the authorization code to the Strapi backend
          const response = await axios.get(`${backendURL}?code=${authCode}`, {
            withCredentials: true, // Ensure cookies are sent/received
          });

          // Handle success: Save the token or user info
          const { jwt, user } = response.data;
          localStorage.setItem("jwt", jwt);

          console.log("User authenticated:", user);

          // Redirect to the home page or another route
          navigate("/");
        } catch (err) {
          console.error("Error during OAuth process:", err.response || err);
          setError("Authentication failed. Please try again.");
          navigate("/login");
        } finally {
          setIsLoading(false);
        }
      }
    };

    processOAuth();
  }, [authCode, backendURL, navigate]);

  return { isLoading, error };
};

export default useGoogleOauth;

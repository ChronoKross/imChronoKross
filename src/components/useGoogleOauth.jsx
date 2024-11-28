import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

const useGoogleOauth = () => {
  const location = useLocation();
  const navigate = useNavigate(); // useNavigate instead of useHistory

  // Dynamically set the backend and frontend URLs based on environment
  const isLocalhost = window.location.hostname === "localhost";
  const backendURL = isLocalhost
    ? "http://localhost:1337/api/connect/google/callback" // Localhost callback
    : "https://api.imchronokross.com/api/connect/google/callback"; // Production callback
  const frontendRedirectURL = isLocalhost
    ? "http://localhost:5173/callback" // Localhost frontend callback
    : "https://www.imchronokross.com/callback"; // Production frontend callback

  // Extract the 'code' from the query parameters in the URL
  const queryParams = new URLSearchParams(location.search);
  const authCode = queryParams.get("code");

  // Extract the provider (e.g., google)
  const provider = location.pathname.split("/")[2];

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (authCode) {
      setIsLoading(true);
      // Send the authorization code to your Strapi backend to exchange for a token
      axios
        .post(backendURL, { code: authCode })
        .then((response) => {
          const { token } = response.data;
          localStorage.setItem("jwt", token); // Store the JWT in localStorage
          navigate("/"); // Redirect to the dashboard or home page
        })
        .catch((error) => {
          setError("Error during OAuth process.");
          console.error(error);
          navigate("/login"); // Redirect to login page if something goes wrong
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [authCode, navigate, provider, backendURL]);

  return (
    <div>
      {isLoading && <p>Loading...</p>}
      {error && <p>{error}</p>}
    </div>
  );
};

export default useGoogleOauth;

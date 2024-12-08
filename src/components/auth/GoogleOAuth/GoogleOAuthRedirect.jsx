import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const GoogleOAuthRedirect = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const processOAuthCallback = async () => {
      // Extract the access token from the URL query params
      const urlParams = new URLSearchParams(window.location.search);
      const accessToken = urlParams.get("access_token");

      if (!accessToken) {
        console.error("No access token found in URL");
        return;
      }

      try {
        // Send the access token to Strapi to finalize the authentication
        const response = await axios.get(
          `${
            import.meta.env.VITE_API_URL || "http://localhost:1338"
          }/api/auth/google/callback`,
          {
            params: { access_token: accessToken },
            withCredentials: true, // Ensure cookies are sent
          }
        );

        // Extract JWT and user information
        const { jwt, user } = response.data;

        // Save JWT and user info (optional: secure HttpOnly cookie setup)
        localStorage.setItem("jwt", jwt);
        localStorage.setItem("user", JSON.stringify(user));

        console.log("OAuth Success:", user);

        // Redirect to home or desired location
        navigate("/");
      } catch (error) {
        console.error(
          "OAuth callback failed:",
          error.response || error.message
        );
      }
    };

    processOAuthCallback();
  }, [navigate]);

  return (
    <div>
      <p>Processing your authentication...</p>
    </div>
  );
};

export default GoogleOAuthRedirect;

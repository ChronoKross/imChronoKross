import { useCallback } from "react";

const useGoogleAuth = () => {
  // Function to initiate the Google OAuth flow
  const login = useCallback(() => {
    // Determine the base URL based on the environment
    const backendUrl =
      import.meta.env.REACT_APP_BACKEND_URL || "http://localhost:1338";
    const strapiGoogleUrl = `${backendUrl}/api/connect/google`;

    console.log("Redirecting to:", strapiGoogleUrl);
    window.location.href = strapiGoogleUrl;
  }, []);

  return { login };
};

export default useGoogleAuth;

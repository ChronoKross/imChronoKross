import { useCallback } from "react";

const useGoogleAuth = () => {
  // Function to initiate the Google OAuth flow
  const login = useCallback(() => {
    const strapiGoogleUrl = `${
      import.meta.env.VITE_BACKEND_URL
    }/api/connect/google`;
    console.log("Redirecting to:", strapiGoogleUrl);
    window.location.href = strapiGoogleUrl;
  }, []);

  return { login };
};

export default useGoogleAuth;

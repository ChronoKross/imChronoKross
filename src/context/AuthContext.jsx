import { createContext } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import propTypes from "prop-types";

const AuthContext = createContext();

const fetchAuthStatus = async ({ queryKey }) => {
  const [_, API_BASE_URL] = queryKey; // Extract API_BASE_URL from queryKey
  console.log("Checking your authentication status. Hang tight...");
  const response = await axios.get(`${API_BASE_URL}/api/checkAuth`, {
    withCredentials: true,
  });
  return response.data.user;
};

const AuthProvider = ({ children }) => {
  const API_BASE_URL =
    import.meta.env.VITE_API_BASE_URL ||
    (window.location.hostname === "localhost"
      ? "http://localhost:1338"
      : `https://${window.location.hostname}/api`);

  const {
    data: user,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["authStatus", API_BASE_URL],
    queryFn: fetchAuthStatus,
    retry: 1, // Retry once on failure
    staleTime: 0, // Always fetch fresh data
  });

  if (isLoading) {
    console.log("Checking your authentication status...");
  }

  if (isError) {
    console.error("Error occurred while verifying authentication status.");
  }

  return (
    <AuthContext.Provider value={{ user, refetch }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: propTypes.node.isRequired,
};

export { AuthContext, AuthProvider };

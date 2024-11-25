import { createContext, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import propTypes from "prop-types";

const AuthContext = createContext();

const API_BASE_URL =
  window.location.hostname === "localhost"
    ? "http://localhost:1338/api"
    : "https://api.imchronokross.com/api";

const fetchAuthStatus = async () => {
  console.log(
    `Checking your authentication status at ${API_BASE_URL}/checkAuth`
  );

  try {
    const response = await axios.get(`${API_BASE_URL}/checkAuth`, {
      withCredentials: true,
    });
    return response.data.user;
  } catch (error) {
    console.error("Error fetching authentication status:", error.message);
    throw error; // Allow React Query to handle the error
  }
};

const AuthProvider = ({ children }) => {
  const [error, setError] = useState(null); // Track errors in state for custom handling

  const {
    data: user,
    isError,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["authStatus"], // Simplify queryKey (no need to pass URL redundantly)
    queryFn: fetchAuthStatus, // Use the fetchAuthStatus function
    retry: 1, // Retry once on failure
    staleTime: 0, // Always fetch fresh data
    refetchOnWindowFocus: false, // Disable refetch on window focus
    onError: (error) => {
      console.error("Auth check failed:", error.message);
      setError(error); // Update error state
    },
    onSuccess: () => {
      setError(null); // Clear error state on success
    },
  });

  return (
    <AuthContext.Provider value={{ user, refetch, isError, isLoading, error }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: propTypes.node.isRequired,
};

export { AuthContext, AuthProvider, API_BASE_URL };

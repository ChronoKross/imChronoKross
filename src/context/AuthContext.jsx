import { createContext, useState, useEffect } from "react";
import axios from "axios";
import propTypes from "prop-types";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Manage user state
  const [isLoading, setIsLoading] = useState(true); // Track loading state
  const [error, setError] = useState(null); // Track error state

  const API_BASE_URL =
    window.location.hostname === "localhost"
      ? "http://localhost:1338/api"
      : "https://api.imchronokross.com/api";

  useEffect(() => {
    const checkAuth = async () => {
      setIsLoading(true);
      try {
        console.log(
          `Checking authentication status at ${API_BASE_URL}/checkAuth`
        );
        const response = await axios.get(`${API_BASE_URL}/checkAuth`, {
          withCredentials: true,
        });
        setUser(response.data.user); // Set user if authenticated
        setError(null); // Clear any existing errors
      } catch (err) {
        console.error("Error checking authentication status:", err.message);
        setUser(null); // Clear user on failure
        setError(err.message); // Set error message
      } finally {
        setIsLoading(false); // Always stop loading
      }
    };

    checkAuth(); // Call the function on component mount
  }, [API_BASE_URL]);

  return (
    <AuthContext.Provider value={{ user, setUser, isLoading, error }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: propTypes.node.isRequired,
};

export { AuthContext, AuthProvider };

import { createContext, useState, useEffect, useMemo } from "react";
import axios from "axios";
import propTypes from "prop-types";

// Create the AuthContext
const AuthContext = createContext();

const API_BASE_URL =
  window.location.hostname === "localhost"
    ? "http://localhost:1338/api"
    : "https://api.imchronokross.com/api";

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    // Retrieve user from localStorage on initial load
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAuthStatus = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`${API_BASE_URL}/checkAuth`, {
          withCredentials: true,
        });
        const authenticatedUser = response.data.user;

        setUser(authenticatedUser); // Update state
        localStorage.setItem("user", JSON.stringify(authenticatedUser)); // Save user to localStorage
        setError(null);
      } catch (err) {
        console.error("Error checking authentication:", err.message);
        setUser(null);
        localStorage.removeItem("user"); // Clear user from localStorage on failure
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAuthStatus();
  }, []);

  const logout = async () => {
    try {
      await axios.post(`${API_BASE_URL}/logout`, {}, { withCredentials: true }); // Notify backend to clear the cookie
      setUser(null);
      localStorage.removeItem("user"); // Clear user data on logout
    } catch (err) {
      console.error("Error during logout:", err.message);
    }
  };

  return (
    <AuthContext.Provider value={{ user, setUser, isLoading, error, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: propTypes.node.isRequired,
};

export { AuthContext, AuthProvider };

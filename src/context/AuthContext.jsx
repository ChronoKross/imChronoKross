import { createContext, useState, useEffect } from "react";
import axios from "axios";
import propTypes from "prop-types";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        console.log("Checking authentication status...");
        const response = await axios.get(
          "http://localhost:1338/api/checkAuth",
          {
            withCredentials: true,
          }
        );
        if (response.status === 200) {
          console.log("User authenticated successfully:", response.data.user);
          setUser(response.data.user);
          localStorage.setItem("authenticated", true); // Store user in local storage
        } else {
          console.log("User is not authenticated.");
          localStorage.setItem("authenticated", false);
          setUser(null);
        }
      } catch (error) {
        console.error("Authentication check failed:", error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, []);

  // if (loading) {
  //   return <div>Loading...</div>; // Display a loading screen until the check completes
  // }

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: propTypes.node.isRequired,
};

export { AuthContext, AuthProvider };

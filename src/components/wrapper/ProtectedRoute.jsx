import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import PropTypes from "prop-types";

const ProtectedRoute = ({ children }) => {
  const { user } = useContext(AuthContext);

  // Check if the user is authenticated
  if (!user) {
    // Redirect to login if not authenticated
    return <Navigate to="/login" replace />;
  }

  // Render children if authenticated
  return children;
};

ProtectedRoute.PropTypes = {
  children: PropTypes.node,
};
export default ProtectedRoute;

import ReactDOM from "react-dom/client";
import App from "./App";
import { AuthProvider } from "./context/AuthContext"; // Import UserContext
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./styles/tailwind.css";
import { GoogleOAuthProvider } from "@react-oauth/google";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <GoogleOAuthProvider clientId="178325313232-5jib912b13d4iflrpo5m22dl6a3qq668.apps.googleusercontent.com">
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <div className="bg-black min-h-screen text-white">
          <App />
        </div>
      </AuthProvider>
    </QueryClientProvider>
  </GoogleOAuthProvider>
);

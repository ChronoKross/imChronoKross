import ReactDOM from "react-dom/client";
import App from "./App";
import { AuthProvider } from "./context/AuthContext"; // Import UserContext
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./styles/tailwind.css";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <div className="bg-black min-h-screen text-white">
        <App />
      </div>
    </AuthProvider>
  </QueryClientProvider>
);

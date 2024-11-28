import PropTypes from "prop-types";
import { Label } from "./Label";
import { Input } from "./Input";
import { cn } from "@/lib/utils";
import axios from "axios";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../context/AuthContext"; // Import AuthContext
import { IconBrandGoogle } from "@tabler/icons-react";

export default function LoginForm() {
  const navigate = useNavigate(); // Initialize navigate hook for redirection
  const { setUser } = useContext(AuthContext); // Get setUser from AuthContext to update user state

  // Dynamically set the API URL based on environment
  const API_URL =
    window.location.hostname === "localhost"
      ? "http://localhost:1338/api/login"
      : "https://api.imchronokross.com/api/login";

  // Form state
  const [formData, setFormData] = useState({
    email: "", // Email instead of username
    password: "", // Password
  });

  const [errorMessage, setErrorMessage] = useState(""); // For displaying errors
  const [successMessage, setSuccessMessage] = useState(""); // For displaying success messages
  const [isLoading, setIsLoading] = useState(false); // Loading state to prevent double submissions
  const [isPasswordVisible, setIsPasswordVisible] = useState(false); // State to track password visibility

  // Function to toggle the visibility of the password field
  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prevState) => !prevState);
  };

  // Update form state on input change
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(""); // Clear previous errors
    setSuccessMessage(""); // Clear previous success messages
    setIsLoading(true); // Set loading state to true

    try {
      // Send the login request with email and password
      const response = await axios.post(
        API_URL,
        {
          identifier: formData.email, // Email instead of username
          password: formData.password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true, // Allows the request to send cookies
        }
      );

      // If the response is successful, set the user context and navigate to the home page
      if (response.status === 200) {
        console.log("Login successful:", response.data);

        // Extract user data from response payload
        const user = response.data.user;

        // Set the user in context to keep track of the logged-in user state
        setUser(user);

        setSuccessMessage(
          `Welcome back, ${user.username}! Redirecting you to /home...`
        );
        setIsLoading(false); // Stop loading

        // Redirect to home page after a slight delay
        setTimeout(() => navigate("/"), 2000);
      }
    } catch (error) {
      // If login fails, display the error and stay on the login page
      console.error("Error logging in:", error.response?.data || error.message);
      setErrorMessage(
        error.response?.data?.message ||
          "Login failed. Please check your credentials."
      );

      setIsLoading(false); // Stop loading
    }
  };

  const googleOAuthLogin = () => {
    // Redirect to Google OAuth consent page
    window.location.href =
      "https://accounts.google.com/o/oauth2/v2/auth?" +
      "client_id=178325313232-5jib912b13d4iflrpo5m22dl6a3qq668.apps.googleusercontent.com" +
      "&redirect_uri=https://www.imchronokross.com/callback" + // match this with your redirect URI
      "&response_type=code" +
      "&scope=openid profile email"; // Scopes you need (email and profile)
  };

  return (
    <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 lg:mt-16 md:p-8 shadow-input dark:bg-black">
      <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
        Welcome Back
      </h2>
      <p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300">
        Login to access your account.
      </p>
      {errorMessage && <p className="text-red-500">{errorMessage}</p>}{" "}
      {/* Show error message */}
      {successMessage && (
        <p className="text-green-500">{successMessage}</p>
      )}{" "}
      {/* Show success message */}
      <form className="my-8" onSubmit={handleSubmit}>
        {/* Email Field */}
        <LabelInputContainer className="mb-4">
          <Label htmlFor="email">Email Address</Label>
          <Input
            id="email"
            placeholder="projectmayhem@fc.com"
            type="email"
            className="text-white"
            onChange={handleChange}
            required
            disabled={isLoading} // Disable input during loading
          />
        </LabelInputContainer>

        {/* Password Field */}
        <LabelInputContainer className="mb-4">
          <Label htmlFor="password">Password</Label>
          <div className="relative">
            <Input
              id="password"
              placeholder="••••••••"
              onChange={handleChange}
              type={isPasswordVisible ? "text" : "password"} // Conditionally change type
              className="text-white pr-10" // Padding to give space for the eye icon
              disabled={isLoading} // Disable input during loading
            />
            {/* Eye Icon */}
            <span
              onClick={togglePasswordVisibility}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5 cursor-pointer"
            >
              {isPasswordVisible ? "👁️" : "🙈"}{" "}
              {/* You can use an icon library instead */}
            </span>
          </div>
        </LabelInputContainer>
        <IconBrandGoogle
          onClick={googleOAuthLogin}
          className="h-4 w-4 text-neutral-800 dark:text-neutral-300"
        />
        <span className="text-neutral-700 dark:text-neutral-300 text-sm">
          Google
        </span>
        <BottomGradient />

        <button
          className="mt-8 bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset]"
          disabled={isLoading} // Disable button when loading
        >
          {isLoading ? "Logging in..." : "Login"}{" "}
          {/* Show loading text during submission */}
        </button>
      </form>
    </div>
  );
}

const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};

// LabelInputContainer component for consistency
const LabelInputContainer = ({ children, className }) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};

LabelInputContainer.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

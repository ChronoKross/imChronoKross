import PropTypes from "prop-types";
import { Label } from "./Label";
import { Input } from "./Input";
import { cn } from "@/lib/utils";
import axios from "axios"; // use axios for making requests
import { useState } from "react";

export default function LoginForm() {
  // Form state
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form submitted", formData);

    try {
      // Send request to your Strapi API to login a user
      const response = await axios.post(
        "http://localhost:1338/api/auth/local", // Correct endpoint
        {
          identifier: formData.email,
          password: formData.password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("User logged in:", response.data);

      // Extract the JWT from the response
      const { jwt } = response.data;

      // Store the JWT in localStorage or sessionStorage

      localStorage.setItem("jwt", jwt);

      // Optionally, redirect the user or update the UI
      // For example, navigate to the dashboard:
      // window.location.href = "/dashboard";
    } catch (error) {
      console.error("Error logging in:", error.response?.data || error.message);
      // Optionally, display error messages to the user
    }
  };

  return (
    <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 lg:mt-16 md:p-8 shadow-input dark:bg-black">
      <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
        Welcome Back
      </h2>
      <p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300">
        Login to access your account.
      </p>
      <form className="my-8" onSubmit={handleSubmit}>
        {/* Email Field */}
        <LabelInputContainer className="mb-4">
          <Label htmlFor="email">Email Address</Label>
          <Input
            id="email"
            placeholder="projectmayhem@fc.com"
            type="email"
            className=" text-white"
            onChange={handleChange}
          />
        </LabelInputContainer>

        {/* Password Field */}
        <LabelInputContainer className="mb-4">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            placeholder="••••••••"
            type="password"
            className=" text-white"
            onChange={handleChange}
          />
        </LabelInputContainer>

        <button className="mt-8 bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset]">
          Login &rarr;
        </button>
      </form>
    </div>
  );
}

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

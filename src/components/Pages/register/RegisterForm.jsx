import PropTypes from "prop-types";
import { Label } from "./Label";
import { Input } from "./Input";
import { cn } from "@/lib/utils";
import {
  IconBrandGithub,
  IconBrandGoogle,
  IconBrandOnlyfans,
} from "@tabler/icons-react";
import axios from "axios"; // use axios for making requests
import { useState } from "react";
import bcrypt from "bcryptjs"; // import bcryptjs

export default function RegisterForm() {
  // Form state
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    bio: "",
    profilePicture: null,
    socialLinks: "",
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const handleFileChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      profilePicture: e.target.files[0], // for uploading image
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form submitted", formData);

    try {
      const formDataToSend = new FormData(); // For file upload

      // Append form data
      formDataToSend.append(
        "username",
        `${formData.firstName} ${formData.lastName}`
      );
      formDataToSend.append("email", formData.email);
      formDataToSend.append("password", formData.password); // Plain password
      formDataToSend.append("bio", formData.bio);
      if (formData.profilePicture) {
        formDataToSend.append("profilePicture", formData.profilePicture);
      }
      formDataToSend.append(
        "socialLinks",
        JSON.stringify({ twitter: formData.socialLinks }) // Convert to JSON
      );

      // Send request to your Strapi API to register a user
      const response = await axios.post(
        "http://localhost:1338/api/auth/local/register", // Correct endpoint
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("User created:", response.data);

      // Extract the JWT from the response
      const { jwt, user } = response.data;

      // Store the JWT in localStorage or sessionStorage
      localStorage.setItem("token", jwt);

      // Optionally, redirect the user or update the UI
      // For example, navigate to the dashboard:
      // window.location.href = "/dashboard";
    } catch (error) {
      console.error(
        "Error creating user:",
        error.response?.data || error.message
      );
      // Optionally, display error messages to the user
    }
  };

  return (
    <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 lg:mt-16 md:p-8 shadow-input dark:bg-black">
      <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
        Welcome to Chrono's Kross
      </h2>
      <p className="text-neutral-600 text-sm max-w-sm mt-2 ">
        Register so you can like... do things.
      </p>
      <form className="my-8" onSubmit={handleSubmit}>
        {/* Name Fields */}
        <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
          <LabelInputContainer>
            <Label htmlFor="firstName">First name</Label>
            <Input
              id="firstName"
              placeholder="Tyler"
              type="text"
              className=" text-white"
              onChange={handleChange}
            />
          </LabelInputContainer>
          <LabelInputContainer>
            <Label htmlFor="lastName">Last name</Label>
            <Input
              id="lastName"
              placeholder="Durden"
              type="text"
              className=" text-white"
              onChange={handleChange}
            />
          </LabelInputContainer>
        </div>

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

        {/* Bio Field */}
        <LabelInputContainer className="mb-4">
          <Label htmlFor="bio">Bio</Label>
          <Input
            id="bio"
            placeholder="A brief bio..."
            type="text"
            className=" text-white"
            onChange={handleChange}
          />
        </LabelInputContainer>

        {/* Social Links Field */}
        <LabelInputContainer className="mb-4">
          <Label htmlFor="socialLinks">Social Links</Label>
          <Input
            id="socialLinks"
            placeholder="Add your social media URLs here..."
            type="text"
            className=" text-white"
            onChange={handleChange}
          />
        </LabelInputContainer>

        {/* Profile Picture Upload */}
        <LabelInputContainer className="mb-4">
          <Label htmlFor="profilePicture">Profile Picture</Label>
          <Input id="profilePicture" type="file" onChange={handleFileChange} />
        </LabelInputContainer>

        <button className="mt-8 bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset]">
          Sign up &rarr;
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

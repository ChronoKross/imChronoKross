import PropTypes from "prop-types";
import { Label } from "./Label";
import { Input } from "./Input";
import { cn } from "@/lib/utils";
import axios from "axios";
import { useState } from "react";

export default function RegisterForm() {
  // Dynamically set the API URL based on environment
  const API_URL =
    window.location.hostname === "localhost"
      ? "http://localhost:1338/api/register"
      : "https://api.imchronokross.com/api/register";

  // Form state
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    bio: "Optional",
    profilePicture: null,
    socialLinks: "Optional",
  });

  const [preview, setPreview] = useState(null); // State to store the preview URL
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prevState) => ({
        ...prevState,
        profilePicture: file, // Store the image file
      }));
      setPreview(URL.createObjectURL(file)); // Generate preview URL
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("username", formData.username);
      formDataToSend.append("email", formData.email);
      formDataToSend.append("password", formData.password);
      formDataToSend.append("bio", formData.bio);
      if (formData.profilePicture) {
        formDataToSend.append("profilePicture", formData.profilePicture);
      }
      formDataToSend.append(
        "socialLinks",
        JSON.stringify({ twitter: formData.socialLinks })
      );

      const response = await axios.post(API_URL, formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });

      console.log("User created:", response.data);
      setSuccessMessage("Registration successful! You can now log in.");

      // Ensure the profile picture URL is correctly returned by the backend
      const { id, username, email, profilePicture } = response.data.user;

      // Store the entire user object in localStorage as a single object
      const user = {
        id,
        username,
        email,
        profilePicture: profilePicture || "", // Ensure profilePicture is not null
      };

      // Save the user object as a single entry in localStorage
      localStorage.setItem("user", JSON.stringify(user));
    } catch (error) {
      console.error(
        "Error creating user:",
        error.response?.data || error.message
      );
      setErrorMessage(
        error.response?.data?.message || "An unexpected error occurred."
      );
    }
  };

  return (
    <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 lg:mt-16 md:p-8 shadow-input dark:bg-black">
      <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
        Welcome to Chrono's Kross
      </h2>
      <p className="text-neutral-600 text-sm max-w-sm mt-2">
        Register so you can like... do things.
      </p>
      {errorMessage && <p className="text-red-500">{errorMessage}</p>}
      {successMessage && <p className="text-green-500">{successMessage}</p>}
      <form className="my-8" onSubmit={handleSubmit}>
        {/* Username Field */}
        <LabelInputContainer className="mb-4">
          <Label htmlFor="username">Username</Label>
          <Input
            id="username"
            placeholder="Your username"
            type="text"
            className=" text-white"
            onChange={handleChange}
            required
          />
        </LabelInputContainer>

        {/* Email Field */}
        <LabelInputContainer className="mb-4">
          <Label htmlFor="email">Email Address</Label>
          <Input
            id="email"
            placeholder="projectmayhem@fc.com"
            type="email"
            className=" text-white"
            onChange={handleChange}
            required
          />
        </LabelInputContainer>

        {/* Password Field with Toggle */}
        <LabelInputContainer className="mb-4 relative">
          <Label htmlFor="password">Password</Label>
          <div className="relative w-full">
            <Input
              id="password"
              placeholder="••••••••"
              type={showPassword ? "text" : "password"} // Toggle between text and password
              className=" text-white"
              onChange={handleChange}
              required
            />
            <span
              className="absolute right-2 top-3 cursor-pointer"
              onClick={() => setShowPassword((prevState) => !prevState)}
            >
              {showPassword ? "👁️" : "🙈"} {/* Eyeball icon */}
            </span>
          </div>
        </LabelInputContainer>

        {/* Bio Field */}
        <LabelInputContainer className="mb-4">
          <Label htmlFor="bio">Bio</Label>
          <Input
            id="bio"
            placeholder="Optional"
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
            placeholder="Optional"
            type="text"
            className=" text-white"
            onChange={handleChange}
          />
        </LabelInputContainer>

        {/* Profile Picture Upload */}
        <LabelInputContainer className="mb-4">
          <Label htmlFor="profilePicture">Profile Picture</Label>
          <Input
            id="profilePicture"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
          />
          {/* Center the image preview */}
          {preview && (
            <div className="flex justify-center mt-2">
              <img
                src={preview}
                alt="Profile Preview"
                className="w-24 h-24 object-cover rounded-full"
              />
            </div>
          )}
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

// import PropTypes from "prop-types";
// import { Label } from "./Label";
// import { Input } from "./Input";
// import { cn } from "@/lib/utils";
// import axios from "axios";
// import { useState } from "react";

// export default function RegisterForm() {
//   // Dynamically set the API URL based on environment
//   const API_URL =
//     window.location.hostname === "localhost"
//       ? "http://localhost:1338/api/register"
//       : "https://api.imchronokross.com/api/register";

//   // Form state
//   const [formData, setFormData] = useState({
//     username: "",
//     email: "",
//     password: "",
//     confirmPassword: "", // Added confirm password field
//     bio: "Optional",
//     profilePicture: null,
//     socialLinks: "Optional",
//   });

//   const [preview, setPreview] = useState(null); // State to store the preview URL
//   const [errorMessage, setErrorMessage] = useState("");
//   const [successMessage, setSuccessMessage] = useState("");

//   const handleChange = (e) => {
//     const { id, value } = e.target;
//     setFormData((prevState) => ({
//       ...prevState,
//       [id]: value,
//     }));
//   };

//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setFormData((prevState) => ({
//         ...prevState,
//         profilePicture: file, // Store the image file
//       }));
//       setPreview(URL.createObjectURL(file)); // Generate preview URL
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setErrorMessage("");
//     setSuccessMessage("");

//     // Validate that passwords match
//     if (formData.password !== formData.confirmPassword) {
//       setErrorMessage("Passwords do not match!"); // Show error message
//       return; // Prevent form submission
//     }

//     try {
//       const formDataToSend = new FormData();
//       formDataToSend.append("username", formData.username);
//       formDataToSend.append("email", formData.email);
//       formDataToSend.append("password", formData.password);
//       formDataToSend.append("bio", formData.bio);
//       if (formData.profilePicture) {
//         formDataToSend.append("profilePicture", formData.profilePicture);
//       }
//       formDataToSend.append(
//         "socialLinks",
//         JSON.stringify({ twitter: formData.socialLinks })
//       );

//       const response = await axios.post(API_URL, formDataToSend, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//         },
//         withCredentials: true,
//       });

//       console.log("User created:", response.data);
//       setSuccessMessage("Registration successful! You can now log in.");

//       // Ensure the profile picture URL is correctly returned by the backend
//       const { id, username, email, profilePicture } = response.data.user;

//       // Store the entire user object in localStorage as a single object
//       const user = {
//         id,
//         username,
//         email,
//         profilePicture: profilePicture || "", // Ensure profilePicture is not null
//       };

//       // Save the user object as a single entry in localStorage
//       localStorage.setItem("user", JSON.stringify(user));
//     } catch (error) {
//       console.error(
//         "Error creating user:",
//         error.response?.data || error.message
//       );
//       setErrorMessage(
//         error.response?.data?.message || "An unexpected error occurred."
//       );
//     }
//   };

//   return (
//     <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 lg:mt-16 md:p-8 shadow-input dark:bg-black">
//       <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
//         Welcome to Chrono's Kross
//       </h2>
//       <p className="text-neutral-600 text-sm max-w-sm mt-2">
//         Register so you can like... do things.
//       </p>
//       {errorMessage && <p className="text-red-500">{errorMessage}</p>}
//       {successMessage && <p className="text-green-500">{successMessage}</p>}
//       <form className="my-8" onSubmit={handleSubmit}>
//         {/* Username Field */}
//         <LabelInputContainer className="mb-4">
//           <Label htmlFor="username">Username</Label>
//           <Input
//             id="username"
//             placeholder="Your username"
//             type="text"
//             className=" text-white"
//             onChange={handleChange}
//             required
//           />
//         </LabelInputContainer>

//         {/* Email Field */}
//         <LabelInputContainer className="mb-4">
//           <Label htmlFor="email">Email Address</Label>
//           <Input
//             id="email"
//             placeholder="projectmayhem@fc.com"
//             type="email"
//             className=" text-white"
//             onChange={handleChange}
//             required
//           />
//         </LabelInputContainer>

//         {/* Password Field */}
//         <LabelInputContainer className="mb-4">
//           <Label htmlFor="password">Password</Label>
//           <Input
//             id="password"
//             placeholder="••••••••"
//             type="password"
//             className=" text-white"
//             onChange={handleChange}
//             required
//           />
//         </LabelInputContainer>

//         {/* Confirm Password Field */}
//         <LabelInputContainer className="mb-4">
//           <Label htmlFor="confirmPassword">Confirm Password</Label>
//           <Input
//             id="confirmPassword"
//             placeholder="••••••••"
//             type="password"
//             className=" text-white"
//             onChange={handleChange}
//             required
//           />
//         </LabelInputContainer>

//         {/* Bio Field */}
//         <LabelInputContainer className="mb-4">
//           <Label htmlFor="bio">Bio</Label>
//           <Input
//             id="bio"
//             placeholder="Optional"
//             type="text"
//             className=" text-white"
//             onChange={handleChange}
//           />
//         </LabelInputContainer>

//         {/* Social Links Field */}
//         <LabelInputContainer className="mb-4">
//           <Label htmlFor="socialLinks">Social Links</Label>
//           <Input
//             id="socialLinks"
//             placeholder="Optional"
//             type="text"
//             className=" text-white"
//             onChange={handleChange}
//           />
//         </LabelInputContainer>

//         {/* Profile Picture Upload */}
//         <LabelInputContainer className="mb-4">
//           <Label htmlFor="profilePicture">Profile Picture</Label>
//           <Input
//             id="profilePicture"
//             type="file"
//             accept="image/*"
//             onChange={handleFileChange}
//           />
//           {/* Center the image preview */}
//           {preview && (
//             <div className="flex justify-center mt-2">
//               <img
//                 src={preview}
//                 alt="Profile Preview"
//                 className="w-24 h-24 object-cover rounded-full"
//               />
//             </div>
//           )}
//         </LabelInputContainer>

//         <button className="mt-8 bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset]">
//           Sign up &rarr;
//         </button>
//       </form>
//     </div>
//   );
// }

// const LabelInputContainer = ({ children, className }) => {
//   return (
//     <div className={cn("flex flex-col space-y-2 w-full", className)}>
//       {children}
//     </div>
//   );
// };

// LabelInputContainer.propTypes = {
//   children: PropTypes.node,
//   className: PropTypes.string,
// };

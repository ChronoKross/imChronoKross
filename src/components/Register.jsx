import { useState } from "react";
import axios from "axios";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      // Send registration request to Strapi API
      const response = await axios.post(
        "http://localhost:1338/api/auth/local/register",
        {
          username,
          email,
          password,
        }
      );

      // Get JWT token and user info from response
      const { jwt, user } = response.data;
      // Optionally store the token in localStorage (or cookies in production)
      localStorage.setItem("jwt", jwt);

      // Display success message or redirect the user
      setMessage(`Welcome ${user.username}, you have successfully registered!`);
    } catch (error) {
      setMessage("Registration failed. Please try again.");
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Register</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default Register;

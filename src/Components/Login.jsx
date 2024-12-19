import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // Send login request to the backend
      const response = await axios.post("http://localhost:5000/api/users/login", { email, password });
      console.log("Response from backend:", response);

      // Check if the token exists in the response
      if (response.data.token) {
        // Store the token, role, and uid in localStorage
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("role", response.data.role);  // Store user role
        localStorage.setItem("uid", response.data.uid);  // Store user unique id
        console.log("User details:", {
          token: response.data.token,
          role: response.data.role,  // Should not be undefined now
          uid: response.data.uid,    // Store the unique user ID
        });

        // Redirect to dashboard or home page after successful login
        navigate("/");  // Adjust route as necessary
      } else {
        setError("Authentication failed. Please check your credentials.");
      }
    } catch (err) {
      // Handle errors (e.g., server or request errors)
      setError(err.response ? err.response.data.message : "Server error");
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <h2>Login</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">Login</button>
      {error && <p>{error}</p>}
    </form>
  );
};

export default Login;

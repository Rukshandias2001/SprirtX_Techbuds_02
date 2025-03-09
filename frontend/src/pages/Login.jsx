import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/auth.css";


const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    console.log("Login", username);
    console.log("Password", password);
    try {
      // Make API call to authenticate
      const response = await axios.post("http://localhost:8080/api/auth/authenticate", {
        username: username,
        password: password
      });

      const token = response.data;
      console.log("Success", response.data);
      
      // Get user details with the token
    
      const user = await axios.get(
        "http://localhost:8080/api/auth/current-user",
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );
      console.log("User data:", user.data);
      // Handle successful login
      
      console.log("Token", token);
      console.log("Admin", user.admin);
      // Store token in localStorage
      localStorage.setItem("token", token);
      localStorage.setItem("userRole", user.admin);

      // Redirect based on role
      if (user.admin) {

console.log("Success", response.data);
      // Handle successful login
      const { token, role } = response.data;
      
      // Store token in localStorage
      localStorage.setItem("token", token);
      localStorage.setItem("userRole", role);
      
      // Redirect based on role
      if (role === "ADMIN") {

        navigate("/admin-dashboard");
      } else {
        navigate("/players");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("Invalid credentials. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1>🏏 Login</h1>
        <p>Welcome back to the Ultimate Cricket Battle!</p>
        {error && <div className="error-message">{error}</div>}
        <form onSubmit={handleLogin}>
          <div className="input-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>
          <button type="submit" className="auth-button" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
        <p className="auth-link">
          Don't have an account?{" "}
          <span onClick={() => navigate("/signup")}>Sign up here</span>
        </p>
      </div>
    </div>
  );
};

export default Login;
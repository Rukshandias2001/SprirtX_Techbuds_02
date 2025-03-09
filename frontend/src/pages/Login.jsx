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

    try {
      // Make API call to authenticate
      const response = await axios.post(
        "http://localhost:8080/api/auth/authenticate",
        {
          username,
          password,
        }
      );

      const token = response.data;
      console.log("Login successful:", response.data);

      // Store token in localStorage
      localStorage.setItem("token", token);

      // Get user details with the token
      const user = await axios.get(
        "http://localhost:8080/api/auth/current-user",
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const { role } = user.data; // ✅ Extract role properly
      console.log("User data:", user.data);
      console.log(user.data);
      // Store user role in localStorage
      localStorage.setItem("userRole", JSON.stringify(user.data));

      // Redirect based on role
      if (role) {
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

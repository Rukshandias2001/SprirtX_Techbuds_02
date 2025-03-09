import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/auth.css";


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    // Simulate login logic (replace with your API call)
    const loginData = { email, password };
    console.log("Logging in with:", loginData);

    // Redirect based on role (example: hardcoded for demo)
    const role = email.includes("admin") ? "Admin" : "Customer"; // Example logic
    if (role === "Admin") {
      navigate("/admin-dashboard"); // Redirect to admin dashboard
    } else {
      navigate("/players"); // Redirect to players page for customers
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1>🏏 Login</h1>
        <p>Welcome back to the Ultimate Cricket Battle!</p>
        <form onSubmit={handleLogin}>
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
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
          <button type="submit" className="auth-button">
            Login
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
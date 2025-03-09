import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/auth.css";
import  bat from "../assets/bat.png";
import  ball from "../assets/ball2.png";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignUp = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    const signUpData = {
      username,
      password,
    };

    console.log("Signing up with:", signUpData);
    navigate("/login");
  };

  return (
    <div className="auth-container">

   {/* Falling Balls Animation */}
   <div className="falling-balls">
        {[...Array(10)].map((_, index) => (
          <div key={index} className="ball"></div>
        ))}
      </div>
<div className="bat-container">
<img src={ball}  className="bat" />
</div>


      <div className="auth-card">
        <h1>🏏 Sign Up</h1>
        <p>Join the Ultimate Cricket Battle!</p>
        <form onSubmit={handleSignUp}>
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
          <div className="input-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm your password"
              required
            />
          </div>
          {error && <p className="error-message">{error}</p>}
          <button type="submit" className="auth-button">
            Sign Up
          </button>
        </form>
        <p className="auth-link">
          Already have an account? <span onClick={() => navigate("/login")}>Login here</span>
        </p>
      </div>


<div className="bat-container">
<img src={bat}  className="bat" />
</div>


    </div>
  );
};

export default SignUp;
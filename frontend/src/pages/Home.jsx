import React from "react";
import "../styles/home.css";
import Navbar from "./Navbar";

const Home = () => {
  return (
    <div className="home-container">

      <svg width="800" height="500" viewBox="0 0 800 500">
        <defs>
          {/* Path for Curved Text */}
          <path id="upperCurve" d="M 100 250 Q 400 50 700 250" fill="transparent" />
        </defs>

        {/* Main Gold Text */}
        <text fontSize="60" fontWeight="bold" fill="gold" stroke="#000" strokeWidth="6">
          <textPath href="#upperCurve" startOffset="50%" textAnchor="middle">
            INTER-UNIVERSITY
          </textPath>
        </text>
      </svg>
    </div>
  );
};

export default Home;

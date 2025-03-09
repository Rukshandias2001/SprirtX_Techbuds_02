import React from "react";
import "../styles/home.css";
import Navbar from "./Navbar";
import logo1 from "../assets/l2.png";

const teams = [
  "Team 1", "Team 2", "Team 3", "Team 4", "Team 5",
  "Team 6", "Team 7", "Team 8", "Team 9", "Team 10", "Team 11"
];

const Home = () => {
  return (
    <div className="home-container">
      <div className="logo-1">
        <img src={logo1} alt="logo" />
      </div>

      <div className="svg-container">
        <svg width="800" height="500" viewBox="0 0 800 500">
          <defs>
            <path
              id="upperCurve"
              d="M 100 250 Q 400 50 700 250"
              fill="transparent"
            />
          </defs>
          <text fontSize="60" fontWeight="200px" fill="#FFB22C" stroke="#000" strokeWidth="6">
            <textPath href="#upperCurve" startOffset="50%" textAnchor="middle">
              INTER-UNIVERSITY
            </textPath>
          </text>
        </svg>
      </div>

      {/* Bubbles for Teams */}
      <div className="teams-container">
        <div className="teams-left">
          {teams.slice(0, 5).map((team, index) => (
            <div key={index} className="team-bubble">{team}</div>
          ))}
        </div>

        <div className="teams-right">
          {teams.slice(5, 10).map((team, index) => (
            <div key={index} className="team-bubble">{team}</div>
          ))}
        </div>

        <div className="team-center">
          <div className="team-bubble">{teams[10]}</div>
        </div>
      </div>
    </div>
  );
};

export default Home;

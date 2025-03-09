import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/players.css";
import image1 from "../assets/image copy 9.png";
import image2 from "../assets/image copy 7.png";
import image3 from "../assets/image.png";
import image4 from "../assets/image copy 2.png";
import image5 from "../assets/image copy 4.png";
import image6 from "../assets/image copy 6.png";
import image7 from "../assets/image copy 5.png";
import image8 from "../assets/image copy 3.png";
import image9 from "../assets/image copy 5.png";
import m11 from "../assets/ball.mp4"; // Ensure this path is correct

const universityMascots = {
  "University of the Visual & Performing Arts": image1,
  "Eastern University": image2,
  "University of Moratuwa": image3,
  "University of Ruhuna": image9,
  "University of Jaffna": image4,
  "University of Kelaniya": image5,
  "University of Peradeniya": image2,
  "University of Colombo": image6,
  "University of Sri Jayewardenepura": image7,
  "South Eastern University": image8,
};

const motivationalQuotes = [
  "Cricket is a game of uncertainty. Embrace the challenge! 🏏",
  "Every ball is a new opportunity. Make it count! ⚡",
  "Teamwork makes the dream work. Play as one! 🤝",
  "Pressure is a privilege. Rise to the occasion! 💪",
  "The harder you work, the luckier you get. Keep going! 🚀",
  "Believe in yourself, and you’re already halfway there. 🌟",
  "Success is no accident. It’s hard work and determination. 🏆",
  "Stay focused, stay hungry, and never give up. 🔥",
  "The scoreboard doesn’t define you. Your effort does. 📊",
  "Play with passion, and the rest will follow. ❤️",
];

const Players = () => {
  const navigate = useNavigate();
  const [quote, setQuote] = useState("");

  useEffect(() => {
    // Set a random motivational quote on component mount
    const randomQuote =
      motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)];
    setQuote(randomQuote);
  }, []);

  const handleUniversityClick = (university) => {
    navigate(`/university/${encodeURIComponent(university)}`);
  };

  return (
    <>
      {/* Video Background for Main Content */}
      <div className="video-background">
        <video
          src={m11}
          autoPlay
          loop
          muted
          playsInline
          className="background-video"
        ></video>
      </div>

      {/* Battle Arena Section */}
      <div className="battle-arena">
        <div className="battle-arena-text">
          <h1>🏏 Welcome to the Ultimate Cricket Battle! ⚡</h1>
          <p>Choose your university to see its top players in action!</p>
          <div className="motivational-quote">
            <p>"{quote}"</p>
          </div>
        </div>
        <div className="cricket-ball-animation"></div>
      </div>

      {/* Main Content Section */}
      <div className="main-content">
        <div className="university-list">
          {Object.entries(universityMascots).map(([university, mascot]) => (
            <div
              key={university}
              className="university-card"
              onClick={() => handleUniversityClick(university)}
            >
              <img src={mascot} alt={university} className="university-logo" />
              <div className="university-info">
                <h3>{university}</h3>
                <button className="select-team-btn">Select Team</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Players;
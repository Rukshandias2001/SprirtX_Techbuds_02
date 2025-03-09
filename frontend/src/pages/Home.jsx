import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/home.css";
import l3 from "../assets/image copy 13.png";
import l4 from "../assets/image copy 14.png";
import l5 from "../assets/image copy 15.png";
import l6 from "../assets/l2.png";
import m11 from "../assets/ball.mp4"; 
import { DotLottieReact } from '@lottiefiles/dotlottie-react';




const Home = () => {
  const [messages, setMessages] = useState([{ sender: "bot", text: "Hello! How can I help you?" }]);
  const [input, setInput] = useState("");

  const sendMessage = () => {
    if (input.trim() === "") return;
    setMessages([...messages, { sender: "user", text: input }]);
    setInput("");
    
    setTimeout(() => {
      setMessages((prev) => [...prev, { sender: "bot", text: "I'm just a demo chatbot!" }]);
    }, 1000);
  };

  return (
    <div>
     

      {/* Hero Section */}
{/* Hero Section */}
{/* Hero Section */}
<div className="hero-container3">
  <div className="hero">
    <div className="hero-images">
    <DotLottieReact
      src="https://lottie.host/f47ae04a-dd03-4fe2-a0b2-1b57cd698720/bsssRLFBZR.lottie"
      loop
      autoplay
      className="hero-lottie"
    />
    </div>
    <div className="hero-text">
      <h1>The Ultimate Inter-University Fantasy Cricket Game</h1>
      <button className="join-btn">Join Now</button>
    </div>
    
  </div>
</div>


      {/* Game Cards */}
   {/* Game Cards */}
<div className="game-cards">
<div className="right-gradient"></div>
<div className="teamupdate">
<h1> Latest Updates</h1>
 </div>
 <div className="mc">
  <div className="card3">

    <img src={l3} alt="Unicesty Logo" className="game-logo" />
    <p>🏏 Unicesty | 3,159 Teams</p>
  </div>
  <div className="card3">
    <img src={l4} alt="Untasy Logo" className="game-logo" />
    <p>🏏 Untasy | 7,300 Teams</p>
  </div>
  <div className="card3">
    <img src={l5} alt="Fantasy Logo" className="game-logo" />
    <p>🏏 Fantasy | 5,579 Teams</p>
  </div>
  </div>
</div>


<div id="chatbot" className="chatbot-container">
  <h2>Chat with our Bot</h2>
  <div className="chat-window">
    {/* Flexbox container for robot and images */}
    <div className="robot-icon-container">
      <img src={l6} alt="Left Image" className="side-image" />
      <DotLottieReact
        src="https://lottie.host/9384df54-cbc8-4fca-abb8-630ef6c4870d/9roxhQNQz0.lottie"
        loop
        autoplay
        className="robot-icon"
      />
      <img src={l6} alt="Right Image" className="side-image" />
    </div>

    {/* Link to the Chat Page */}
    <Link to="/chat">
      <button className="start-chat-btn">Start Chat</button>
    </Link>
  </div>
</div>


      {/* Footer */}
      <footer className="footer">
        <p>© 2024 Fantasy Cricket Game. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default Home;







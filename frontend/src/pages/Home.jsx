import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/home.css";
import l3 from "../assets/image copy 13.png";
import l4 from "../assets/image copy 14.png";
import l5 from "../assets/baller.png";
import l6 from "../assets/l2.png";
import m11 from "../assets/w.mp4"; 
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { motion } from "framer-motion";



const Home = () => {


  return (
     <div>
      {/* Hero Section */}
      <motion.div 
        className="hero-container3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <motion.div 
          className="hero"
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.2 }}
        >
          <div className="masked-container">
            <motion.video 
              autoPlay 
              loop 
              muted 
              className="masked-video"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1 }}
            >
              <source src={m11} type="video/mp4" />
              Your browser does not support the video tag.
            </motion.video>
          </div>

          <motion.div 
            className="hero-images"
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <img src={l5} className="hero-lottie" alt="Hero Image" />
          </motion.div>

          <motion.div 
            className="hero-text"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <h1>The Ultimate Inter-University Fantasy Cricket Game</h1>
            <motion.button 
              className="join-btn"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              Select Team
            </motion.button>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Home;

import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../styles/playersDetails.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import avatar from "../assets/image.png";
import Navbar from "./Navbar";
import batsmanImg from "../assets/bat3.png";
import bowlerImg from "../assets/bowler.png";
import allRounderImg from "../assets/allr.png";
import { calculateBattingStrikeRate, calculateBattingAverage, calculateBowlingStrikeRate, calculateEconomyRate } from "../utils/calculateStats";

const playerImages = {
  Batsman: batsmanImg,
  Bowler: bowlerImg,
  "All-Rounder": allRounderImg,
};

const PlayerDetails = () => {
  const { universityName } = useParams();
  const [players, setPlayers] = useState([]);
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const navigate = useNavigate();
  const API_URL = "http://localhost:8080/players/GetPlayers";

  useEffect(() => {
    fetch(API_URL)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        const universityPlayers = data.filter((player) => player.University === universityName);
        setPlayers(universityPlayers);
      })
      .catch((error) => console.error("Error fetching players:", error));
  }, [universityName]);

  return (
    <>
      <Navbar />
      <div className="pd">
        <div className="battle-arena1">
          <h1>🏏 {universityName} Players ⚡</h1>
        </div>
        <button className="back-button" onClick={() => navigate("/players")}>
          ⬅ Back
        </button>

        {/* Swiper for Players */}
        <div className="university-section">
          <Swiper
            effect="coverflow"
            grabCursor={true}
            centeredSlides={true}
            slidesPerView={3}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            coverflowEffect={{
              rotate: 20,
              stretch: 0,
              depth: 300,
              modifier: 1,
              slideShadows: true,
            }}
            pagination={{ clickable: true }}
            modules={[EffectCoverflow, Pagination, Autoplay]}
            className="swiper-container"
          >
            {players.length > 0 ? (
              players.map((player) => (
                <SwiperSlide key={player.id} className="swiper-slide">
                  <div className="card">
                    <img src={playerImages[player.Category] || avatar} alt={player.Name} className="player-image" />
                    <h3>{player.Name}</h3>
                    <p className="detail">Category: {player.Category}</p>
                    <button className="view-stats" onClick={() => setSelectedPlayer(player)}>View Details</button>
                  </div>
                </SwiperSlide>
              ))
            ) : (
              <p className="no-players">No players found for {universityName}.</p>
            )}
          </Swiper>
        </div>

        {/* Player Details Modal */}
        {selectedPlayer && (
          <div className="modal">
            <div className="modal-content">
              <h2>{selectedPlayer.Name}</h2>
              <img src={avatar} alt={selectedPlayer.Name} className="modal-avatar" />
              <p>University: {selectedPlayer.University}</p>
              <p>Category: {selectedPlayer.Category}</p>
              <p>Total Runs: {selectedPlayer["Total Runs"]}</p>
              <p>Batting Strike Rate: {calculateBattingStrikeRate(selectedPlayer["Total Runs"], selectedPlayer["Balls Faced"])}</p>
              <p>Batting Average: {calculateBattingAverage(selectedPlayer["Total Runs"], selectedPlayer["Innings Played"])}</p>
              <p>Bowling Strike Rate: {calculateBowlingStrikeRate(selectedPlayer["Balls Bowled"], selectedPlayer.Wickets)}</p>
              <p>Economy Rate: {calculateEconomyRate(selectedPlayer["Runs Conceded"], selectedPlayer["Balls Bowled"])}</p>
              <p>Wickets: {selectedPlayer.Wickets}</p>
              <button onClick={() => setSelectedPlayer(null)}>Close</button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default PlayerDetails;

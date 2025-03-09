import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../styles/playersDetails.css"; // Import the new CSS file
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import playersData from "../data/players.json";
import bowlerImg from "../assets/bowler.png";
import avatar from "../assets/av.png";
import Navbar from './Navbar';

const PlayerDetails = () => {
  const { universityName } = useParams();
  const [players, setPlayers] = useState([]);
  const [selectedPlayer, setSelectedPlayer] = useState(null);

  const navigate = useNavigate();
  useEffect(() => {
    setPlayers(playersData.filter((player) => player.university === universityName));
  }, [universityName]);

  return (
    <>
      <Navbar />
      <div className="pd">
        <div className="battle-arena1">
          <h1>🏏 {universityName} Players ⚡</h1>
        </div>
        <button className="back-button" onClick={() => navigate("/players")}>⬅ Back</button>
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
            {players.map((player) => (
              <SwiperSlide key={player.id} className="swiper-slide">
                <div className="card">
                  <img src={bowlerImg} alt={player.name} className="player-image" />
                  <div className="player-info">
                    <h3>{player.name}</h3>
                    <p>Category: {player.category}</p>
                    <button className="view-stats" onClick={() => setSelectedPlayer(player)}>
                      View Details
                    </button>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {selectedPlayer && (
          <div className="modal">
            <div className="modal-content">
              <h2>{selectedPlayer.name}</h2>
              <img src={avatar} alt={selectedPlayer.name} className="modal-avatar" />
              <div className="modal-stats">
                <p>University: {selectedPlayer.university}</p>
                <p>Category: {selectedPlayer.category}</p>
                <p>Total Runs: {selectedPlayer.totalRuns}</p>
                <p>Wickets: {selectedPlayer.wickets}</p>
              </div>
              <button onClick={() => setSelectedPlayer(null)}>Close</button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default PlayerDetails;
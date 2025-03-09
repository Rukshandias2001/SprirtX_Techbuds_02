import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useTeam } from "../context/TeamContext";
import "../styles/SelectTeam.css";
import defaultAvatar from "../assets/avatar.png";

export default function SelectTeam() {
  const { players, addPlayer, team, removePlayer } = useTeam();

  const [selectedCategory, setSelectedCategory] = useState("Batsman");
 

  const filteredPlayers = players.filter(
    (player) => player.category === selectedCategory
  );

  return (
    <div className="select-team-container">
      <div className="myTeam-div">
        <Link to="/team">
          <button className="myTeam-btn">My Team</button>
        </Link>
      </div>

      <h2>🏏 Select Your Team</h2>

      <div className="category-buttons">
        {["Batsman", "Bowler", "All-Rounder"].map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`category-button ${
              selectedCategory === category ? "active" : ""
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="player-list-team">
        {filteredPlayers.length > 0 ? (
          filteredPlayers.map((player) => (
            <div key={player.id} className="player-card-team">
              <div className="player-avatar-container">
                <img
                  src={defaultAvatar}
                  alt="Player Avatar"
                  className="player-avatar"
                />
              </div>
              <div>
                <h3>{player.name}</h3>
                <p>{player.university}</p>
                <p>Rs. {player.price.toFixed(2).toLocaleString()}</p>
              </div>

              {team.some((p) => p.id === player.id) ? (
               <button
               onClick={() => {
                 console.log("📢 Removing Player ID:", player.id); // Debug
                 removePlayer(player.id);
               }}
               className="remove-button"
             >
               ❌ Remove
             </button>
             
              ) : (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    addPlayer(player);
                  }}
                  className="add-button-team"
                >
                  + Add
                </button>
              )}
            </div>
          ))
        ) : (
          <p className="text-gray-500">
            No players available in this category.
          </p>
        )}
      </div>
    </div>
  );
}

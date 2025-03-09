import React, { useEffect } from "react";
import { useTeam } from "../context/TeamContext";

import { Link } from "react-router-dom"; 
import "../styles/TeamManagement.css";

export default function TeamManagement() {
  const { team, totalPoints, removePlayer } = useTeam();

  // Debug: Log team state when it updates
  useEffect(() => {
    console.log("📢 Team in TeamManagement:", team);
  }, [team]); // Run every time team updates

  return (
    <div className="team-management-container">
        <div className="back-button-container">
        <Link to="/select-team">
          <button className="back-button">⬅ Back to Select Team</button>
        </Link>
      </div>
      <h2>🚀 My Gaming Team</h2>

      <p className="team-status">
        Team Completeness: <strong>{team.length}/11 players selected</strong>
      </p>

      {team.length === 11 && (
        <h3 className="total-points">🏆 Total Points: {totalPoints}</h3>
      )}

     
      <div className="team-list">
        {team.length === 0 ? (
          <p className="text-gray-500">No players in your team yet.</p>
        ) : (
          <ul>
            {team.map((player) => (
              <li key={player.id} className="player-card">
                <span className="player-name">{player.name} - {player.university}</span>
                <span className="player-price">💰 Rs. {player.price.toFixed(2).toLocaleString()}</span>
                <button
                  onClick={() => removePlayer(player.id)}
                  className="remove-button"
                >
                  ❌ Remove
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

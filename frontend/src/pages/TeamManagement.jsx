import React, { useEffect, useState } from "react";
import axios from "axios";
import { useTeam } from "../context/TeamContext";
import { Link } from "react-router-dom";
import "../styles/TeamManagement.css";

export default function TeamManagement() {
  const { team, totalPoints, removePlayer, setTeam } = useTeam();
  const userId = "67cd525ad5bcd10c89be8519"; // Dummy User ID

  useEffect(() => {
    console.log(" Team in TeamManagement:", team);
  }, [team]);

  // Fetch saved players from the database on page load
  useEffect(() => {
    if (!userId || team.length === 0) return;
    
    const listOfIds = team.map(player => player.id).join(",");
    
    axios
      .get(`http://localhost:8080/editUser/getPlayers?listOfIds=${listOfIds}`)
      .then((response) => {
        console.log("Fetched team from DB:", response.data);
        setTeam(response.data);
      })
      .catch((error) => console.error("Error fetching team from DB:", error));
  }, [userId, setTeam]);

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
                <span className="player-name">
                  {player.name} - {player.university}
                </span>
                <span className="player-price">
                  💰 Rs. {player.price.toLocaleString()}
                </span>
                <button
                  onClick={() => removePlayer(player.id)}
                  className="remove-button"
                  disabled={team.length === 11}
                >
                  ❌ Remove
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* ✅ Show Save Button Only When Team is Complete */}
      {team.length === 11 && (
        <button className="save-team-button" disabled>
          ✅ Team Saved!
        </button>
      )}
    </div>
  );
}
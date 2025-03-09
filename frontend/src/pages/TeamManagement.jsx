import React, { useEffect, useState } from "react";
import axios from "axios";
import { useTeam } from "../context/TeamContext";
import { Link } from "react-router-dom";
import "../styles/TeamManagement.css";

export default function TeamManagement() {
  const { team, totalPoints, removePlayer, setTeam } = useTeam();
  const userId = "67cd525ad5bcd10c89be8519"; // Dummy User ID
  const [budget, setBudget] = useState(0);

  useEffect(() => {
    if (!userId) return;

    // Step 1: Fetch the list of player IDs
    axios
      .get(`http://localhost:8080/editUser/getUser?userId=${userId}`)
      .then(async (response) => {
        console.log("📢 Fetched user data:", response.data);
        setBudget(response.data.price || 0);

        const listOfPlayerIds = response.data.listOfPlayers || []; // Ensure it exists

        if (listOfPlayerIds.length === 0) {
          console.log("No players found for this user.");
          setTeam([]);
          return;
        }

        try {
          // Step 2: Fetch full player details
          const playersResponse = await axios.get(
            `http://localhost:8080/editUser/getPlayers?listOfIds=${listOfPlayerIds.join(",")}`
          );

          console.log("📢 Fetched full player details:", playersResponse.data);

          // Step 3: Store players in state
          setTeam(playersResponse.data);
        } catch (error) {
          console.error("❌ Error fetching player details:", error);
        }
      })
      .catch((error) =>
        console.error("❌ Error fetching user data:", error)
      );
  }, [userId, setTeam]);

  return (
    <div className="team-management-container">
      <div className="back-button-container">
        <Link to="/select-team">
          <button className="back-button">⬅ Back to Select Team</button>
        </Link>
      </div>
      <h2>🚀 My Gaming Team</h2>

      <p className="team-budget">
      💰 <strong>Remaining Budget: Rs. {budget.toFixed(2).toLocaleString()}</strong>
      </p>

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
                 
                  💰 Rs. {player.price ? player.price.toLocaleString() : "N/A"}
                </span>
              
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

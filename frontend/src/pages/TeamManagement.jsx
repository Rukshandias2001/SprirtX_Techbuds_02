import React from "react";
import { useTeam } from "../context/TeamContext";

export default function TeamManagement() {
  const { team, totalPoints, removePlayer } = useTeam();

  return (
    <div className="p-5">
      <h2 className="text-2xl font-bold text-gray-700">📋 My Team</h2>
      <p className="text-lg">Team Completeness: <strong>{team.length}/11 players selected</strong></p>

      {team.length === 11 && (
        <h3 className="text-xl text-green-600 font-bold">Total Points: {totalPoints}</h3>
      )}

      {/* Team List */}
      <div className="mt-4">
        {team.length === 0 ? (
          <p className="text-gray-500">No players in your team yet.</p>
        ) : (
          <ul className="mt-2">
            {team.map((player) => (
              <li key={player.id} className="border-b py-2 flex justify-between">
                <span>{player.name} - {player.university} - Rs. {player.price.toLocaleString()}</span>
                <button
                  onClick={() => removePlayer(player.id)}
                  className="text-red-500 hover:underline"
                >
                  Remove ❌
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

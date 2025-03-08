import React from "react";
import { useTeam } from "../context/TeamContext";

export default function Team() {
  const { team, totalPoints, removePlayer } = useTeam();
  return (
    <div className="p-5">
    <h2 className="text-2xl font-bold">Your Team ({team.length}/11 Players)</h2>
    {team.length === 11 && <h3 className="text-green-600">Total Points: {totalPoints}</h3>}
    <div className="mt-4">
      {team.map(player => (
        <div key={player.id} className="flex justify-between p-3 border-b">
          <span>{player.name} - {player.university} - Rs. {player.value.toLocaleString()}</span>
          <button
            onClick={() => removePlayer(player.id)}
            className="text-red-500 hover:underline"
          >
            Remove
          </button>
        </div>
      ))}
    </div>
  </div>
  );
}
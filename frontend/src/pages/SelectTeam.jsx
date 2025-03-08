import React from "react";
import {useTeam} from "../context/TeamContext";

export default function SelectTeam() {
  const {players,addPlayer} = useTeam();
  const [selectedCategory,setSelectedCategory]= useState("Batsmen");

  const filteredPlayers = players.filter(players =>players.category === selectedCategory);


  return (
    <div className="p-5">
      <h2 className="text-2xl font-bold text-gray-700">⚽ Select Your Team</h2>

      {/* Category Selection Buttons */}
      <div className="mt-4 flex gap-4">
        {["Batsmen", "Bowlers", "All-rounders", "Wicketkeepers"].map(category => (
          <button 
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded ${
              selectedCategory === category ? "bg-blue-500 text-white" : "bg-gray-300"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Player List */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredPlayers.length > 0 ? (
          filteredPlayers.map(player => (
            <div key={player.id} className="border p-4 rounded-lg shadow-md bg-white flex justify-between">
              <div>
                <h3 className="font-bold">{player.name}</h3>
                <p>{player.university}</p>
                <p className="text-blue-600">Rs. {player.price.toLocaleString()}</p>
              </div>
              <button
                onClick={() => addPlayer(player)}
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
              >
                Add ➕
              </button>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No players available in this category.</p>
        )}
      </div>
    </div>
  );

}
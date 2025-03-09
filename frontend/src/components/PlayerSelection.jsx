import React from "react";
import {useTeam} from "../context/TeamContext";

export default function PlayerSelection({category}){

const [players,addPlayer] = useTeam();
const filteredPlayers = players.filter(p=>p.category === category);

  return(
     <div className="p-5">
      <h2 className="text-2xl font-bold">{category} Players</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
        {filteredPlayers.map(player => (
          <div key={player.id} className="border p-4 rounded-lg shadow-md bg-white">
            <h3 className="font-bold">{player.name}</h3>
            <p>{player.university}</p>
            <p>Rs. {player.value.toLocaleString()}</p>
            <button
              onClick={() => addPlayer(player)}
              className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Add to Team
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

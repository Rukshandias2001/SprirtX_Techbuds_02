import React, { useState, useEffect, useContext, createContext } from "react";
import axios from "axios";

// Creating the TeamContext
const TeamContext = createContext();

// TeamProvider Component
export const TeamProvider = ({ children }) => {
  // State variables
  const [team, setTeam] = useState([]); // Stores selected players
  const [budget, setBudget] = useState(9000000); // Rs. 9,000,000 budget
  const [totalPoints, setTotalPoints] = useState(0); // Total points (only if full team is created)
  const [players, setPlayers] = useState([]); // Stores players from API

  // Fetch players from API when component mounts
  useEffect(() => {
    axios.get("http://localhost:8080/players/getPlayersByPrice  this is for the price")
      .then(response => setPlayers(response.data))
      .catch(error => console.error("Error fetching players:", error));
  }, []); // Dependency array added to run effect only once

  // Function to add a player to the team
  const addPlayer = (player) => {
    if (team.length >= 11) return alert("Team is already full!!");
    if (team.some(p => p.id === player.id)) return alert("Player already in team");
    if (budget - player.price < 0) return alert("Not enough budget");

    setTeam([...team, player]); // Adds player to the team
    setBudget(budget - player.price); // Deducts price of player from budget
  };

  // Function to remove a player from the team
  const removePlayer = (playerId) => {
    const removedPlayer = team.find((player) => player.id === playerId);
    if (!removedPlayer) return;

    setTeam(team.filter(p => p.id !== playerId));
    setBudget(budget + removedPlayer.price); // Refunds budget when player is removed
  };

  // Calculate total points only when the team is complete (11 players)
  useEffect(() => {
    if (team.length === 11) {
      const points = team.reduce((acc, player) => acc + player.points, 0);
      setTotalPoints(points);
    } else {
      setTotalPoints(0);
    }
  }, [team]); // This runs whenever the team changes

  return (
    <TeamContext.Provider value={{ team, budget, totalPoints, players, addPlayer, removePlayer }}>
      {children}
    </TeamContext.Provider>
  );
};

// Custom hook to use the team context in other components
export const useTeam = () => useContext(TeamContext);

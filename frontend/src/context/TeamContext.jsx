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
    axios
      .get("http://localhost:8080/players/getPlayersByPrice")
      .then((response) => {
        console.log(response.data)
        const processedPlayers = response.data.map((player) => ({
          ...player,
          points: calculatePlayerPoints(player),
        }));

        setPlayers(processedPlayers);
      })
      .catch((error) => console.error("Error fetching players:", error));
  }, []); // Dependency array added to run effect only once

  const calculatePlayerPoints = (player) => {
    let points = 0;
  
    // 🏏 Batting Points
    points += player.totalRuns; // 1 point per run
  
    // Strike Rate Bonus (if faced at least 30 balls)
    if (player.ballsFaced > 30) {
      points += (player.totalRuns / player.ballsFaced) * 10;
    }
  
    // Half-century & Century Bonuses
    if (player.totalRuns >= 100) {
      points += 20; // Century Bonus
    } else if (player.totalRuns >= 50) {
      points += 10; // Half-century Bonus
    }
  
    // 🎯 Bowling Points
    points += player.wickets * 25; // 25 points per wicket
  
    // Economy Rate Bonus (If they bowled at least 5 overs)
    if (player.oversBowled >= 5) {
      let economyRate = player.runsConceded / player.oversBowled;
      if (economyRate < 3.5) {
        points += 5;
      }
    }
  
    // 🏆 Hat-trick Bonus (3 wickets in an innings)
    if (player.wickets >= 3) {
      points += 30;
    }
  
    return Math.round(points); // Ensure integer points
  };
  

  // Function to add a player to the team
  const addPlayer = (player) => {
    if (team.length >= 11) return alert("Team is already full!!");
    if (team.some((p) => p.id === player.id))
      return alert("Player already in team");
    if (budget - player.price < 0) return alert("Not enough budget");

    // setTeam(prevTeam => [...prevTeam, player]);
    setTeam((prevTeam) => {
      const newTeam = [...prevTeam, player];
      console.log("✅ New Team After Adding:", newTeam);  // ✅ Debugging Line
      return newTeam;
    });
    
    setBudget(budget - player.price); // Deducts price of player from budget

    alert(`✅ ${player.name} has been added to your team!`);
  };

  // Function to remove a player from the team
  const removePlayer = (playerId) => {
    const removedPlayer = team.find((player) => player.id === playerId);
    if (!removedPlayer) return;

    setTeam(team.filter((p) => p.id !== playerId));
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
    <TeamContext.Provider
      value={{ team, budget, totalPoints, players, addPlayer, removePlayer }}
    >
      {children}
    </TeamContext.Provider>
  );
};

// Custom hook to use the team context in other components
export const useTeam = () => useContext(TeamContext);

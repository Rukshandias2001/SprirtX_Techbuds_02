import React, { useState, useEffect, useContext, createContext } from "react";
import axios from "axios";

const TeamContext = createContext();

export const TeamProvider = ({ children }) => {
  const [team, setTeam] = useState([]); // Stores selected players
  const [budget, setBudget] = useState(9000000); // Rs. 9,000,000 budget
  const [totalPoints, setTotalPoints] = useState(0); // Total points
  const [players, setPlayers] = useState([]); // Stores players from API

  useEffect(() => {
    axios
      .get("http://localhost:8080/players/getPlayersByPrice")
      .then((response) => {
        console.log("📢 Fetched Players:", response.data);
        const processedPlayers = response.data.map((player) => ({
          ...player,
          points: calculatePlayerPoints(player),
        }));
        setPlayers(processedPlayers);
      })
      .catch((error) => console.error(" Error fetching players:", error));
  }, []);

  // Calculate Points for a Player
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

  const addPlayer = async (player) => {

   const userId = localStorage.getItem("userId") || "67cd525ad5bcd10c89be8519";


    if (!userId) {
      alert("User ID not found! Please log in again.");
      return;
    }

    if (team.length >= 11) {
      alert("You cannot select more than 11 players!");
      return;
    }

    if (team.some((p) => String(p.id) === String(player.id))) {
      alert("Player is already in your team!");
      return;
    }

    if (budget - player.price < 0) {
      alert("Not enough budget!");
      return;
    }

    try {
      await axios.get(
        `http://localhost:8080/editUser/addPlayer?userId=${userId}&id=${player.id}&price=${player.price}`
      );
     

      setTeam((prevTeam) => [...prevTeam, player]);
      setBudget((prevBudget) => prevBudget - player.price); // Deduct budget
      alert(`${player.name} has been added to your team!`);
    } catch (error) {
      console.error("❌ Error adding player:", error);
      alert("❌ Failed to add player. Try again.");
    }
  };

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (!userId) return;

    axios
      .get(`http://localhost:8080/editUser/getUser?userId=${userId}`)
      .then((response) => {
        console.log("📢 Fetched team from DB:", response.data);

        if (!response.data || !response.data.listOfPlayers) {
          console.error("❌ No players found in DB response!");
          return;
        }

        const playerIds = response.data.listOfPlayers; // Array of player IDs
        if (!Array.isArray(playerIds) || playerIds.length === 0) {
          console.error("❌ Invalid data format for players!");
          return;
        }

        axios
          .get(
            `http://localhost:8080/editUser/getPlayers?listOfIds=${playerIds.join(
              ","
            )}`
          )
          .then((playerResponse) => {
            console.log("📢 Player details from DB:", playerResponse.data);
            setTeam(playerResponse.data); // ✅ Set fetched players
          })
          .catch((error) =>
            console.error("❌ Error fetching player details:", error)
          );
      })
      .catch((error) =>
        console.error("❌ Error fetching team from DB:", error)
      );
  }, []);

  const removePlayer = async (playerId) => {
    const SelectedPlayer = players.find((p) => p.id === playerId);

    const userId = localStorage.getItem("userId");

    if (!userId) {
      alert("User ID not found! Please log in again.");
      return;
    }

    console.log("📢 Current Team:", team);
    console.log("📢 Trying to remove Player ID:", playerId);

    const playerToRemove = team.find((p) => String(p.id) === String(playerId));

    console.log("📢 Found Player:", playerToRemove);

    if (!playerToRemove) {
      alert("❌ Player not found in your team!");
      return;
    }

    try {
      console.log(userId);
      console.log(playerId);
      console.log("--------------------");
      console.log(playerToRemove.price);
      // ✅ Send DELETE request to remove the player
      await axios.delete(
        `http://localhost:8080/editUser/deletePlayer?userId=${userId}&id=${playerId}&price=${SelectedPlayer.price}`
      );

      // ✅ Remove from the UI
      setTeam((prevTeam) =>
        prevTeam.filter((p) => String(p.id) !== String(playerId))
      );
      setBudget((prevBudget) => prevBudget + playerToRemove.price ||0); // Restore budget
   
      alert(`❌ ${playerToRemove.name} has been removed from your team.`);

      
    } catch (error) {
      console.error("❌ Error removing player:", error);
      alert("❌ Failed to remove player. Try again.");
    }
  };

  useEffect(() => {
    if (team.length === 11) {
      const points = team.reduce((acc, player) => acc + player.points, 0);
      setTotalPoints(points);
    } else {
      setTotalPoints(0);
    }
  }, [team]);

  return (
    <TeamContext.Provider
      value={{
        team,
        budget,
        totalPoints,
        players,
        addPlayer,
        removePlayer,
        setTeam,
      }}
    >
      {children}
    </TeamContext.Provider>
  );
};

export const useTeam = () => useContext(TeamContext);

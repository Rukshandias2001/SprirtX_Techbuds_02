import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/Leaderboard.css";

export default function Leaderboard() {
  const [players, setPlayers] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const playersPerPage = 5;

  useEffect(() => {
    const fetchLeaderBoard = async () => {
      try {
        const response = await axios.get("http://localhost:8080/players/LeaderBoard");
        const sortedData = response.data.sort((a, b) => b.points - a.points);
        setPlayers(sortedData);
      } catch (error) {
        console.error("Error fetching leaderboard:", error);
      }
    };

    fetchLeaderBoard();
  }, []);

  // Search logic
  const filteredPlayers = players.filter((player) =>
    player.playerName.toLowerCase().includes(search.toLowerCase())
  );

  // Detect if a search is active
  const isSearching = search.trim().length > 0;

  // Separate the top 3 players for the victory stand (only when not searching)
  const victoryStandPlayers = isSearching ? [] : filteredPlayers.slice(0, 3);

  // Regular players (rank 4 and below or all when searching)
  const regularPlayers = isSearching ? filteredPlayers : filteredPlayers.slice(3);

  // Pagination Logic (only applies if not searching)
  const indexOfLastPlayer = currentPage * playersPerPage;
  const indexOfFirstPlayer = indexOfLastPlayer - playersPerPage;
  const currentRegularPlayers = isSearching ? regularPlayers : regularPlayers.slice(indexOfFirstPlayer, indexOfLastPlayer);

  const totalPages = Math.ceil(regularPlayers.length / playersPerPage);

  return (
    <div className="leaderboard">
      <div className="leaderboard-container">
        <h1 className="title">🏆 Leaderboard 🏆</h1>

        {/* Search Bar (Always Visible) */}
        <div className="search-container">
          <input
            type="text"
            placeholder="Search player..."
            className="search-bar"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1); // Reset to first page on search
            }}
          />
        </div>

        {/* Show "No results found" when search has no matches */}
        {isSearching && filteredPlayers.length === 0 ? (
          <div className="no-results">No results found.</div>
        ) : (
          <>
            {/* Victory Stand (Only when not searching) */}
            {!isSearching && currentPage === 1 && (
              <div className="victory-stand">
                {victoryStandPlayers.map((player, index) => (
                  <div key={player.id} className={`player-card rank-${index + 1}`}>
                    <span className="rank">{index + 1}</span>
                    <div className="player-info">
                      <span className="name">{player.playerName}</span>
                      <span className="score">{player.points} pts</span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Regular Players (or search results) */}
            <div className="regular-players">
              {currentRegularPlayers.map((player, index) => (
                <div key={player.id} className="player-card">
                  <span className="rank">{index + (isSearching ? 1 : 4 + (currentPage - 1) * playersPerPage)}</span>
                  <div className="player-info">
                    <span className="name">{player.playerName}</span>
                    <span className="score">{player.points} pts</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination (Only show when not searching) */}
            {!isSearching && totalPages > 1 && (
              <div className="pagination">
                <button
                  onClick={() => setCurrentPage(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  ◀ Prev
                </button>
                <span>
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  onClick={() => setCurrentPage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  Next ▶
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

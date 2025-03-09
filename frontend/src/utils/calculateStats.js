// 🏏 Batting Strike Rate = (Total Runs / Balls Faced) × 100
export const calculateBattingStrikeRate = (totalRuns, ballsFaced) => {
  if (!totalRuns || !ballsFaced || ballsFaced === 0) return "Not Available";
  return ((totalRuns / ballsFaced) * 100).toFixed(2);
};

// 🏏 Batting Average = Total Runs / Innings Played
export const calculateBattingAverage = (totalRuns, inningsPlayed) => {
  if (!totalRuns || !inningsPlayed || inningsPlayed === 0) return "Not Available";
  return (totalRuns / inningsPlayed).toFixed(2);
};

// 🏏 Bowling Strike Rate = Total Balls Bowled / Total Wickets Taken
export const calculateBowlingStrikeRate = (ballsBowled, wickets) => {
  if (!ballsBowled || ballsBowled === 0) return "Not Available";
  if (!wickets || wickets === 0) return "Not Available"; 
  return (ballsBowled / wickets).toFixed(2);
};

// 🏏 Economy Rate = (Runs Conceded / Balls Bowled) × 6
export const calculateEconomyRate = (runsConceded, ballsBowled) => {
  if (!runsConceded || runsConceded === 0) return "Not Available";
  if (!ballsBowled || ballsBowled === 0) return "Not Available"; 
  return ((runsConceded / ballsBowled) * 6).toFixed(2);
};

// 🏆 Player Points Formula
export const calculatePlayerPoints = (player) => {
  const battingStrikeRate = calculateBattingStrikeRate(player["Total Runs"] || 0, player["Balls Faced"] || 0);
  const battingAverage = calculateBattingAverage(player["Total Runs"] || 0, player["Innings Played"] || 0);
  const bowlingStrikeRate = calculateBowlingStrikeRate(player["Balls Bowled"] || 0, player.Wickets || 0);
  const economyRate = calculateEconomyRate(player["Runs Conceded"] || 0, player["Balls Bowled"] || 0);

  return (
    (battingStrikeRate !== "Not Available" ? battingStrikeRate / 5 : 0) + 
    (battingAverage !== "Not Available" ? battingAverage * 0.8 : 0) +
    (bowlingStrikeRate !== "Not Available" ? 500 / bowlingStrikeRate : 0) + 
    (economyRate !== "Not Available" ? 140 / economyRate : 0) 
  ).toFixed(2);
};

// 💰 Player Value = (9 × Points + 100) × 1000 → Rounded to the nearest 50,000
export const calculatePlayerValue = (playerPoints) => {
  const rawValue = (9 * playerPoints + 100) * 1000;
  return Math.round(rawValue / 50000) * 50000; 
};

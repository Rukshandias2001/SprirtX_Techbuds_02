import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { TeamProvider } from "./context/TeamContext";
import Leaderboard from "./pages/Leaderboard";
import SelectTeam from "./pages/SelectTeam";
import TeamManagement from "./pages/TeamManagement";
import BudgetPage from "./pages/Budget";
import "./App.css";


function App() {
  return (
    <>
    <TeamProvider>
      <Router>
       
        <Routes>
        <Route path="/" element={<Leaderboard />} />
          <Route path="/select-team" element={<SelectTeam />} />
          <Route path="/team" element={<TeamManagement />} />
          <Route path="/budget" element={<BudgetPage />} />
         
        </Routes>
      </Router>
    </TeamProvider>
    </>
  );
}

export default App;

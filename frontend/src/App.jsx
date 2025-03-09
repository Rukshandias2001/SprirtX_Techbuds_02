import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { TeamProvider } from "./context/TeamContext";
import Leaderboard from "./pages/Leaderboard";
import SelectTeam from "./pages/SelectTeam";
import TeamManagement from "./pages/TeamManagement";
import BudgetPage from "./pages/Budget";
import Navbar from './pages/Navbar';
import Players from './pages/Players';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import PlayerDetails from './pages/PlayerDetails';
import Home from './pages/Home';

function App() {
  return (
    <>
     
      <TeamProvider>
      <Router>  
      <Navbar />
        <Routes>
        <Route path="/home" element={<Home />} />
      <Route path="/players" element={<Players />} />
      <Route path="/university/:universityName" element={<PlayerDetails />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/login" element={<Login />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/select-team" element={<SelectTeam />} />
          <Route path="/team" element={<TeamManagement />} />
          <Route path="/budget" element={<BudgetPage />} />
          <Route path="/" element={<Home />} />
     

        </Routes>
        </Router>
      </TeamProvider>
   
    </>
  );
}

export default App;

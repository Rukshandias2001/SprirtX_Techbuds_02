import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Leaderboard from "./pages/Leaderboard";
import "./App.css";

function App() {
  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<Leaderboard />} />
      </Routes>
      </Router>
    </>
  );
}

export default App;

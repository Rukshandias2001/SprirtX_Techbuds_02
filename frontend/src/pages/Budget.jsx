import React from "react";
import { useTeam } from "../context/TeamContext";
import "../styles/Budget.css";

export default function Budget() {
  const { team, budget } = useTeam();

  const totalBudget = 9000000; // Rs. 9,000,000
  const spentBudget = totalBudget - budget;
  
  return (
    
      <div className="budget-page">
        <h2>💰 Budget Tracker</h2>
        <div className="budget-info">
          <p>🏦 <strong>Total Budget:</strong> Rs. {totalBudget.toLocaleString()}</p>
          <p>✅ <strong>Remaining Budget:</strong> Rs. {budget.toLocaleString()}</p>
          <p>❌ <strong>Spent Budget:</strong> Rs. {spentBudget.toLocaleString()}</p>
        </div>
      </div>
    );
    

}

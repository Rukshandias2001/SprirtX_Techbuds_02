import React from "react";
import { useTeam } from "../context/TeamContext";

export default function BudgetPage() {
  const { team, budget } = useTeam();

  const totalBudget = 9000000; // Rs. 9,000,000
  const spentBudget = totalBudget - budget;
  
  return (
    <div className="p-5">
      <h2 className="text-2xl font-bold text-gray-700">💰 Budget Tracker</h2>

      {/* Budget Info */}
      <div className="mt-4">
        <p className="text-lg">
          🏦 **Total Budget:** <span className="font-bold text-blue-600">Rs. {totalBudget.toLocaleString()}</span>
        </p>
        <p className="text-lg">
          ✅ **Remaining Budget:** <span className={`font-bold ${budget < 1000000 ? "text-red-600" : "text-green-600"}`}>
            Rs. {budget.toLocaleString()}
          </span>
        </p>
        <p className="text-lg">
          ❌ **Spent Budget:** <span className="font-bold text-yellow-600">Rs. {spentBudget.toLocaleString()}</span>
        </p>
      </div>

      {/* Show Warning if Budget is Low */}
      {budget < 1000000 && (
        <p className="text-red-500 font-bold mt-2">⚠️ Warning: Low Budget!</p>
      )}

      {/* Players Bought with Price */}
      <div className="mt-4">
        <h3 className="text-xl font-bold text-gray-600">🛒 Players Selected:</h3>
        {team.length === 0 ? (
          <p className="text-gray-500">No players added yet.</p>
        ) : (
          <ul className="mt-2">
            {team.map((player) => (
              <li key={player.id} className="border-b py-2 flex justify-between">
                <span>{player.name}</span>
                <span className="text-gray-700">Rs. {player.price.toLocaleString()}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

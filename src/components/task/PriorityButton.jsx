import React from "react";

// --- PriorityButton Component ---
const PriorityButton = ({ isPriority, togglePriority }) => (
  <button
    type="button"
    tabIndex="0"
    onClick={togglePriority}
    className={`px-4 py-2 rounded-xl text-xs font-black transition-all border-2 focus:ring-2 focus:ring-orange-500 outline-none ${
      isPriority
        ? "bg-orange-500 text-white border-orange-400 shadow-lg shadow-orange-500/40 scale-105 focus:bg-orange-600"
        : "bg-white/5 text-white/50 border-white/10 hover:border-white/30 focus:bg-white/4"
    }`}
    data-testid="new-task-priority"
  >
    {isPriority ? "Priorità Alta (P)" : "Priorità Normale (P)"}
  </button>
);

export default PriorityButton;
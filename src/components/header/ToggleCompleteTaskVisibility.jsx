import React from "react";
import { Eye, EyeOff } from "lucide-react";

const ToggleCompleteTaskVisibility = ({ showCompleted, setShowCompleted }) => {
  return (
    <button
      title={`${showCompleted ? "Hide completed tasks" : "Show completed tasks"}`}
      onClick={() => setShowCompleted(!showCompleted)}
      className={`cursor-pointer flex items-center gap-2 px-4 py-2 rounded-full border transition-all font-bold text-xs uppercase tracking-wider ${
        showCompleted
          ? "bg-white dark:bg-slate-900 border-orange-200 dark:border-slate-700 text-orange-600 dark:text-orange-500"
          : "bg-orange-500 border-orange-400 text-white shadow-lg shadow-orange-200 dark:shadow-slate-700"
      }`}
    >
      {showCompleted ? <Eye size={16} /> : <EyeOff size={16} />}
    </button>
  );
};

export default ToggleCompleteTaskVisibility;
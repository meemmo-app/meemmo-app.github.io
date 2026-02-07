import React from "react";
import { CheckCircle2 } from "lucide-react";

// --- TaskCompletionToggle Component ---
const TaskCompletionToggle = ({ completed, priority, onToggle }) => {
  const handleToggle = (e) => {
    e.stopPropagation();
    onToggle();
  };

  return (
    <div
      className="mt-1 cursor-pointer transition-transform active:scale-110"
      onClick={handleToggle}
      data-testid="task-item-complete-toggle"
    >
      {completed ? (
        <CheckCircle2 size={18} className="text-emerald-500" />
      ) : (
        <div
          className={`w-4.5 h-4.5 rounded-full border-2 transition-colors ${
            priority
              ? "border-orange-500 bg-orange-50 dark:bg-transparent shadow-sm"
              : "border-slate-200"
          }`}
        />
      )}
    </div>
  );
};

export default TaskCompletionToggle;
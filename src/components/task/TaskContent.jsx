import React from "react";
import { TagSection } from "../TagSection";

// --- TaskContent Component ---
const TaskContent = ({ task }) => {
  return (
    <div className="flex-1">
      <h3
        className={`font-bold leading-tight transition-all ${
          task.completed
            ? "line-through text-slate-400"
            : "text-slate-800 dark:text-slate-100"
        }`}
      >
        {task.title}
      </h3>
      {task.note && (
        <p className="text-xs text-slate-500 dark:text-slate-300 mt-1 line-clamp-2 italic opacity-80">
          {task.note}
        </p>
      )}
      <div className="mt-2 text-[9px]">
        <TagSection tags={task.tags} />
      </div>
    </div>
  );
};

export default TaskContent;
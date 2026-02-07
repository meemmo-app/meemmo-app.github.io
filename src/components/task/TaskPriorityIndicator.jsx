import React from "react";
import { AlertCircle } from "lucide-react";

// --- TaskPriorityIndicator Component ---
const TaskPriorityIndicator = ({ isPriority }) => {
  return isPriority ? (
    <AlertCircle size={14} className="text-orange-500 shrink-0" />
  ) : null;
};

export default TaskPriorityIndicator;
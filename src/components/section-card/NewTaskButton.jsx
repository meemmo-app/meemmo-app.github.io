import React from "react";
import { Plus } from "lucide-react";

const NewTaskButton = ({
  section,
  onAddTask,
  isFocused,
  sectionId,
}) => {
  return (
    <button
      onClick={(e) => {
        e.stopPropagation(); // Prevent card onFocus trigger
        onAddTask(sectionId);
      }}
      data-testid="create-new-task-button"
      className={`
        cursor-pointer p-3 rounded-full transition-all active:scale-90 shadow-sm hover:opacity-90
        ${isFocused ? "text-white hover:text-white" : ""}
      `}
      style={{
        backgroundColor: isFocused ? section.color : `${section.color}20`, // 20 for 12% opacity
        color: isFocused ? "white" : section.color,
      }}
    >
      <Plus size={18} strokeWidth={3} />
    </button>
  );
};

export default NewTaskButton;
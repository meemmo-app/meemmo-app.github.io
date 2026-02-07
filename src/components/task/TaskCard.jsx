import React from "react";
import { motion } from "framer-motion";
import TaskCompletionToggle from "./TaskCompletionToggle";
import TaskContent from "./TaskContent";
import TaskPriorityIndicator from "./TaskPriorityIndicator";

// --- CONSTANTS ---
const appleSpring = {
  type: "spring",
  stiffness: 200,
  damping: 25,
  mass: 0.8,
};

// --- TaskCard Component ---
const TaskCard = ({
  task,
  isFocused,
  isOpen,
  onDragStart,
  onEdit,
  onDelete,
  onToggle,
  onSwipeOpen,
  onSwipeClose,
  onContextMenu,
  setSwipeState,
  innerRef,
}) => {
  return (
    <motion.div
      ref={innerRef}
      draggable={!isOpen}
      onDragStart={(e) => {
        if (isOpen) setSwipeState(false);
        onDragStart(e, task.id);
      }}
      animate={{ x: isOpen ? -110 : 0 }}
      transition={appleSpring}
      dragConstraints={{ left: -100, right: 0 }}
      onDoubleClick={() => onEdit(task)}
      onContextMenu={onContextMenu}
      onDragEnd={(_, info) =>
        info.offset.x < -40 ? onSwipeOpen() : onSwipeClose()
      }
      onClick={() => isOpen && onSwipeClose()}
      className={`relative p-4 transition-all duration-200 cursor-grab active:cursor-grabbing z-10
        ${task.completed ? "bg-slate-100 dark:bg-slate-800" : "bg-white dark:bg-slate-700 shadow-sm border border-slate-100 dark:border-slate-600"}
        ${isFocused ? "translate-x-1 ring-2 ring-orange-200 dark:ring-orange-200/50 border-orange-300 dark:border-orange-300/50" : ""}`}
    >
      <div className="flex gap-3">
        <TaskCompletionToggle
          completed={task.completed}
          priority={task.priority}
          onToggle={() => onToggle(task.id)}
        />
        <TaskContent task={task} />
        <TaskPriorityIndicator isPriority={!task.completed && task.priority} />
      </div>

      <div className="absolute right-1 top-1/2 -translate-y-1/2 w-1 h-8 bg-slate-100 dark:bg-slate-800 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
    </motion.div>
  );
};

export default TaskCard;
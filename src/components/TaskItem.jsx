// --- IMPORTS ---
import React, { useState } from "react";
import { motion, useAnimation } from "framer-motion";
import { CheckCircle2, AlertCircle } from "lucide-react";
import { TaskActions } from "./TaskActions";
import { TagSection } from "./TagSection";

// --- CONSTANTS ---
const appleSpring = {
  type: "spring",
  stiffness: 200,
  damping: 25,
  mass: 0.8,
};

// --- TaskPriorityIndicator Component ---
const TaskPriorityIndicator = ({ isPriority }) => {
  return isPriority ? (
    <AlertCircle size={14} className="text-orange-500 shrink-0" />
  ) : null;
};

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

// --- Main TaskItem Component ---
export const TaskItem = ({
  task,
  isFocused,
  onToggle,
  onDelete,
  onEdit,
  onDragStart,
  innerRef,
}) => {
  const controls = useAnimation();
  const [isOpen, setIsOpen] = useState(false);

  const openSwipe = () => {
    controls.start({ x: -100 });
    setIsOpen(true);
  };

  const closeSwipe = () => {
    controls.start({ x: 0 });
    setIsOpen(false);
  };

  const handleContextMenu = (e) => {
    e.preventDefault();
    setIsOpen(!isOpen);
  };

  return (
    <div
      className="relative overflow-hidden rounded-2xl mb-2 group select-none"
      data-testid={`task-item-${task.title}`}
    >
      {isOpen && (
        <TaskActions
          task={task}
          onCloseSwipe={closeSwipe}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      )}
      <TaskCard
        task={task}
        isFocused={isFocused}
        isOpen={isOpen}
        onDragStart={onDragStart}
        onEdit={onEdit}
        onDelete={onDelete}
        onToggle={onToggle}
        onSwipeOpen={openSwipe}
        onSwipeClose={closeSwipe}
        onContextMenu={handleContextMenu}
        setSwipeState={setIsOpen}
        innerRef={innerRef}
      />
    </div>
  );
};

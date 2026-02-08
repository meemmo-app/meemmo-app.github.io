import React, { useState } from "react";
import { motion, useAnimation, AnimatePresence } from "framer-motion";
import TaskActions from "./TaskActions";
import TaskCard from "./TaskCard";

// --- Main TaskItem Component ---
const TaskItem = ({
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
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      transition={{
        duration: 0.35,
      }}
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
    </motion.div>
  );
};

export default TaskItem;

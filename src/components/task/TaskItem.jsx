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
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.8, y: 0 }}
        transition={{
          type: "spring",
          stiffness: 400,
          damping: 30,
          mass: 0.8,
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
    </AnimatePresence>
  );
};

export default TaskItem;

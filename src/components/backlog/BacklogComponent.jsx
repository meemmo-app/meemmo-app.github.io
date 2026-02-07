import React from "react";
import TaskItem from "../task/TaskItem";
import BacklogDrawer from "./BacklogDrawer";
import BacklogIcon from "./BacklogIcon";

const BacklogComponent = ({
  isOpen,
  onClose,
  toggleComplete,
  handleEditOpen,
  requestDelete,
  onDragStart,
  taskRefs,
  handleBacklogDrop,
  handleBacklogDragOver,
  handleBacklogDragLeave,
  isBacklogOver,
  openBacklog,
  backlogTasks,
}) => {
  return (
    <>
      {/* Backlog Icon */}
      <BacklogIcon
        onDrop={handleBacklogDrop}
        onDragOver={handleBacklogDragOver}
        onDragLeave={handleBacklogDragLeave}
        isOver={isBacklogOver}
        onClick={openBacklog}
        count={backlogTasks.length}
      />

      {/* Backlog Drawer */}
      <BacklogDrawer isOpen={isOpen} onClose={onClose}>
        {backlogTasks.map((task) => {
          return (
            <TaskItem
              key={task.id}
              task={task}
              isFocused={false}
              onToggle={toggleComplete}
              onEdit={handleEditOpen}
              onDelete={requestDelete}
              onDragStart={onDragStart}
              innerRef={(el) => (taskRefs.current[task.id] = el)}
            />
          );
        })}
      </BacklogDrawer>
    </>
  );
};

export default BacklogComponent;

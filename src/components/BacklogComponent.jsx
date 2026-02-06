import React from 'react';
import { TaskItem } from '../components/TaskItem';
import Backlog, { BacklogIcon } from './Backlog';

const BacklogComponent = ({ 
  isOpen, 
  onClose, 
  tasks, 
  selectedTag, 
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
  backlogTasks
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
      <Backlog
        isOpen={isOpen}
        onClose={onClose}
        onDrop={handleBacklogDrop}
        onDragOver={handleBacklogDragOver}
        onDragLeave={handleBacklogDragLeave}
        isOver={isBacklogOver}
      >
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
      </Backlog>
    </>
  );
};

export default BacklogComponent;
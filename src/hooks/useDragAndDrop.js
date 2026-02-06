import { useState } from 'react';

export const useDragAndDrop = (tasks, setTasks, moveTask) => {
  const [isBacklogOver, setIsBacklogOver] = useState(false);
  
  const onDragStart = (e, id) => {
    e.dataTransfer.setData("taskId", id);
  };

  const onDrop = (e, sectionId) => {
    const id = e.dataTransfer.getData("taskId");
    if (sectionId === "backlog") {
      // Move task to backlog by setting sectionId to null
      setTasks((prev) =>
        prev.map((task) =>
          task.id === id ? { ...task, sectionId: null } : task,
        ),
      );
    } else {
      moveTask(id, sectionId);
    }
  };

  // Handle backlog drag and drop
  const handleBacklogDrop = (e) => {
    e.preventDefault();
    setIsBacklogOver(false);

    const id = e.dataTransfer.getData("taskId");
    // Move task to backlog by setting sectionId to null
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, sectionId: null } : task,
      ),
    );
  };

  const handleBacklogDragOver = (e) => {
    e.preventDefault();
    setIsBacklogOver(true);
  };

  const handleBacklogDragLeave = () => {
    setIsBacklogOver(false);
  };

  // Handle drop from sections to backlog icon
  const handleIconDrop = (e) => {
    e.preventDefault();
    setIsBacklogOver(false);

    const id = e.dataTransfer.getData("taskId");
    // Move task to backlog by setting sectionId to null
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, sectionId: null } : task,
      ),
    );
  };

  return {
    onDragStart,
    onDrop,
    handleBacklogDrop,
    handleBacklogDragOver,
    handleBacklogDragLeave,
    handleIconDrop,
    isBacklogOver,
    setIsBacklogOver
  };
};
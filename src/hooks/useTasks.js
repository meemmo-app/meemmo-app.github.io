import { useState, useEffect } from "react";

export function useTasks() {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("meemmo-tasks");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("meemmo-tasks", JSON.stringify(tasks));
  }, [tasks]);

  const createTask = (newTask, sectionId) => {
    const task = {
      ...newTask,
      id: Date.now().toString(),
      sectionId,
      completed: false,
      createdAt: new Date().toISOString(),
    };
    setTasks((prev) => [...prev, task]);
  };

  const deleteTask = (id) =>
    setTasks((prev) => prev.filter((t) => t.id !== id));

  const toggleComplete = (id) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)),
    );
  };

  const moveTask = (id, sectionId) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, sectionId } : t)),
    );
  };

  return { tasks, createTask, deleteTask, toggleComplete, moveTask };
}

import { useState, useEffect } from "react";
import confetti from "canvas-confetti";

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
      prev.map((t) => {
        if (t.id === id) {
          // Spariamo i coriandoli solo se il task sta per essere completato
          if (!t.completed) {
            confetti({
              particleCount: 60,
              spread: 70,
              origin: { y: 1.2 },
              colors: ["#ff6347", "#ffa500", "#ffffff"],
              zIndex: 9999, // Assicura che siano sopra le modali
            });
          }
          return { ...t, completed: !t.completed };
        }
        return t;
      }),
    );
  };

  const moveTask = (id, sectionId) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, sectionId } : t)),
    );
  };

  return { tasks, createTask, deleteTask, toggleComplete, moveTask, setTasks };
}

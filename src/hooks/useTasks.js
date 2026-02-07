import { useState, useEffect } from "react";
import confetti from "canvas-confetti";

export function useTasks() {
  // Ensure each task can have tags (array of strings)

  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("meemmo-tasks");
    return saved ? JSON.parse(saved) : [];
  });

  // Track total tasks ever completed
  const [totalEverCompletedTasks, setTotalEverCompletedTasks] = useState(() => {
    const saved = localStorage.getItem("meemmo-total-completed-tasks");
    return saved ? parseInt(saved, 10) : 0;
  });

  useEffect(() => {
    localStorage.setItem("meemmo-tasks", JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem(
      "meemmo-total-completed-tasks",
      totalEverCompletedTasks.toString(),
    );
  }, [totalEverCompletedTasks]);

  const createTask = (newTask, sectionId) => {
    // Ensure tags array exists and extract tags from title and note
    const extractTags = (text) => {
      const tagRegex = /#(\w+)/g;
      const tags = [];
      let clean = text.replace(tagRegex, (match, p1) => {
        tags.push(p1.toLowerCase());
        return "";
      });
      return { clean: clean.trim(), tags };
    };
    const titleResult = extractTags(newTask.title || "");
    const noteResult = extractTags(newTask.note || "");
    const combinedTags = [...titleResult.tags, ...noteResult.tags];
    const task = {
      ...newTask,
      title: titleResult.clean,
      note: noteResult.clean,
      tags: combinedTags,
      id: Date.now().toString(),
      sectionId,
      completed: false,
      createdAt: new Date().toISOString(),
    };
    setTasks((prev) => [...prev, task]);
    return;
  };

  const deleteTask = (id) =>
    setTasks((prev) => prev.filter((t) => t.id !== id));

  const deleteCompletedTasks = () => {
    setTasks((prev) => prev.filter((t) => t.completed == false));
  };

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

            // Increment the total completed tasks counter
            let newCount = totalEverCompletedTasks + 1;
            setTotalEverCompletedTasks(newCount);
          } else {
            // Decrement the total completed tasks counter
            let newCount = totalEverCompletedTasks - 1;
            setTotalEverCompletedTasks(newCount);
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

  return {
    tasks,
    totalEverCompletedTasks,
    createTask,
    deleteTask,
    toggleComplete,
    moveTask,
    setTasks,
    deleteCompletedTasks,
  };
}

import { useState, useEffect } from "react";
import confetti from "canvas-confetti";

export function useTasks() {
  // Ensure each task can have tags (array of strings)

  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("meemmo-tasks");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("meemmo-tasks", JSON.stringify(tasks));
  }, [tasks]);

  const createTask = (newTask, sectionId) => {
    // Ensure tags array exists and extract tags from title and note
    const extractTags = (text) => {
      const tagRegex = /#(\w+)/g;
      const tags = [];
      let clean = text.replace(tagRegex, (match, p1) => {
        tags.push(p1);
        return "";
      });
      return { clean: clean.trim(), tags };
    };
    const titleResult = extractTags(newTask.title || "");
    const noteResult = extractTags(newTask.note || "");
    const combinedTags = [...titleResult.tags, ...noteResult.tags];
    console.log("TAGS: " + combinedTags);
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
    createTask,
    deleteTask,
    toggleComplete,
    moveTask,
    setTasks,
    deleteCompletedTasks,
  };
}

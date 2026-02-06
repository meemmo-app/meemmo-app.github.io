import { useState } from 'react';

export const useTaskOperations = (createTask, deleteTask) => {
  const [newTask, setNewTask] = useState({
    title: "",
    note: "",
    priority: false,
    tags: [],
  });
  const [editingTask, setEditingTask] = useState(null);

  const handleEditOpen = (task) => {
    setEditingTask(task);
  };

  // Funzione per salvare le modifiche (nell'hook useTasks o App)
  const handleUpdateTask = (updatedData, sectionId) => {
    let oldTags = updatedData.tags;
    deleteTask(updatedData.id);
    // Inject old tags to be parsed along with new ones
    if (oldTags && oldTags.length > 0) {
      updatedData.note = updatedData.note + " #" + oldTags.join(" #");
    }
    createTask(updatedData, sectionId);
    setEditingTask(null);
  };

  // Gestione Salvataggio Task (wrapper per l'hook)
  const handleCreateTask = (voiceTask = null, forcedSectionId = null, activeSectionId = null) => {
    const taskToSave = voiceTask || newTask;

    if (!taskToSave.title.trim()) {
      // Se il titolo è vuoto, apriamo la modale invece di creare un task fantasma
      return false; // Indicate that modal should be opened
    }

    // Priorità: 1. ID forzato dal pulsante, 2. ID dalla voce, 3. Sezione attiva
    let targetSectionId = forcedSectionId || voiceTask?.sectionId || activeSectionId;

    // Ensure we always have a valid sectionId, default to active section if none provided
    if (!targetSectionId) {
      targetSectionId = activeSectionId;
    }

    createTask(taskToSave, targetSectionId);

    setNewTask({ title: "", note: "", priority: false });
    return true; // Indicate that task was created
  };

  return {
    newTask,
    setNewTask,
    editingTask,
    setEditingTask,
    handleEditOpen,
    handleUpdateTask,
    handleCreateTask
  };
};
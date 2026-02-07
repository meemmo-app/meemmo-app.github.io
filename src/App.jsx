import React, { useState, useEffect, useRef } from "react";
import { Settings, Keyboard, Eye, EyeOff } from "lucide-react";

// Hook e Costanti
import { useTasks } from "./hooks/useTasks";
import { useSections } from "./hooks/useSections";
import { ACCENT_COLOR } from "./constants/sections";
import { useExperimental } from "./hooks/useExperimental";

// Componenti
import { TaskModal } from "./components/TaskModal";
import { Dialog } from "./components/ui/Dialog";
import { FooterNav } from "./components/footerNav";
import SettingsModal from "./components/settings/SettingsModal";
import Header from "./components/header/Header";
import { ConfirmModal } from "./components/ConfirmModal";
import MainGrid from "./components/MainGrid";
import BacklogComponent from "./components/BacklogComponent";
import { useKeyboardShortcuts } from "./hooks/useKeyboardShortcuts";
import { useDragAndDrop } from "./hooks/useDragAndDrop";
import { useTaskOperations } from "./hooks/useTaskOperations";
import { useTheme } from "./hooks/useTheme";

export default function App() {
  // Logic & State da Hook personalizzato
  const {
    tasks,
    createTask,
    toggleComplete,
    moveTask,
    setTasks,
    deleteCompletedTasks,
    deleteTask,
    totalEverCompletedTasks,
  } = useTasks();

  const {
    sections,
    setSections,
    getActiveSectionId,
    sectionCount,
    isDynamicColumns,
    setIsDynamicColumns,
    resetSectionColor,
  } = useSections();

  const { experimental, getSpriteExperimental, setSpriteExperimental } =
    useExperimental();

  const { theme, setTheme } = useTheme();

  // State UI locale
  const [activeQuarterIndex, setActiveQuarterIndex] = useState(0);
  const [focusedTaskIndex, setFocusedTaskIndex] = useState(-1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [showCompleted, setShowCompleted] = useState(true);
  const [selectedTag, setSelectedTag] = useState(null);
  const [isBacklogOpen, setIsBacklogOpen] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);

  const {
    newTask,
    setNewTask,
    editingTask,
    setEditingTask,
    handleEditOpen,
    handleUpdateTask,
    handleCreateTask,
  } = useTaskOperations(createTask, deleteTask);

  const {
    onDragStart,
    onDrop,
    handleBacklogDrop,
    handleBacklogDragOver,
    handleBacklogDragLeave,
    handleIconDrop,
    isBacklogOver,
    setIsBacklogOver,
  } = useDragAndDrop(tasks, setTasks, moveTask);

  const taskRefs = useRef({});
  const currentSectionId = getActiveSectionId();

  // Inizializzazione sezione attiva al caricamento
  useEffect(() => {
    const index = sections.findIndex((s) => s.id === currentSectionId);
    setActiveQuarterIndex(index !== -1 ? index : 0);
  }, [sections, currentSectionId]);

  // Gestione scroll automatico quando cambia focusedTaskIndex
  useEffect(() => {
    if (focusedTaskIndex !== -1) {
      const currentSectionId = sections[activeQuarterIndex].id;
      const filteredTasks = tasks.filter(
        (t) =>
          t.sectionId === currentSectionId && (showCompleted || !t.completed),
      );
      const targetTask = filteredTasks[focusedTaskIndex];

      if (targetTask && taskRefs.current[targetTask.id]) {
        taskRefs.current[targetTask.id].scrollIntoView({
          behavior: "smooth",
          block: "nearest",
        });
      }
    }
  }, [focusedTaskIndex, activeQuarterIndex, tasks, sections, showCompleted]);

  // Use keyboard shortcuts hook
  useKeyboardShortcuts({
    isModalOpen,
    isSettingsOpen,
    tasks,
    sections,
    activeQuarterIndex,
    sectionCount,
    showCompleted,
    focusedTaskIndex,
    setActiveQuarterIndex,
    setFocusedTaskIndex,
    setIsModalOpen,
    setIsSettingsOpen,
    requestDelete: (id) => setTaskToDelete(id),
    toggleComplete,
    handleEditOpen: (task) => {
      setEditingTask(task);
      setIsModalOpen(true);
    },
  });

  // Filter tasks that are in backlog (sectionId is null or undefined)
  const backlogTasks = tasks.filter(
    (task) =>
      task.sectionId === null &&
      (!selectedTag || (task.tags && task.tags.includes(selectedTag))),
  );

  const openBacklog = () => {
    setIsBacklogOpen(true);
  };

  const closeBacklog = () => {
    setIsBacklogOpen(false);
  };

  // Questa funzione ora si limita ad aprire la modale di conferma
  const requestDelete = (id) => {
    setTaskToDelete(id);
  };

  // Questa è la funzione che esegue l'eliminazione effettiva
  const confirmDelete = () => {
    if (taskToDelete) {
      setTasks((prev) => prev.filter((t) => t.id !== taskToDelete));
      setTaskToDelete(null); // Chiude la modale
    }
  };

  const getAllTags = () => {
    // flatMap estrae tutti i tag e crea un unico array piatto
    // Se t.tags è undefined, ritorniamo un array vuoto [] per evitare errori
    const allTags = tasks.flatMap((t) => t.tags || []);
    // Set rimuove i duplicati, poi convertiamo di nuovo in array
    const uniq = [...new Set(allTags)];
    return uniq;
  };

  return (
    <div className="min-h-screen bg-[#fff9f5] dark:bg-slate-900 text-slate-900 dark:text-slate-50 font-sans selection:bg-orange-200 ">
      {/* Header */}
      <Header
        selectedTag={selectedTag}
        setSelectedTag={setSelectedTag}
        allTags={getAllTags}
        ACCENT_COLOR={ACCENT_COLOR}
        showCompleted={showCompleted}
        setShowCompleted={setShowCompleted}
        setIsSettingsModalOpen={setIsSettingsOpen}
        deleteCompletedTasks={deleteCompletedTasks}
        completedTasksCount={totalEverCompletedTasks}
        mascotteExperimental={getSpriteExperimental()}
      ></Header>

      {/* Main Grid */}
      <MainGrid
        sections={sections}
        tasks={tasks}
        activeQuarterIndex={activeQuarterIndex}
        showCompleted={showCompleted}
        selectedTag={selectedTag}
        setActiveQuarterIndex={setActiveQuarterIndex}
        setIsModalOpen={setIsModalOpen}
        toggleComplete={toggleComplete}
        handleEditOpen={(task) => {
          setEditingTask(task);
          setIsModalOpen(true);
        }}
        requestDelete={requestDelete}
        onDragStart={onDragStart}
        onDrop={onDrop}
        isDynamicColumns={isDynamicColumns}
        currentSectionId={currentSectionId}
        taskRefs={taskRefs}
        focusedTaskIndex={focusedTaskIndex}
      />

      {/* Footer Nav */}
      <FooterNav
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        isSettingsOpen={isSettingsOpen}
        isBacklogOpen={isBacklogOpen}
        handleCreateTask={(voiceTask = null, forcedSectionId = null) => {
          const result = handleCreateTask(
            voiceTask,
            forcedSectionId,
            sections[activeQuarterIndex].id,
          );
          if (result) {
            setIsModalOpen(false); // Close modal after successful creation
          } else {
            setIsModalOpen(true);
          }
        }}
        setNewTask={setNewTask}
        newTask={newTask}
      ></FooterNav>

      {/* Backlog Component */}
      <BacklogComponent
        isOpen={isBacklogOpen}
        onClose={closeBacklog}
        tasks={tasks}
        selectedTag={selectedTag}
        toggleComplete={toggleComplete}
        handleEditOpen={(task) => {
          setEditingTask(task);
          setIsModalOpen(true);
        }}
        requestDelete={requestDelete}
        onDragStart={onDragStart}
        taskRefs={taskRefs}
        handleBacklogDrop={handleBacklogDrop}
        handleBacklogDragOver={handleBacklogDragOver}
        handleBacklogDragLeave={handleBacklogDragLeave}
        isBacklogOver={isBacklogOver}
        openBacklog={openBacklog}
        backlogTasks={backlogTasks}
      />

      {/* Modale */}
      <Dialog
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingTask(null);
        }}
      >
        <TaskModal
          // Se stiamo modificando, passiamo editingTask, altrimenti il nuovo task vuoto
          title={editingTask ? "Modifica Task" : "Cosa bolle in pentola?"}
          newTask={editingTask || newTask}
          setNewTask={editingTask ? setEditingTask : setNewTask}
          editingTask={editingTask}
          onSave={
            editingTask
              ? () =>
                  handleUpdateTask(editingTask, sections[activeQuarterIndex].id)
              : (voiceTask = null, forcedSectionId = null) => {
                  const result = handleCreateTask(
                    voiceTask,
                    forcedSectionId,
                    sections[activeQuarterIndex].id,
                  );
                  if (result) {
                    setIsModalOpen(false); // Close modal after successful creation
                  } else {
                    setIsModalOpen(true); // Keep modal open if task wasn't created due to empty title
                  }
                }
          }
          sectionLabel={sections[activeQuarterIndex].label}
          onClose={() => {
            setIsModalOpen(false);
            setEditingTask(null);
          }}
          spriteExperimental={getSpriteExperimental()}
        />
      </Dialog>
      {/* Settings Modal */}
      <Dialog isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)}>
        <SettingsModal
          sections={sections}
          setSections={setSections}
          isDynamicColumns={isDynamicColumns}
          setIsDynamicColumns={setIsDynamicColumns}
          onClose={() => setIsSettingsOpen(false)}
          activeQuarterIndex={activeQuarterIndex}
          setActiveQuarterIndex={setActiveQuarterIndex}
          getSpriteExperimental={getSpriteExperimental}
          setSpriteExperimental={setSpriteExperimental}
          resetSectionColor={resetSectionColor}
          theme={theme}
          setTheme={setTheme}
        />
      </Dialog>
      {/* Modale di Conferma Eliminazione */}
      <Dialog isOpen={!!taskToDelete} onClose={() => setTaskToDelete(null)}>
        <ConfirmModal
          title="Elimina Task?"
          message="Questa azione è irreversibile. Non potrai più recuperare questa missione!"
          onConfirm={confirmDelete}
          onCancel={() => setTaskToDelete(null)}
          confirmLabel="Sì, elimina"
        />
      </Dialog>
    </div>
  );
}

import React, { useState, useEffect, useCallback, useRef } from "react";
import { Settings, Keyboard, Eye, EyeOff } from "lucide-react";

// Hook e Costanti
import { useTasks } from "./hooks/useTasks";
import { useSections } from "./hooks/useSections";
import { ACCENT_COLOR } from "./constants/sections";

// Componenti
import { SectionCard } from "./components/SectionCard";
import { TaskItem } from "./components/TaskItem";
import { TaskModal } from "./components/TaskModal";
import { Dialog } from "./components/ui/Dialog";
import { FooterNav } from "./components/footerNav";
import { SettingsModal } from "./components/SettingsModal";
import { Header } from "./components/Header";

export default function App() {
  // Logic & State da Hook personalizzato
  const { tasks, createTask, deleteTask, toggleComplete, moveTask, setTasks } =
    useTasks();

  const {
    sections,
    setSections,
    getActiveSectionId,
    sectionCount,
    isDynamicColumns,
    setIsDynamicColumns,
  } = useSections();

  // State UI locale
  const [activeQuarterIndex, setActiveQuarterIndex] = useState(0);
  const [focusedTaskIndex, setFocusedTaskIndex] = useState(-1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [showCompleted, setShowCompleted] = useState(true);
  const [newTask, setNewTask] = useState({
    title: "",
    note: "",
    priority: false,
  });
  const [editingTask, setEditingTask] = useState(null);

  const handleEditOpen = (task) => {
    setEditingTask(task);
    setIsModalOpen(true);
  };
  // Funzione per salvare le modifiche (nell'hook useTasks o App)
  const updateTask = (updatedData) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === editingTask.id ? { ...t, ...updatedData } : t)),
    );
    setIsModalOpen(false);
    setEditingTask(null);
  };

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
      return;
    }
  });

  // Gestione Salvataggio Task (wrapper per l'hook)
  const handleCreateTask = () => {
    if (!newTask.title.trim()) {
      console.log(
        "WARN Task not created, the title was empty: " + newTask.title,
      );
      return;
    }
    createTask(newTask, sections[activeQuarterIndex].id);
    console.log("Created the task " + newTask.title);
    setNewTask({ title: "", note: "", priority: false });
    setIsModalOpen(false);
  };

  // Drag and Drop
  const onDragStart = (e, id) => {
    e.dataTransfer.setData("taskId", id);
  };

  const onDrop = (e, sectionId) => {
    const id = e.dataTransfer.getData("taskId");
    moveTask(id, sectionId);
  };

  // Keyboard Shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (isModalOpen) {
        if (
          (e.key === "p" || e.key === "P") &&
          document.activeElement.tagName !== "INPUT" &&
          document.activeElement.tagName !== "TEXTAREA"
        ) {
          setNewTask((prev) => ({ ...prev, priority: !prev.priority }));
        }
        if (e.key === "Escape") {
          e.stopPropagation();
          setIsModalOpen(false);
        }
        return;
      }

      if (isSettingsOpen) {
        if (e.key === "Escape") {
          e.stopPropagation();
          setIsSettingsOpen(false);
        }
        return;
      }

      const visibleTasks = tasks.filter(
        (t) =>
          t.sectionId === sections[activeQuarterIndex].id &&
          (showCompleted || !t.completed),
      );

      switch (e.key.toLowerCase()) {
        case " ":
          e.preventDefault();
          setIsModalOpen(true);
          break;
        case "h":
          setActiveQuarterIndex((prev) => (prev > 0 ? prev - 1 : sectionCount));
          setFocusedTaskIndex(-1);
          break;
        case "l":
          setActiveQuarterIndex((prev) => (prev < sectionCount ? prev + 1 : 0));
          setFocusedTaskIndex(-1);
          break;
        case "j":
          if (visibleTasks.length > 0) {
            setFocusedTaskIndex((prev) =>
              prev < visibleTasks.length - 1 ? prev + 1 : 0,
            );
          }
          break;
        case "k":
          if (visibleTasks.length > 0) {
            setFocusedTaskIndex((prev) =>
              prev > 0 ? prev - 1 : visibleTasks.length - 1,
            );
          }
          break;
        case "x":
          if (focusedTaskIndex !== -1 && visibleTasks[focusedTaskIndex]) {
            deleteTask(visibleTasks[focusedTaskIndex].id);
            setFocusedTaskIndex(-1);
          }
          break;
        case "d":
          if (focusedTaskIndex !== -1 && visibleTasks[focusedTaskIndex]) {
            toggleComplete(visibleTasks[focusedTaskIndex].id);
          }
          break;
        case "m":
          if (visibleTasks[focusedTaskIndex]) {
            handleEditOpen(visibleTasks[focusedTaskIndex]);
          }
          break;
        default:
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  });

  return (
    <div className="min-h-screen bg-[#fff9f5] text-slate-900 font-sans selection:bg-orange-200">
      {/* Header */}
      <Header
        ACCENT_COLOR={ACCENT_COLOR}
        showCompleted={showCompleted}
        setShowCompleted={setShowCompleted}
        isSettingsModalOpen={isSettingsOpen}
        setIsSettingsModalOpen={setIsSettingsOpen}
      ></Header>

      {/* Main Grid */}
      {/*<main className="max-w-7xl mx-auto p-4 md:p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 h-[calc(100vh-160px)]"> */}
      <main className="max-w-7xl mx-auto p-4 md:p-6 flex flex-col md:flex-row overflow-x-scroll gap-6 h-[calc(100vh-160px)]">
        {sections.map((section, idx) => {
          const isFocused = activeQuarterIndex === idx;
          const sectionTasks = tasks.filter(
            (t) =>
              t.sectionId === section.id && (showCompleted || !t.completed),
          );

          return (
            <SectionCard
              key={section.id}
              section={section}
              isFocused={isFocused}
              isCurrentTime={section.id === currentSectionId}
              onFocus={() => setActiveQuarterIndex(idx)}
              onDrop={(e) => onDrop(e, section.id)}
              isDynamicColumns={isDynamicColumns}
              taskCounter={sectionTasks.length}
            >
              {sectionTasks.map((task, tIdx) => (
                <TaskItem
                  key={task.id}
                  task={task}
                  isFocused={isFocused && focusedTaskIndex === tIdx}
                  onToggle={toggleComplete}
                  onEdit={handleEditOpen}
                  onDelete={deleteTask}
                  onDragStart={onDragStart}
                  innerRef={(el) => (taskRefs.current[task.id] = el)}
                />
              ))}
            </SectionCard>
          );
        })}
      </main>

      {/* Footer Nav */}
      <FooterNav
        isModalOpen={isModalOpen}
        isSettingsOpen={isSettingsOpen}
      ></FooterNav>

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
          newTask={editingTask || newTask}
          setNewTask={editingTask ? setEditingTask : setNewTask}
          onSave={
            editingTask ? () => updateTask(editingTask) : handleCreateTask
          }
          sectionLabel={
            editingTask ? "Modifica Task" : sections[activeQuarterIndex].label
          }
          onClose={() => {
            setIsModalOpen(false);
            setEditingTask(null);
          }}
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
        />
      </Dialog>
    </div>
  );
}

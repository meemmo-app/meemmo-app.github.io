import React, { useState, useEffect, useCallback, useRef } from "react";
import { Plus, Keyboard, Eye, EyeOff } from "lucide-react";

// Hook e Costanti
import { useTasks } from "./hooks/useTasks";
import {
  SECTIONS,
  ACCENT_COLOR,
  getActiveSectionId,
} from "./constants/sections";

// Componenti
import { SectionCard } from "./components/SectionCard";
import { TaskItem } from "./components/TaskItem";
import { TaskModal } from "./components/TaskModal";
import { Dialog } from "./components/ui/Dialog";
import { FooterNav } from "./components/footerNav";

export default function App() {
  // Logic & State da Hook personalizzato
  const { tasks, createTask, deleteTask, toggleComplete, moveTask } =
    useTasks();

  // State UI locale
  const [activeQuarterIndex, setActiveQuarterIndex] = useState(0);
  const [focusedTaskIndex, setFocusedTaskIndex] = useState(-1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showCompleted, setShowCompleted] = useState(true);
  const [newTask, setNewTask] = useState({
    title: "",
    note: "",
    priority: false,
  });

  const taskRefs = useRef({});
  const currentSectionId = getActiveSectionId();

  // Inizializzazione sezione attiva al caricamento
  useEffect(() => {
    const index = SECTIONS.findIndex((s) => s.id === currentSectionId);
    setActiveQuarterIndex(index !== -1 ? index : 0);
  }, [currentSectionId]);

  // Gestione scroll automatico quando cambia focusedTaskIndex
  useEffect(() => {
    if (focusedTaskIndex !== -1) {
      const currentSectionId = SECTIONS[activeQuarterIndex].id;
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
    createTask(newTask, SECTIONS[activeQuarterIndex].id);
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
        if (e.key === "Escape") setIsModalOpen(false);
        return;
      }

      const visibleTasks = tasks.filter(
        (t) =>
          t.sectionId === SECTIONS[activeQuarterIndex].id &&
          (showCompleted || !t.completed),
      );

      switch (e.key.toLowerCase()) {
        case " ":
          e.preventDefault();
          setIsModalOpen(true);
          break;
        case "h":
          setActiveQuarterIndex((prev) => (prev > 0 ? prev - 1 : 3));
          setFocusedTaskIndex(-1);
          break;
        case "l":
          setActiveQuarterIndex((prev) => (prev < 3 ? prev + 1 : 0));
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
        default:
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isModalOpen, activeQuarterIndex, focusedTaskIndex, tasks, showCompleted]);

  return (
    <div className="min-h-screen bg-[#fff9f5] text-slate-900 font-sans selection:bg-orange-200">
      {/* Header */}
      <header className="p-6 flex justify-between items-center max-w-7xl mx-auto">
        <div className="flex items-center gap-3">
          <div className="bg-white p-2 rounded-2xl shadow-sm border border-orange-100 rotate-12 text-3xl">
            🦐
          </div>
          <div>
            <h1
              className="text-3xl font-black tracking-tight"
              style={{ color: ACCENT_COLOR }}
            >
              MEEMMO
            </h1>
            <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">
              Organizza la giornata del gambero
            </p>
          </div>
        </div>

        <div className="flex gap-3 items-center">
          <button
            onClick={() => setShowCompleted(!showCompleted)}
            className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-all font-bold text-xs uppercase tracking-wider ${
              showCompleted
                ? "bg-white border-orange-200 text-orange-600"
                : "bg-orange-500 text-white shadow-lg shadow-orange-200"
            }`}
          >
            {showCompleted ? <Eye size={14} /> : <EyeOff size={14} />}
            {showCompleted ? "Nascondi completati" : "Mostra completati"}
          </button>
          <div className="hidden md:flex items-center gap-2 bg-white p-2 px-4 rounded-full shadow-sm border border-slate-100 text-xs text-slate-400 font-bold uppercase">
            <Keyboard size={14} /> Scorciatoie attive
          </div>
        </div>
      </header>

      {/* Main Grid */}
      <main className="max-w-7xl mx-auto p-4 md:p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 h-[calc(100vh-160px)]">
        {SECTIONS.map((section, idx) => {
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
            >
              {sectionTasks.map((task, tIdx) => (
                <TaskItem
                  key={task.id}
                  task={task}
                  isFocused={isFocused && focusedTaskIndex === tIdx}
                  onToggle={toggleComplete}
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
      <FooterNav></FooterNav>

      {/* Modale */}
      <Dialog isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <TaskModal
          newTask={newTask}
          setNewTask={setNewTask}
          onSave={handleCreateTask}
          sectionLabel={SECTIONS[activeQuarterIndex].label}
        />
      </Dialog>
    </div>
  );
}

import React, { useState, useEffect, useCallback, useRef } from "react";
import {
  Plus,
  Clock,
  Trash2,
  CheckCircle2,
  AlertCircle,
  Keyboard,
  Eye,
  EyeOff,
  Layout,
} from "lucide-react";

// --- Costanti e Utility ---
const SECTIONS = [
  { id: "morning-1", label: "Prima Mattina", hours: [6, 7, 8, 9, 10, 11] },
  { id: "morning-2", label: "Tarda Mattina", hours: [12, 13, 14] },
  { id: "afternoon-1", label: "Pomeriggio", hours: [15, 16, 17, 18] },
  {
    id: "afternoon-2",
    label: "Sera",
    hours: [19, 20, 21, 22, 23, 0, 1, 2, 3, 4, 5],
  },
];

const ACCENT_COLOR = "#ff6347"; // Shrimp Orange

const getActiveSectionId = () => {
  const hour = new Date().getHours();
  const section = SECTIONS.find((s) => s.hours.includes(hour));
  return section ? section.id : "morning-1";
};

// --- Componenti UI Mini ---
const Dialog = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden animate-in zoom-in duration-200">
        {children}
      </div>
    </div>
  );
};

// --- Main App ---
export default function App() {
  const [tasks, setTasks] = useState(() => {
    // Questa funzione viene eseguita SOLO al primo avvio
    const saved = localStorage.getItem("meemmo-tasks");
    return saved ? JSON.parse(saved) : [];
  });
  const [activeQuarterIndex, setActiveQuarterIndex] = useState(0);
  const [focusedTaskIndex, setFocusedTaskIndex] = useState(-1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showCompleted, setShowCompleted] = useState(true);
  const [newTask, setNewTask] = useState({
    title: "",
    note: "",
    priority: false,
  });
  const [draggedTaskId, setDraggedTaskId] = useState(null);

  // Ref per lo scrolling automatico
  const taskRefs = useRef({});

  // Caricamento Iniziale
  useEffect(() => {
    // Ora qui gestisci solo la sezione attiva, non caricare più i task!
    const currentId = getActiveSectionId();
    const index = SECTIONS.findIndex((s) => s.id === currentId);
    setActiveQuarterIndex(index !== -1 ? index : 0);
  }, []);

  // Salvataggio
  useEffect(() => {
    localStorage.setItem("meemmo-tasks", JSON.stringify(tasks));
  }, [tasks]);

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
    }
  }, [focusedTaskIndex, activeQuarterIndex, showCompleted]);

  // Gestione Scorciatoie da Tastiera
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (isModalOpen) {
        if (e.key === "Enter" && !e.shiftKey) {
          e.preventDefault();
          createTask();
        }
        if (e.key === "p" || e.key === "P") {
          if (
            document.activeElement.tagName !== "INPUT" &&
            document.activeElement.tagName !== "TEXTAREA"
          ) {
            setNewTask((prev) => ({ ...prev, priority: !prev.priority }));
          }
        }
        if (e.key === "Escape") setIsModalOpen(false);
        return;
      }

      const currentSectionId = SECTIONS[activeQuarterIndex].id;
      // Filtriamo i task in base alla visibilità dei completati
      const visibleSectionTasks = tasks.filter(
        (t) =>
          t.sectionId === currentSectionId && (showCompleted || !t.completed),
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
          if (visibleSectionTasks.length > 0) {
            setFocusedTaskIndex((prev) =>
              prev < visibleSectionTasks.length - 1 ? prev + 1 : 0,
            );
          }
          break;
        case "k":
          if (visibleSectionTasks.length > 0) {
            setFocusedTaskIndex((prev) =>
              prev > 0 ? prev - 1 : visibleSectionTasks.length - 1,
            );
          }
          break;
        case "x":
          if (
            focusedTaskIndex !== -1 &&
            visibleSectionTasks[focusedTaskIndex]
          ) {
            deleteTask(visibleSectionTasks[focusedTaskIndex].id);
          }
          break;
        case "d":
          if (
            focusedTaskIndex !== -1 &&
            visibleSectionTasks[focusedTaskIndex]
          ) {
            toggleComplete(visibleSectionTasks[focusedTaskIndex].id);
          }
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [
    isModalOpen,
    activeQuarterIndex,
    focusedTaskIndex,
    tasks,
    newTask,
    showCompleted,
  ]);

  const createTask = () => {
    if (!newTask.title.trim()) return;
    const task = {
      ...newTask,
      id: Date.now().toString(),
      sectionId: SECTIONS[activeQuarterIndex].id,
      completed: false,
      createdAt: new Date().toISOString(),
    };
    setTasks((prev) => [...prev, task]);
    setNewTask({ title: "", note: "", priority: false });
    setIsModalOpen(false);
  };

  const deleteTask = (id) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
    setFocusedTaskIndex(-1);
  };

  const toggleComplete = (id) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)),
    );
  };

  const onDragStart = (e, id) => {
    setDraggedTaskId(id);
    e.dataTransfer.setData("taskId", id);
  };

  const onDrop = (e, sectionId) => {
    const id = e.dataTransfer.getData("taskId");
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, sectionId } : t)),
    );
    setDraggedTaskId(null);
  };

  return (
    <div className="min-h-screen bg-[#fff9f5] text-slate-900 font-sans selection:bg-orange-200">
      {/*
      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
        body { font-family: 'Plus Jakarta Sans', sans-serif; }
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #ffd8cc; border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #ffc2b3; }
      `}} />
    */}

      {/* Header */}
      <header className="p-6 flex justify-between items-center max-w-7xl mx-auto">
        <div className="flex items-center gap-3">
          <div className="bg-white p-2 rounded-2xl shadow-sm border border-orange-100 rotate-12">
            <span className="text-3xl">🦐</span>
          </div>
          <div>
            <h1 className="text-3xl font-black tracking-tight flex items-center gap-2">
              <span style={{ color: ACCENT_COLOR }}>MEEMMO</span>
            </h1>
            <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">
              Organizza la giornata del gambero
            </p>
          </div>
        </div>

        <div className="flex gap-3 items-center">
          <button
            onClick={() => setShowCompleted(!showCompleted)}
            className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-all font-bold text-xs uppercase tracking-wider ${showCompleted ? "bg-white border-orange-200 text-orange-600" : "bg-orange-500 border-orange-600 text-white shadow-lg shadow-orange-200"}`}
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
          const isCurrentTime = section.id === getActiveSectionId();
          const sectionTasks = tasks.filter(
            (t) =>
              t.sectionId === section.id && (showCompleted || !t.completed),
          );

          return (
            <div
              key={section.id}
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => onDrop(e, section.id)}
              onClick={() => setActiveQuarterIndex(idx)}
              className={`
                relative flex flex-col rounded-[2.5rem] transition-all duration-500 overflow-hidden cursor-pointer
                ${isFocused ? "ring-4 scale-[1.02] shadow-2xl z-10" : "ring-1 ring-slate-200 opacity-80 scale-100"}
                ${isCurrentTime ? "bg-white" : "bg-slate-50/50"}
              `}
              style={{ borderColor: isFocused ? ACCENT_COLOR : "transparent" }}
            >
              {/* Section Header */}
              <div
                className={`p-6 flex items-center justify-between ${isCurrentTime ? "bg-orange-50/50" : ""}`}
              >
                <div>
                  <h2
                    className={`text-xl font-bold ${isFocused ? "text-orange-600" : "text-slate-700"}`}
                  >
                    {section.label}
                  </h2>
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1">
                    <Clock size={12} /> {section.hours[0]}:00 -{" "}
                    {section.hours[section.hours.length - 1]}:59
                  </span>
                </div>
                {isCurrentTime && (
                  <span className="bg-orange-500 text-white text-[10px] px-2 py-1 rounded-full font-black animate-pulse">
                    ORA
                  </span>
                )}
              </div>

              {/* Task List */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar scroll-smooth">
                {sectionTasks.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-slate-300 opacity-50 space-y-2">
                    <Layout size={40} strokeWidth={1} />
                    <p className="text-sm font-medium italic">Nessun task 🦐</p>
                  </div>
                ) : (
                  sectionTasks.map((task, tIdx) => (
                    <div
                      key={task.id}
                      ref={(el) => (taskRefs.current[task.id] = el)}
                      draggable
                      onDragStart={(e) => onDragStart(e, task.id)}
                      className={`
                        group relative p-4 rounded-2xl transition-all duration-200 cursor-grab active:cursor-grabbing
                        ${task.completed ? "bg-slate-100 opacity-60" : "bg-white shadow-sm border border-slate-100"}
                        ${isFocused && focusedTaskIndex === tIdx ? "translate-x-1 ring-2 ring-orange-200 border-orange-300" : ""}
                      `}
                    >
                      <div className="flex gap-3">
                        <div className="mt-1">
                          {task.completed ? (
                            <CheckCircle2
                              size={18}
                              className="text-emerald-500"
                            />
                          ) : (
                            <div
                              className={`w-[18px] h-[18px] rounded-full border-2 ${task.priority ? "border-orange-500 bg-orange-50" : "border-slate-200"}`}
                            />
                          )}
                        </div>
                        <div className="flex-1">
                          <h3
                            className={`font-bold leading-tight ${task.completed ? "line-through text-slate-400" : "text-slate-800"}`}
                          >
                            {task.title}
                          </h3>
                          {task.note && (
                            <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                              {task.note}
                            </p>
                          )}
                        </div>
                        {task.priority && !task.completed && (
                          <AlertCircle size={14} className="text-orange-500" />
                        )}
                      </div>

                      {/* Hover Actions */}
                      <div className="absolute right-2 top-2 hidden group-hover:flex gap-1">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            deleteTask(task.id);
                          }}
                          className="p-1 hover:text-red-500 transition-colors"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          );
        })}
      </main>

      {/* Footer Nav */}
      <footer className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-slate-900 text-white px-6 py-3 rounded-full shadow-2xl flex gap-6 text-xs font-medium z-40 border border-slate-700 whitespace-nowrap">
        <div className="flex gap-2 items-center">
          <span className="bg-slate-700 px-1.5 py-0.5 rounded text-[10px] font-bold">
            SPACE
          </span>{" "}
          Crea 🦐
        </div>
        <div className="flex gap-2 items-center">
          <span className="bg-slate-700 px-1.5 py-0.5 rounded text-[10px] font-bold text-orange-400">
            H/L
          </span>{" "}
          Quarti
        </div>
        <div className="flex gap-2 items-center">
          <span className="bg-slate-700 px-1.5 py-0.5 rounded text-[10px] font-bold">
            J/K
          </span>{" "}
          Task
        </div>
        <div className="flex gap-2 items-center">
          <span className="bg-slate-700 px-1.5 py-0.5 rounded text-[10px] font-bold text-red-400">
            X
          </span>{" "}
          Elimina
        </div>
      </footer>

      {/* Modale */}
      <Dialog isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className="p-8 relative">
          <div className="absolute top-8 right-8 text-4xl animate-bounce">
            🦐
          </div>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-black text-slate-800 tracking-tight">
              Cosa bolle in pentola?
            </h2>
          </div>
          <p className="text-xs font-bold text-slate-400 mb-4 uppercase">
            Aggiunta a:{" "}
            <span className="text-orange-500">
              {SECTIONS[activeQuarterIndex].label}
            </span>
          </p>
          <div className="space-y-4">
            <div className="relative">
              <input
                autoFocus
                className="w-full text-xl font-bold bg-slate-50 border-none rounded-2xl p-4 focus:ring-2 focus:ring-orange-500 outline-none placeholder:text-slate-300"
                placeholder="Titolo della missione..."
                value={newTask.title}
                onChange={(e) =>
                  setNewTask((prev) => ({ ...prev, title: e.target.value }))
                }
              />
            </div>
            <textarea
              className="w-full bg-slate-50 border-none rounded-2xl p-4 focus:ring-2 focus:ring-orange-500 outline-none placeholder:text-slate-300 resize-none h-24"
              placeholder="Note del gambero..."
              value={newTask.note}
              onChange={(e) =>
                setNewTask((prev) => ({ ...prev, note: e.target.value }))
              }
            />
            <div className="flex items-center justify-between p-2">
              <div className="flex items-center gap-2">
                <button
                  onClick={() =>
                    setNewTask((prev) => ({
                      ...prev,
                      priority: !prev.priority,
                    }))
                  }
                  className={`px-4 py-2 rounded-xl text-xs font-black transition-all ${newTask.priority ? "bg-orange-500 text-white" : "bg-slate-100 text-slate-400"}`}
                >
                  {newTask.priority ? "PRIORITÀ ALTA" : "PRIORITÀ NORMALE (P)"}
                </button>
              </div>
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter">
                Premi INVIO per salvare
              </span>
            </div>
            <button
              onClick={createTask}
              className="w-full py-4 bg-orange-500 hover:bg-orange-600 text-white rounded-2xl font-black text-lg transition-all shadow-lg shadow-orange-200 active:scale-[0.98]"
            >
              SALVA TASK 🦐
            </button>
          </div>
        </div>
      </Dialog>
    </div>
  );
}

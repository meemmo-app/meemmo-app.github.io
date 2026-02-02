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
import { ConfirmModal } from "./components/ConfirmModal";
import Backlog, { BacklogIcon } from "./components/Backlog";

export default function App() {
  // Logic & State da Hook personalizzato
  const {
    tasks,
    createTask,
    toggleComplete,
    moveTask,
    setTasks,
    deleteCompletedTasks,
  } = useTasks();

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
    tags: [],
  });
  const [editingTask, setEditingTask] = useState(null);
  const [selectedTag, setSelectedTag] = useState(null);

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
  const handleCreateTask = (voiceTask = null) => {
    // Se passiamo un voiceTask usiamo quello, altrimenti usiamo lo stato newTask
    const taskToSave = voiceTask || newTask;

    if (!taskToSave.title.trim()) {
      console.log("WARN Task not created, title empty");
      return;
    }

    // Usiamo la sezione attiva
    const targetSectionId = sections[activeQuarterIndex].id;

    createTask(taskToSave, targetSectionId);

    console.log("Created task:", taskToSave.title);

    // Reset e chiusura
    setNewTask({ title: "", note: "", priority: false });
    setIsModalOpen(false);
  };

  // Drag and Drop
  const onDragStart = (e, id) => {
    e.dataTransfer.setData("taskId", id);
  };

  /*
  const onDrop = (e, sectionId) => {
    const id = e.dataTransfer.getData("taskId");
    moveTask(id, sectionId);
  };*/

  const [taskToDelete, setTaskToDelete] = useState(null);

  // Backlog state and logic
  const [isBacklogOpen, setIsBacklogOpen] = useState(false);
  const [isBacklogOver, setIsBacklogOver] = useState(false);

  // Filter tasks that are in backlog (sectionId is null or undefined)
  const backlogTasks = tasks.filter((task) => task.sectionId === null);

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

  const openBacklog = () => {
    setIsBacklogOpen(true);
  };

  const closeBacklog = () => {
    setIsBacklogOpen(false);
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

    // Open backlog after drop
    //setIsBacklogOpen(true);
  };

  // Update onDrop function to handle both section and backlog drops
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

  // Keyboard Shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (isModalOpen) {
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
        case "arrowleft":
          setActiveQuarterIndex((prev) => (prev > 0 ? prev - 1 : sectionCount));
          setFocusedTaskIndex(-1);
          break;
        case "l":
        case "arrowright":
          setActiveQuarterIndex((prev) => (prev < sectionCount ? prev + 1 : 0));
          setFocusedTaskIndex(-1);
          break;
        case "j":
        case "arrowdown":
          if (visibleTasks.length > 0) {
            setFocusedTaskIndex((prev) =>
              prev < visibleTasks.length - 1 ? prev + 1 : 0,
            );
          }
          break;
        case "k":
        case "arrowup":
          if (visibleTasks.length > 0) {
            setFocusedTaskIndex((prev) =>
              prev > 0 ? prev - 1 : visibleTasks.length - 1,
            );
          }
          break;
        case "x":
          if (focusedTaskIndex !== -1 && visibleTasks[focusedTaskIndex]) {
            requestDelete(visibleTasks[focusedTaskIndex].id);
            setFocusedTaskIndex(-1);
          }
          break;
        case "d":
          if (focusedTaskIndex !== -1 && visibleTasks[focusedTaskIndex]) {
            toggleComplete(visibleTasks[focusedTaskIndex].id);
          }
          break;
        case "e":
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

  const getAllTagsOld = () => {
    let fetched = new Set();
    tasks.map((t) => {
      if (t.tags && t.tags.length > 0) {
        if (t.tags.length > 1) {
          t.tags.map((tag) => {
            fetched.add(tag);
          });
        } else {
          fetched.add(t.tags);
        }
      }
    });
    let uniq = [...fetched];
    console.log("FETCHED FROM GET ALL TAGS " + uniq);
    return uniq;
  };
  const getAllTags = () => {
    // flatMap estrae tutti i tag e crea un unico array piatto
    // Se t.tags è undefined, ritorniamo un array vuoto [] per evitare errori
    const allTags = tasks.flatMap((t) => t.tags || []);

    // Set rimuove i duplicati, poi convertiamo di nuovo in array
    const uniq = [...new Set(allTags)];

    console.log("FETCHED FROM GET ALL TAGS:", uniq);
    return uniq;
  };

  return (
    <div className="min-h-screen bg-[#fff9f5] text-slate-900 font-sans selection:bg-orange-200">
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
      ></Header>

      {/* Main Grid */}
      {/*<main className="max-w-7xl mx-auto p-4 md:p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 h-[calc(100vh-160px)]"> */}
      <main className="max-w-7xl mx-auto p-4 md:p-6 flex flex-col md:flex-row overflow-x-scroll gap-6 h-[calc(100vh-160px)]">
        {sections.map((section, idx) => {
          const isFocused = activeQuarterIndex === idx;
          const sectionTasks = tasks.filter((t) => {
            // 1. Filtro per sezione
            const isInSection = t.sectionId === section.id;

            // 2. Filtro per completamento
            const matchesCompletion = showCompleted || !t.completed;

            // 3. Filtro per Tag selezionato
            // Se selectedTag non è impostato, passa sempre (true)
            // Se è impostato, controlla se t.tags esiste e include il tag
            const matchesTag =
              !selectedTag || (t.tags && t.tags.includes(selectedTag));

            return isInSection && matchesCompletion && matchesTag;
          });

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
                  onDelete={requestDelete}
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
        setIsModalOpen={setIsModalOpen}
        isSettingsOpen={isSettingsOpen}
        isBacklogOpen={isBacklogOpen}
        handleCreateTask={handleCreateTask}
        setNewTask={setNewTask}
        newTask={newTask}
      ></FooterNav>

      {/* Backlog Icon */}
      <BacklogIcon
        onDrop={handleIconDrop}
        onDragOver={handleBacklogDragOver}
        onDragLeave={handleBacklogDragLeave}
        isOver={isBacklogOver}
        onClick={openBacklog}
        count={backlogTasks.length}
      />

      {/* Backlog Drawer */}
      <Backlog
        isOpen={isBacklogOpen}
        onClose={closeBacklog}
        onDrop={handleBacklogDrop}
        onDragOver={handleBacklogDragOver}
        onDragLeave={handleBacklogDragLeave}
        isOver={isBacklogOver}
      >
        {backlogTasks.map((task) => {
          return (
            <TaskItem
              key={task.id}
              task={task}
              isFocused={false}
              onToggle={toggleComplete}
              onEdit={handleEditOpen}
              onDelete={requestDelete}
              onDragStart={onDragStart}
              innerRef={(el) => (taskRefs.current[task.id] = el)}
            />
          );
        })}
      </Backlog>

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
            editingTask ? () => updateTask(editingTask) : handleCreateTask
          }
          sectionLabel={sections[activeQuarterIndex].label}
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

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionCard from "../components/section-card/SectionCard";
import TaskItem from "../components/task/TaskItem";

const MainGrid = ({
  sections,
  tasks,
  activeQuarterIndex,
  showCompleted,
  selectedTag,
  setActiveQuarterIndex,
  setIsModalOpen,
  toggleComplete,
  handleEditOpen,
  requestDelete,
  onDragStart,
  onDrop,
  isDynamicColumns,
  currentSectionId,
  taskRefs,
  focusedTaskIndex,
}) => {
  return (
    <main className="max-w-full mx-auto p-4 md:p-6 md:px-18 flex flex-col md:flex-row overflow-x-scroll gap-6 h-[calc(100vh-160px)]">
      {sections.map((section, idx) => {
        const isFocused = activeQuarterIndex === idx;
        const sectionTasks = tasks.filter((t) => {
          // 1. Filtro per sezione
          const isInSection = t.sectionId === section.id;
          // 2. Filtro per completamento
          const matchesCompletion = showCompleted || !t.completed;
          // 3. Filtro per Tag selezionato
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
            onAddTask={() => {
              setActiveQuarterIndex(idx);
              setIsModalOpen(true);
            }}
            isCurrentTime={section.id === currentSectionId}
            onFocus={() => setActiveQuarterIndex(idx)}
            onDrop={(e) => onDrop(e, section.id)}
            isDynamicColumns={isDynamicColumns}
            taskCounter={sectionTasks.length}
          >
            <AnimatePresence>
              {sectionTasks.map((task, tIdx) => (
                <motion.div
                  key={task.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 15 }}
                  transition={{
                    duration: 0.35,
                  }}
                >
                  <TaskItem
                    task={task}
                    isFocused={isFocused && focusedTaskIndex === tIdx}
                    onToggle={toggleComplete}
                    onEdit={handleEditOpen}
                    onDelete={requestDelete}
                    onDragStart={onDragStart}
                    innerRef={(el) => (taskRefs.current[task.id] = el)}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </SectionCard>
        );
      })}
    </main>
  );
};

export default MainGrid;

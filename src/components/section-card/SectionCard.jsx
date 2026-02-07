import React from "react";
import SectionHeader from "./SectionHeader";
import SectionContent from "./SectionContent";
import NewTaskButton from "./NewTaskButton";

// Function to calculate productivity for a section
const calculateSectionProductivity = (sectionId) => {
  try {
    const tasksData = localStorage.getItem("meemmo-tasks");
    if (!tasksData) return { percentage: 0, completed: 0, total: 0 };

    const tasks = JSON.parse(tasksData);
    const sectionTasks = tasks.filter((task) => task.sectionId === sectionId);

    const totalTasks = sectionTasks.length;
    const completedTasks = sectionTasks.filter((task) => task.completed).length;

    const percentage =
      totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

    return { percentage, completed: completedTasks, total: totalTasks };
  } catch (error) {
    console.error("Error calculating productivity:", error);
    return { percentage: 0, completed: 0, total: 0 };
  }
};

const SectionCard = ({
  section,
  isFocused,
  isCurrentTime,
  children,
  onFocus,
  onDrop,
  isDynamicColumns,
  taskCounter,
  onAddTask, // Nuova prop per gestire il click sul +
}) => {
  const productivity = calculateSectionProductivity(section.id);

  return (
    <div
      onDragOver={(e) => e.preventDefault()}
      onDrop={onDrop}
      onClick={onFocus}
      data-testid={`section-${section.label}`}
      className={`
        relative flex flex-col grow min-w-3xs rounded-3xl transition-all border-slate-200 dark:border-slate-700 duration-500 overflow-hidden cursor-pointer
        ${isDynamicColumns ? "h-fit" : ""}
        ${isFocused ? "scale-[1.02] shadow-2xl shadow-slate-300 dark:shadow-slate-800" : "opacity-80 scale-100"}
      `}
      style={{
        borderWidth: isFocused ? "3px" : "1px",
        borderColor: isFocused ? section.color + "40" : "",
        borderRadius: "1.5rem", // rounded-3xl
      }}
    >
      {/* Header della Sezione */}
      <SectionHeader
        section={section}
        isFocused={isFocused}
        isCurrentTime={isCurrentTime}
        taskCounter={taskCounter}
        productivity={productivity}
      />

      {/* Lista Task (Children) */}
      <SectionContent children={children} />

      {/* Section footer */}
      <div className="cursor-default absolute bottom-0 right-0 z-20 p-3">
        <NewTaskButton
          section={section}
          onAddTask={onAddTask}
          isFocused={isFocused}
          sectionId={section.id}
        />
      </div>
    </div>
  );
};

export default SectionCard;
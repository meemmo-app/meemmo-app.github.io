import React from "react";
import { Clock, Layout, Hash, Shrimp, Plus } from "lucide-react";

const NewTaskButton = ({
  section,
  onAddTask,
  isFocused,
  sectionId,
  sectionLabel,
}) => {
  return (
    <button
      onClick={(e) => {
        e.stopPropagation(); // Prevent card onFocus trigger
        onAddTask(sectionId);
      }}
      data-testid="create-new-task-button"
      className={`
        cursor-pointer p-3 rounded-full transition-all active:scale-90 shadow-sm hover:opacity-90
        ${isFocused ? "text-white hover:text-white" : ""}
      `}
      style={{
        backgroundColor: isFocused ? section.color : `${section.color}20`, // 20 for 12% opacity
        color: isFocused ? "white" : section.color,
      }}
    >
      <Plus size={18} strokeWidth={3} />
    </button>
  );
};

const SectionHours = ({ sectionHours }) => {
  return (
    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1">
      <Clock size={12} /> {sectionHours[0]}:00 -{" "}
      {sectionHours[sectionHours.length - 1]}:59
    </span>
  );
};

const CurrentSectionMarker = ({ color }) => {
  return (
    <span
      className={`bg-orange-500 text-white text-[10px] px-2 py-1 rounded-full font-black`}
      style={{
        backgroundColor: color ? color : "",
      }}
    >
      ORA
    </span>
  );
};

const ProductivityIndicator = ({ section, percentage, completed, total }) => {
  // Create shrimp emoji visualization (5 shrimp total)
  const TOTAL_SHRIMP = 5;
  const filledShrimp = Math.round((percentage / 100) * TOTAL_SHRIMP);

  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center gap-2">
        {/* Shrimp emoji visualization */}
        <div className="flex gap-1">
          {Array.from({ length: TOTAL_SHRIMP }).map((_, index) => (
            <Shrimp
              size={14}
              className="text-gray-400"
              style={{
                color: index < filledShrimp ? section.color : undefined,
              }}
            />
          ))}
        </div>

        {/* Percentage text */}
        <span className="text-xs font-medium text-slate-500">
          {percentage}%
        </span>
      </div>
    </div>
  );
};

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

export const SectionCard = ({
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
      <div
        className={`p-6 flex items-center justify-between ${isCurrentTime ? "bg-orange-50/50 dark:bg-slate-800/50" : ""}`}
      >
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <h2
              className="text-xl inline-flex items-baseline gap-2 font-bold not-dark:text-slate-700 dark:text-slate-100"
              style={{ color: isFocused ? section.color : undefined }}
            >
              {section.label}
              <span className="inline-flex items-baseline text-lg font-normal">
                <Hash size={12} /> {taskCounter}
              </span>
            </h2>
          </div>

          <div className="flex flex-col gap-1 mt-1">
            <SectionHours sectionHours={section.hours}></SectionHours>
            <div className="flex items-center justify-between">
              <ProductivityIndicator
                section={section}
                percentage={productivity.percentage}
                completed={productivity.completed}
                total={productivity.total}
              />
            </div>
          </div>
        </div>
        {isCurrentTime && (
          <div className="ml-2">
            <CurrentSectionMarker color={section.color} />
          </div>
        )}
      </div>

      {/* Lista Task (Children) */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar scroll-smooth">
        {React.Children.count(children) === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-slate-300 opacity-50 space-y-2 py-8">
            <Layout size={40} strokeWidth={1} />
            <p className="text-sm font-medium italic">Nessun task 🦐</p>
          </div>
        ) : (
          children
        )}
      </div>

      {/* Section footer */}
      <div className="cursor-default absolute bottom-0 right-0 z-20 p-3">
        <NewTaskButton
          section={section}
          onAddTask={onAddTask}
          isFocused={isFocused}
          sectionId={section.id}
          sectionLabel={section.label}
        />
      </div>
    </div>
  );
};

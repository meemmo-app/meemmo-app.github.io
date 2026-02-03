import React from "react";
import { Clock, Layout, Hash, Shrimp } from "lucide-react";
import { ACCENT_COLOR } from "../constants/sections";

const TaskCount = ({ count }) => {
  return (
    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1">
      <Hash size={12} /> {count}
    </span>
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

const CurrentSectionMarker = () => {
  return (
    <span className="bg-orange-500 text-white text-[10px] px-2 py-1 rounded-full font-black animate-pulse">
      ORA
    </span>
  );
};

const ProductivityIndicator = ({ percentage, completed, total }) => {
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
              className={
                index < filledShrimp ? "text-orange-500" : "text-gray-400"
              }
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
}) => {
  // Calculate productivity for this section
  const productivity = calculateSectionProductivity(section.id);
  return (
    <div
      onDragOver={(e) => e.preventDefault()}
      onDrop={onDrop}
      onClick={onFocus}
      data-testid={`section-${section.label}`}
      className={`
        relative flex flex-col min-w-3xs rounded-3xl transition-all duration-500 overflow-hidden cursor-pointer
        ${isDynamicColumns ? "h-fit" : ""}
        ${isFocused ? "ring-3 scale-[1.02] shadow-2xl shadow-slate-300 z-10 ring-orange-200" : "ring-1 ring-slate-200 opacity-80 scale-100"}
      `}
      style={{ borderColor: isFocused ? ACCENT_COLOR : "transparent" }}
    >
      {/* Header della Sezione */}
      <div
        className={`p-6 flex items-center justify-between ${isCurrentTime ? "bg-orange-50/50" : ""}`}
      >
        <div>
          <h2
            className={`text-xl inline-flex items-baseline gap-2 font-bold ${isFocused ? "text-orange-600/90" : "text-slate-700"}`}
          >
            {section.label}
            <span className="inline-flex items-baseline text-lg font-normal">
              <Hash size={12} /> {taskCounter}
            </span>
          </h2>
          <div className="flex flex-col gap-1 mt-1">
            <SectionHours sectionHours={section.hours}></SectionHours>
            <div className="flex items-center justify-between">
              <ProductivityIndicator
                percentage={productivity.percentage}
                completed={productivity.completed}
                total={productivity.total}
              />
            </div>
          </div>
        </div>
        {isCurrentTime && <CurrentSectionMarker></CurrentSectionMarker>}
      </div>

      {/* Lista Task (Children) */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar scroll-smooth">
        {React.Children.count(children) === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-slate-300 opacity-50 space-y-2">
            <Layout size={40} strokeWidth={1} />
            <p className="text-sm font-medium italic">Nessun task 🦐</p>
          </div>
        ) : (
          children
        )}
      </div>
    </div>
  );
};

import React from "react";
import { Clock, Layout, Hash } from "lucide-react";
import { ACCENT_COLOR } from "../constants/sections";

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
  return (
    <div
      onDragOver={(e) => e.preventDefault()}
      onDrop={onDrop}
      onClick={onFocus}
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
            className={`text-xl font-bold ${isFocused ? "text-orange-600/90" : "text-slate-700"}`}
          >
            {section.label}
          </h2>
          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1">
            <Clock size={12} /> {section.hours[0]}:00 -{" "}
            {section.hours[section.hours.length - 1]}:59
          </span>
          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1">
            <Hash size={12} /> {taskCounter}
          </span>
        </div>
        {isCurrentTime && (
          <span className="bg-orange-500 text-white text-[10px] px-2 py-1 rounded-full font-black animate-pulse">
            ORA
          </span>
        )}
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

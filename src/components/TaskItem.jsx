import React from "react";
import { CheckCircle2, AlertCircle, Trash2 } from "lucide-react";

export const TaskItem = ({
  task,
  isFocused,
  onToggle,
  onDelete,
  onDragStart,
  innerRef,
}) => (
  <div
    ref={innerRef}
    draggable
    onDragStart={(e) => onDragStart(e, task.id)}
    className={`group relative p-4 rounded-2xl transition-all duration-200 cursor-grab active:cursor-grabbing
      ${task.completed ? "bg-slate-100 opacity-60" : "bg-white shadow-sm border border-slate-100"}
      ${isFocused ? "translate-x-1 ring-2 ring-orange-200 border-orange-300" : ""}`}
  >
    <div className="flex gap-3">
      <div
        className="mt-1 cursor-pointer"
        title="Mark the task as completed"
        onClick={() => onToggle(task.id)}
      >
        {task.completed ? (
          <CheckCircle2 size={18} className="text-emerald-500" />
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
    <button
      onClick={() => onDelete(task.id)}
      className="absolute right-2 top-2 hidden group-hover:flex p-1 hover:text-red-500"
    >
      <Trash2 size={14} />
    </button>
  </div>
);

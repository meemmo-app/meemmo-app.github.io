import React, { useState } from "react";
import { motion, useAnimation } from "framer-motion";
import { CheckCircle2, AlertCircle, Trash2, Edit3 } from "lucide-react";

export const TaskItem = ({
  task,
  isFocused,
  onToggle,
  onDelete,
  onEdit,
  onDragStart,
  innerRef,
}) => {
  const controls = useAnimation();
  const [isOpen, setIsOpen] = useState(false);

  // Azioni di scorrimento
  const openSwipe = () => {
    controls.start({ x: -100 });
    setIsOpen(true);
  };

  const closeSwipe = () => {
    controls.start({ x: 0 });
    setIsOpen(false);
  };

  // Gestione Click Destro (Desktop)
  const handleContextMenu = (e) => {
    e.preventDefault();
    setIsOpen(!isOpen);
  };

  const appleSpring = {
    type: "spring",
    stiffness: 200,
    damping: 25,
    mass: 0.8,
  };

  return (
    <div className="relative overflow-hidden rounded-2xl mb-2 group select-none">
      {/* AZIONI SOTTO LA CARD (Vetro Scuro) */}
      <div className="absolute inset-0 flex justify-end items-center gap-2 px-4 bg-white/80 backdrop-blur-sm">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onEdit(task);
            closeSwipe();
          }}
          className="p-2.5 bg-white/80 hover:bg-white text-slate-600 rounded-xl transition-all shadow-sm"
        >
          <Edit3 size={18} />
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete(task.id);
            closeSwipe();
          }}
          className="p-2.5 bg-red-500 hover:bg-red-600 text-white rounded-xl transition-all shadow-lg shadow-red-500/30"
        >
          <Trash2 size={18} />
        </button>
      </div>

      {/* CARD FRONTALE ANIMATA */}
      <motion.div
        ref={innerRef}
        draggable={!isOpen} // Disabilita drag nativo se lo swipe è aperto
        onDragStart={(e) => {
          if (isOpen) {
            setIsOpen(false); // Chiudiamo lo swipe se iniziamo a trascinare
          }
          onDragStart(e, task.id);
        }}
        onDoubleClick={() => onEdit(task)}
        onContextMenu={handleContextMenu}
        animate={{ x: isOpen ? -110 : 0 }}
        dragConstraints={{ left: -100, right: 0 }}
        onDragEnd={(_, info) => {
          if (info.offset.x < -40) openSwipe();
          else closeSwipe();
        }}
        transition={appleSpring}
        onClick={() => isOpen && closeSwipe()}
        className={`relative p-4 transition-all duration-200 cursor-grab active:cursor-grabbing z-10
          ${task.completed ? "bg-slate-100" : "bg-white shadow-sm border border-slate-100"}
          ${isFocused ? "translate-x-1 ring-2 ring-orange-200 border-orange-300" : ""}`}
      >
        <div className="flex gap-3">
          <div
            className="mt-1 cursor-pointer transition-transform active:scale-110"
            onClick={(e) => {
              e.stopPropagation();
              onToggle(task.id);
            }}
          >
            {task.completed ? (
              <CheckCircle2 size={18} className="text-emerald-500" />
            ) : (
              <div
                className={`w-4.5 h-4.5 rounded-full border-2 transition-colors ${
                  task.priority
                    ? "border-orange-500 bg-orange-50 shadow-sm"
                    : "border-slate-200"
                }`}
              />
            )}
          </div>

          <div className="flex-1">
            <h3
              className={`font-bold leading-tight transition-all ${task.completed ? "line-through text-slate-400" : "text-slate-800"}`}
            >
              {task.title}
            </h3>
            {task.note && (
              <p className="text-xs text-slate-500 mt-1 line-clamp-2 italic opacity-80">
                {task.note}
              </p>
            )}
          </div>

          {task.priority && !task.completed && (
            <AlertCircle size={14} className="text-orange-500 shrink-0" />
          )}
        </div>

        {/* Indicatore visivo del click destro/swipe (opzionale) */}
        <div className="absolute right-1 top-1/2 -translate-y-1/2 w-1 h-8 bg-slate-100 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
      </motion.div>
    </div>
  );
};

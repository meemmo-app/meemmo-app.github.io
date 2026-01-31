import React from "react";
import { X } from "lucide-react";
import { GLASSBASE } from "../constants/styles";

export const TaskModal = ({
  title,
  newTask,
  setNewTask,
  onSave,
  sectionLabel,
  onClose,
  editingTask,
}) => {
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      onSave();
    }
    if (
      (e.key === "p" || e.key === "P") &&
      document.activeElement.tagName !== "INPUT" &&
      document.activeElement.tagName !== "TEXTAREA"
    ) {
      e.preventDefault();
      setNewTask((prev) => ({ ...prev, priority: !prev.priority }));
    }
  };

  return (
    <div className={`${GLASSBASE} rounded-3xl p-8`} onKeyDown={handleKeyDown}>
      {/* Badge Gambero Animato */}
      <div className="absolute z-50 -top-5 -left-5 text-6xl animate-[bounce_3s_ease-in-out_infinite] drop-shadow-2xl">
        🦐
      </div>

      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-black text-white tracking-tight">
          {title}
        </h2>
        <button
          onClick={onClose}
          className="p-2 hover:bg-white/10 rounded-full transition-all active:scale-90 group"
        >
          <X size={22} className="text-white/60 group-hover:text-white" />
        </button>
      </div>

      <p className="text-[10px] font-black text-white/50 mb-4 uppercase tracking-widest flex items-center gap-2">
        Sezione:{" "}
        <span className="text-orange-400 bg-orange-400/10 px-2 py-0.5 rounded-md border border-orange-400/40">
          {sectionLabel}
        </span>
      </p>

      <div className="space-y-5">
        {/* Input Titolo - Contrasto Aumentato */}
        <div className="space-y-1">
          <input
            autoFocus={!editingTask}
            className="w-full text-xl font-bold bg-black/40 border border-white/10 rounded-2xl p-4 text-white focus:ring-2 focus:ring-orange-500 focus:bg-black/60 outline-none placeholder:text-white/40 transition-all shadow-inner"
            placeholder="Titolo della missione"
            value={newTask.title}
            onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
          />
        </div>

        {/* Textarea Note - Contrasto Aumentato */}
        <div className="space-y-1">
          <textarea
            className="w-full bg-black/40 border border-white/10 rounded-2xl p-4 text-white focus:ring-2 focus:ring-orange-500 focus:bg-black/60 outline-none placeholder:text-white/40 resize-none h-28 transition-all shadow-inner"
            placeholder="Aggiungi dettagli extra..."
            value={newTask.note}
            onChange={(e) => setNewTask({ ...newTask, note: e.target.value })}
          />
        </div>

        <div className="flex items-center justify-between pt-2">
          <button
            type="button"
            tabIndex="0"
            onClick={() =>
              setNewTask({ ...newTask, priority: !newTask.priority })
            }
            className={`px-4 py-2 rounded-xl text-xs font-black transition-all border-2 focus:ring-2 focus:ring-orange-500  outline-none ${
              newTask.priority
                ? "bg-orange-500 text-white border-orange-400 shadow-lg shadow-orange-500/40 scale-105 focus:bg-orange-600"
                : "bg-white/5 text-white/50 border-white/10 hover:border-white/30 focus:bg-white/4"
            }`}
          >
            {newTask.priority ? "Priorità Alta (P)" : "Priorità Normale (P)"}
          </button>
          <span className="text-xs text-white/40 font-bold uppercase tracking-tighter">
            INVIO per salvare
          </span>
        </div>

        {/* Pulsante Salva */}
        <button
          onClick={onSave}
          tabIndex="0"
          className="w-full py-5 bg-orange-500 hover:bg-orange-400 text-white rounded-2xl font-black text-xl transition-all shadow-2xl shadow-orange-500/30 focus:ring-2 focus:ring-orange-500 focus:bg-orange-600 outline-none active:scale-95 border-t border-white/20"
        >
          SALVA TASK 🦐
        </button>
      </div>
    </div>
  );
};

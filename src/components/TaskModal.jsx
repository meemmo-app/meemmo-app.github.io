import React from "react";
import { X } from "lucide-react";

export const TaskModal = ({
  newTask,
  setNewTask,
  onSave,
  sectionLabel,
  onClose,
}) => {
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      onSave();
    }
    if ((e.key === "p" || e.key === "P") && e.altKey) {
      e.preventDefault();
      setNewTask((prev) => ({ ...prev, priority: !prev.priority }));
    }
  };

  return (
    <div
      className="p-8 relative bg-slate-950/80 backdrop-blur-3xl -webkit-backdrop-blur-3xl border border-white/20 rounded-[2.5rem] shadow-[0_32px_64px_rgba(0,0,0,0.5)]
                 animate-in fade-in zoom-in-95 duration-300 ease-out"
      onKeyDown={handleKeyDown}
    >
      {/* Badge Gambero Animato */}
      <div className="absolute z-50 -top-5 -left-5 text-6xl animate-[bounce_3s_ease-in-out_infinite] drop-shadow-2xl">
        🦐
      </div>

      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-black text-white tracking-tight">
          Cosa bolle in pentola?
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
        <span className="text-orange-400 bg-orange-400/10 px-2 py-0.5 rounded-md border border-orange-400/20">
          {sectionLabel}
        </span>
      </p>

      <div className="space-y-5">
        {/* Input Titolo - Contrasto Aumentato */}
        <div className="space-y-1">
          <label className="text-[10px] font-bold text-white/30 ml-2 uppercase">
            Titolo Missione
          </label>
          <input
            autoFocus
            className="w-full text-xl font-bold bg-black/40 border border-white/10 rounded-2xl p-4 text-white focus:ring-2 focus:ring-orange-500 focus:bg-black/60 outline-none placeholder:text-white/10 transition-all shadow-inner"
            placeholder="Esempio: Conquistare il mondo..."
            value={newTask.title}
            onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
          />
        </div>

        {/* Textarea Note - Contrasto Aumentato */}
        <div className="space-y-1">
          <label className="text-[10px] font-bold text-white/30 ml-2 uppercase">
            Note e dettagli
          </label>
          <textarea
            className="w-full bg-black/40 border border-white/10 rounded-2xl p-4 text-white focus:ring-2 focus:ring-orange-500 focus:bg-black/60 outline-none placeholder:text-white/10 resize-none h-28 transition-all shadow-inner"
            placeholder="Aggiungi dettagli extra..."
            value={newTask.note}
            onChange={(e) => setNewTask({ ...newTask, note: e.target.value })}
          />
        </div>

        <div className="flex items-center justify-between pt-2">
          <button
            type="button"
            onClick={() =>
              setNewTask({ ...newTask, priority: !newTask.priority })
            }
            className={`px-4 py-2 rounded-xl text-[11px] font-black transition-all border-2 ${
              newTask.priority
                ? "bg-orange-500 text-white border-orange-400 shadow-lg shadow-orange-500/40 scale-105"
                : "bg-white/5 text-white/50 border-white/10 hover:border-white/30"
            }`}
          >
            {newTask.priority ? "🔥 PRIORITÀ ALTA" : "NORMALE (ALT+P)"}
          </button>
          <span className="text-[10px] text-white/30 font-bold uppercase tracking-tighter">
            INVIO per salvare
          </span>
        </div>

        {/* Pulsante Salva */}
        <button
          onClick={onSave}
          className="w-full py-5 bg-orange-500 hover:bg-orange-400 text-white rounded-2xl font-black text-xl transition-all shadow-2xl shadow-orange-500/30 active:scale-95 border-t border-white/20"
        >
          SALVA TASK 🦐
        </button>
      </div>
    </div>
  );
};

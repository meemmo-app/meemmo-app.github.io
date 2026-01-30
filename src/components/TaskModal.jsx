import React from "react";

export const TaskModal = ({ newTask, setNewTask, onSave, sectionLabel }) => {
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      onSave();
    }
    // Permette di cambiare la priorità con 'P' anche mentre si scrive,
    // ma solo se non stiamo scrivendo testo (o se preferisci, usando Alt+P)
    if ((e.key === "p" || e.key === "P") && e.altKey) {
      e.preventDefault();
      setNewTask((prev) => ({ ...prev, priority: !prev.priority }));
    }
  };
  return (
    <div className="p-8 relative" onKeyDown={handleKeyDown}>
      <div className="absolute top-8 right-8 text-4xl animate-bounce">🦐</div>

      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-black text-slate-800 tracking-tight">
          Cosa bolle in pentola?
        </h2>
      </div>

      <p className="text-xs font-bold text-slate-400 mb-4 uppercase">
        Aggiunta a: <span className="text-orange-500">{sectionLabel}</span>
      </p>

      <div className="space-y-4">
        <input
          autoFocus
          //onKeyDown={handleKeyDown}
          className="w-full text-xl font-bold bg-slate-50 border-none rounded-2xl p-4 focus:ring-2 focus:ring-orange-500 outline-none placeholder:text-slate-300"
          placeholder="Titolo della missione..."
          value={newTask.title}
          onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
        />

        <textarea
          className="w-full bg-slate-50 border-none rounded-2xl p-4 focus:ring-2 focus:ring-orange-500 outline-none placeholder:text-slate-300 resize-none h-24"
          placeholder="Note del gambero..."
          value={newTask.note}
          onChange={(e) => setNewTask({ ...newTask, note: e.target.value })}
        />

        <div className="flex items-center justify-between p-2">
          <button
            tabIndex="0"
            onClick={() =>
              setNewTask({ ...newTask, priority: !newTask.priority })
            }
            className={`px-4 py-2 rounded-xl text-xs font-black transition-all ${
              newTask.priority
                ? "bg-orange-500 text-white"
                : "bg-slate-100 text-slate-400"
            }`}
          >
            {newTask.priority ? "PRIORITÀ ALTA" : "PRIORITÀ NORMALE (P)"}
          </button>
          <span className="text-[10px] text-slate-400 font-bold uppercase">
            Premi INVIO per salvare
          </span>
        </div>

        <button
          onClick={onSave}
          tabIndex="0"
          id="save-new-task"
          className="w-full py-4 bg-orange-500 hover:bg-orange-600 text-white rounded-2xl font-black text-lg transition-all shadow-lg shadow-orange-200 active:scale-[0.98]"
        >
          SALVA TASK 🦐
        </button>
      </div>
    </div>
  );
};

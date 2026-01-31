import React from "react";
import { X, Plus, Trash2, Clock, Zap, ZapOff } from "lucide-react";

export const SettingsModal = ({
  sections,
  setSections,
  isDynamicColumns,
  setIsDynamicColumns,
  onClose,
}) => {
  const addSection = () => {
    const newSection = {
      id: `custom-${Date.now()}`,
      label: "Nuova Sezione",
      hours: [12], // Default mezzogiorno
    };
    setSections([...sections, newSection]);
  };

  const removeSection = (id) => {
    setSections(sections.filter((s) => s.id !== id));
  };

  const updateSectionLabel = (id, label) => {
    setSections(sections.map((s) => (s.id === id ? { ...s, label } : s)));
  };

  const updateSectionHours = (id, hourString) => {
    // Trasforma "9,10,11" in [9, 10, 11]
    const hours = hourString
      .split(",")
      .map((h) => parseInt(h.trim()))
      .filter((h) => !isNaN(h));
    setSections(sections.map((s) => (s.id === id ? { ...s, hours } : s)));
  };

  return (
    <div className="p-8 max-h-[85vh] overflow-y-scroll overflow-x-hidden custom-scrollbar">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-2xl font-black text-slate-800 tracking-tight">
            Impostazioni
          </h2>
          <p className="text-xs font-bold text-slate-400 uppercase">
            Configura la tua giornata
          </p>
        </div>
        <button
          onClick={onClose}
          className="p-2 hover:bg-slate-100 rounded-full transition-colors"
        >
          <X size={22} className="text-slate-400" />
        </button>
      </div>

      {/* Switch Sezioni Dinamiche */}
      <div className="bg-orange-50 p-4 rounded-3xl border border-orange-100 mb-8 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div
            className={`p-2 rounded-xl ${isDynamicColumns ? "bg-orange-500 text-white" : "bg-slate-200 text-slate-500"}`}
          >
            {isDynamicColumns ? <Zap size={20} /> : <ZapOff size={20} />}
          </div>
          <div>
            <p className="font-bold text-slate-800 text-sm">
              Sezioni Dinamiche
            </p>
            <p className="text-[10px] text-orange-600 font-bold uppercase tracking-tight">
              Altezza delle sezioni in base ai task
            </p>
          </div>
        </div>
        <button
          onClick={() => setIsDynamicColumns(!isDynamicColumns)}
          className={`w-12 h-6 rounded-full transition-all relative ${isDynamicColumns ? "bg-orange-500" : "bg-slate-300"}`}
        >
          <div
            className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${isDynamicColumns ? "left-7" : "left-1"}`}
          />
        </button>
      </div>

      {/* Lista Sezioni */}
      <div className="space-y-4">
        <div className="flex justify-between items-center px-2">
          <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest">
            I tuoi Quarti
          </h3>
          <button
            onClick={addSection}
            className="flex items-center gap-1 text-[10px] font-black text-orange-500 hover:text-orange-600 uppercase"
          >
            <Plus size={14} /> Aggiungi
          </button>
        </div>

        {sections.map((section) => (
          <div
            key={section.id}
            className="p-4 bg-white border border-slate-100 rounded-2xl shadow-sm space-y-3"
          >
            <div className="flex gap-2">
              <input
                className="flex-1 font-bold text-slate-800 outline-none focus:text-orange-500"
                value={section.label}
                onChange={(e) => updateSectionLabel(section.id, e.target.value)}
                placeholder="Nome sezione..."
              />
              <button
                onClick={() => removeSection(section.id)}
                className="text-slate-300 hover:text-red-500 transition-colors"
              >
                <Trash2 size={16} />
              </button>
            </div>

            <div className="flex items-center gap-2 bg-slate-50 p-2 px-3 rounded-xl">
              <Clock size={14} className="text-slate-400" />
              <input
                className="bg-transparent text-[11px] font-mono text-slate-600 w-full outline-none"
                value={section.hours.join(", ")}
                onChange={(e) => updateSectionHours(section.id, e.target.value)}
                placeholder="Ore (es: 9, 10, 11)"
              />
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={onClose}
        className="w-full mt-8 py-4 bg-slate-900 text-white rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-slate-800 transition-all"
      >
        Salva e Chiudi
      </button>
    </div>
  );
};

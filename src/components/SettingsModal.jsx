import React from "react";
import { X, Plus, Trash2, Clock, Zap, ZapOff } from "lucide-react";
import { GLASSBASE } from "../constants/styles";

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
    <div
      className={`
              ${GLASSBASE} rounded-3xl p-8 max-h-[85vh] overflow-y-scroll overflow-x-hidden`}
    >
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-2xl font-black text-white tracking-tight">
            Impostazioni
          </h2>
          <p className="text-xs font-bold text-white/50 uppercase">
            Configura la tua giornata
          </p>
        </div>
        <button
          onClick={onClose}
          className="p-2 hover:bg-white/10 rounded-full transition-all active:scale-90 group"
        >
          <X size={22} className="text-white/60 group-hover:text-white" />
        </button>
      </div>

      {/* Switch Sezioni Dinamiche */}
      <div className="bg-black/50 p-4 rounded-3xl border border-white/10 mb-8 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div
            className={`p-2 rounded-xl ${isDynamicColumns ? "bg-orange-500 text-white" : "bg-slate-200 text-slate-500"}`}
          >
            {isDynamicColumns ? <Zap size={20} /> : <ZapOff size={20} />}
          </div>
          <div>
            <p className="font-bold text-white text-sm">Sezioni Dinamiche</p>
            <p className="text-xs text-white/90 tracking-tight">
              Altezza delle sezioni in base ai task
            </p>
          </div>
        </div>
        <button
          onClick={() => setIsDynamicColumns(!isDynamicColumns)}
          className={`cursor-pointer w-12 h-6 rounded-full transition-all relative ${isDynamicColumns ? "bg-orange-500" : "bg-slate-300"}`}
        >
          <div
            className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${isDynamicColumns ? "left-7" : "left-1"}`}
          />
        </button>
      </div>

      {/* Lista Sezioni */}
      <div className="space-y-4">
        <div className="flex justify-between items-center px-2">
          <h3 className="text-xs font-black text-white/60 uppercase tracking-widest">
            I tuoi Quarti
          </h3>
          <button
            onClick={addSection}
            className="cursor-pointer flex items-center gap-1 text-xs font-black text-orange-500 hover:text-orange-600 uppercase transition-all"
          >
            <Plus size={14} /> Aggiungi
          </button>
        </div>

        {sections.map((section) => (
          <div
            key={section.id}
            className="p-4 bg-black/40 border border-white/10 rounded-2xl shadow-sm space-y-3"
          >
            <div className="flex gap-2">
              <input
                className="flex-1 font-bold text-white outline-none focus:text-orange-500"
                value={section.label}
                onChange={(e) => updateSectionLabel(section.id, e.target.value)}
                placeholder="Nome sezione..."
              />
              <button
                onClick={() => removeSection(section.id)}
                className="text-white/50 hover:text-red-500 cursor-pointer transition-colors"
              >
                <Trash2 size={16} />
              </button>
            </div>

            <div className="flex items-center gap-2 bg-black/50 p-2 px-3 rounded-xl">
              <Clock size={14} className="text-white/90" />
              <input
                className="bg-transparent text-[11px] font-mono text-white/90 w-full outline-none"
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
        className="cursor-pointer w-full mt-8 py-4 bg-black/90 text-white rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-black/70 transition-all"
      >
        Salva e Chiudi
      </button>
    </div>
  );
};

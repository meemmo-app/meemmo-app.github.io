import React from "react";
import {
  X,
  Plus,
  Trash2,
  Clock,
  Zap,
  ZapOff,
  Download,
  Upload,
} from "lucide-react";
import { GLASSBASE } from "../constants/styles";
import ModalHeader from "./ui/ModalHeader";
import { ButtonPrimary, ButtonSecondary } from "./ui/Button";
import {
  exportLocalStorageData,
  importLocalStorageData,
} from "../constants/utils";

const Switch = ({ option, setOption, iconOn, iconOff, title, subtitle }) => {
  return (
    <div className="bg-black/50 p-4 rounded-3xl border border-white/10 mb-8 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div
          className={`p-2 rounded-xl ${option ? "bg-orange-500 text-white" : "bg-slate-200 text-slate-500"}`}
        >
          {option ? iconOn : iconOff}
        </div>
        <div>
          <p className="font-bold text-white text-sm">{title}</p>
          {subtitle && (
            <p className="text-xs text-white/90 tracking-tight">{subtitle}</p>
          )}
        </div>
      </div>
      <button
        onClick={() => setOption(!option)}
        className={`cursor-pointer w-12 h-6 rounded-full transition-all relative ${option ? "bg-orange-500" : "bg-slate-300"}`}
      >
        <div
          className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${option ? "left-7" : "left-1"}`}
        />
      </button>
    </div>
  );
};

const Section = ({
  section,
  updateSectionHours,
  updateSectionLabel,
  removeSection,
}) => {
  return (
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
  );
};

export const SettingsModal = ({
  sections,
  setSections,
  isDynamicColumns,
  setIsDynamicColumns,
  onClose,
  activeQuarterIndex,
  setActiveQuarterIndex,
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
    // 1. Trova l'indice della sezione che stiamo rimuovendo
    const indexToRemove = sections.findIndex((s) => s.id === id);

    // 2. Crea la nuova lista
    const newSections = sections.filter((s) => s.id !== id);

    // 3. Se stiamo eliminando la sezione attiva o l'ultima
    if (activeQuarterIndex >= newSections.length) {
      // Sposta il focus sull'ultima sezione disponibile (o 0)
      setActiveQuarterIndex(Math.max(0, newSections.length - 1));
    } else if (indexToRemove === activeQuarterIndex && activeQuarterIndex > 0) {
      // Opzionale: se eliminiamo proprio quella selezionata,
      // possiamo decidere di scalare a quella precedente
      setActiveQuarterIndex(activeQuarterIndex - 1);
    }

    setSections(newSections);
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
      data-testid="settings-modal"
      className={`${GLASSBASE} rounded-3xl p-8 max-h-[85vh] overflow-y-scroll overflow-x-hidden custom-scrollbar scroll-smooth`}
    >
      {/* Header */}
      <ModalHeader
        title={"Impostazioni"}
        subtitle={"Configura la tua ggiornata"}
        onClose={onClose}
        dataTestId={"close-settings-modal"}
      ></ModalHeader>

      {/* Switch Sezioni Dinamiche */}
      <Switch
        option={isDynamicColumns}
        setOption={setIsDynamicColumns}
        iconOn={<Zap size={20} />}
        iconOff={<ZapOff size={20} />}
        title={"Sezioni Dinamiche"}
        subtitle={"Altezza delle sezioni in base ai task"}
      ></Switch>

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
          <Section
            section={section}
            updateSectionLabel={updateSectionLabel}
            updateSectionHours={updateSectionHours}
            removeSection={removeSection}
          ></Section>
        ))}
      </div>

      <div className="mt-8"></div>
      <ButtonPrimary text={"Salva e Chiudi"} onClick={onClose}></ButtonPrimary>
      <div className="flex gap-2 w-full justify-between">
        <ButtonSecondary
          text={"Scarica dati"}
          icon={<Download size={16} />}
          onClick={exportLocalStorageData}
        ></ButtonSecondary>
        <div className="relative">
          <input
            type="file"
            accept=".json"
            onChange={importLocalStorageData}
            className="hidden"
            id="import-file"
          />
          <ButtonSecondary
            text={"Carica dati"}
            icon={<Upload size={16} />}
            onClick={() => document.getElementById("import-file").click()}
          ></ButtonSecondary>
        </div>
      </div>
    </div>
  );
};

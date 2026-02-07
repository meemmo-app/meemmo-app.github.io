import React from "react";
import {
  X,
  Zap,
  ZapOff,
  Download,
  Upload,
  RotateCcw,
  Moon,
  Sun,
  Plus,
  Trash2,
  Clock,
} from "lucide-react";
import { GLASSBASE } from "../../constants/styles";
import { ACCENT_COLOR } from "../../constants/sections";
import ModalHeader from "../ui/ModalHeader";
import { ButtonPrimary, ButtonSecondary } from "../ui/Button";
import {
  exportLocalStorageData,
  importLocalStorageData,
} from "../../constants/utils";
import Switch from "./Switch";
import Section from "./Section";
import SectionControls from "./SectionControls";
import DataManagement from "./DataManagement";

const SettingsModal = ({
  sections,
  setSections,
  isDynamicColumns,
  setIsDynamicColumns,
  onClose,
  activeQuarterIndex,
  setActiveQuarterIndex,
  getSpriteExperimental,
  setSpriteExperimental,
  resetSectionColor,
  theme,
  setTheme,
}) => {
  const addSection = () => {
    const newSection = {
      id: `custom-${Date.now()}`,
      label: "Nuova Sezione",
      hours: [12], // Default mezzogiorno
      color: ACCENT_COLOR, // Default color
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

  const updateSectionColor = (id, color) => {
    setSections(sections.map((s) => (s.id === id ? { ...s, color } : s)));
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
      />

      {/* Switch Sezioni Dinamiche */}
      <Switch
        option={isDynamicColumns}
        setOption={setIsDynamicColumns}
        iconOn={<Zap size={20} />}
        iconOff={<ZapOff size={20} />}
        title={"Sezioni Dinamiche"}
        subtitle={"Altezza delle sezioni in base ai task"}
      />

      <Switch
        option={theme}
        setOption={setTheme}
        iconOn={<Moon size={20} />}
        iconOff={<Sun size={20} />}
        title={"Light / Dark mode"}
        subtitle={"Modifica light / dark mode"}
      />

      <Switch
        option={getSpriteExperimental()}
        setOption={setSpriteExperimental}
        iconOn={<Zap size={20} />}
        iconOff={<ZapOff size={20} />}
        title={"Experimental Mascotte"}
        subtitle={"Attiva / disattiva mascotte"}
      />

      {/* Section Controls */}
      <SectionControls
        sections={sections}
        addSection={addSection}
        updateSectionLabel={updateSectionLabel}
        updateSectionHours={updateSectionHours}
        updateSectionColor={updateSectionColor}
        resetSectionColor={resetSectionColor}
        removeSection={removeSection}
      />

      <div className="mt-8" />
      <ButtonPrimary text={"Salva e Chiudi"} onClick={onClose} />
      
      <DataManagement onImportData={importLocalStorageData} />
    </div>
  );
};

export default SettingsModal;
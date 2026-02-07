import React from "react";
import { Plus } from "lucide-react";
import Section from './Section';

const SectionControls = ({
  sections,
  addSection,
  updateSectionLabel,
  updateSectionHours,
  updateSectionColor,
  resetSectionColor,
  removeSection,
}) => {
  return (
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
          key={section.id}
          section={section}
          updateSectionLabel={updateSectionLabel}
          updateSectionHours={updateSectionHours}
          updateSectionColor={updateSectionColor}
          resetSectionColor={resetSectionColor}
          removeSection={removeSection}
        />
      ))}
    </div>
  );
};

export default SectionControls;
import React from "react";
import { Trash2, Clock, RotateCcw } from "lucide-react";

const Section = ({
  section,
  updateSectionHours,
  updateSectionLabel,
  updateSectionColor,
  resetSectionColor,
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

      <div className="flex items-center gap-2 bg-black/50 p-2 px-3 rounded-xl">
        <div
          className="w-4 h-4 rounded-full"
          style={{ backgroundColor: section.color }}
        />
        <input
          type="color"
          value={section.color}
          onChange={(e) => updateSectionColor(section.id, e.target.value)}
          className="w-full h-6 cursor-pointer bg-transparent"
        />
        <button
          onClick={() => resetSectionColor(section.id)}
          className="text-white/50 hover:text-orange-500 cursor-pointer transition-colors"
          title="Reset to default color"
        >
          <RotateCcw size={16} />
        </button>
      </div>
    </div>
  );
};

export default Section;
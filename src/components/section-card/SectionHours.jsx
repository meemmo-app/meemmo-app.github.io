import React from "react";
import { Clock } from "lucide-react";

const SectionHours = ({ sectionHours }) => {
  return (
    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1">
      <Clock size={12} /> {sectionHours[0]}:00 -{" "}
      {sectionHours[sectionHours.length - 1]}:59
    </span>
  );
};

export default SectionHours;
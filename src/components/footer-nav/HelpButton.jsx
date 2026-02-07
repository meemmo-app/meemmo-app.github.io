import React from "react";
import { HelpCircle } from "lucide-react";
import { GLASSBASE } from "../../constants/styles";

const HelpButton = ({ isHelpOpen, setIsHelpOpen }) => {
  return (
    <button
      onClick={() => setIsHelpOpen(!isHelpOpen)}
      className={`
        ${GLASSBASE}
        rounded-full flex items-center justify-center
        cursor-pointer
        transition-all duration-300 hover:scale-105 active:scale-90
        text-white/80 hover:text-white
        w-12 h-12
      `}
      title="Apri la guida delle funzionalità (? per aprire)"
    >
      <HelpCircle size={22} className="transition-transform duration-500" />
    </button>
  );
};

export default HelpButton;
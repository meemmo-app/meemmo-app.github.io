import React from "react";
import { Keyboard, X } from "lucide-react";
import { GLASSBASE } from "../../constants/styles";

const ToggleButton = ({ isOpen, setIsOpen }) => {
  return (
    <button
      onClick={() => setIsOpen(!isOpen)}
      className={`
        ${GLASSBASE}
        rounded-full flex items-center justify-center
        cursor-pointer
        transition-all duration-300 hover:scale-105 active:scale-90
        text-white/80 hover:text-white
        ${isOpen ? "w-11 h-11" : "w-12 h-12"}
      `}
    >
      {isOpen ? (
        <X size={20} className="transition-transform duration-500 rotate-0" />
      ) : (
        <div
          className="flex items-center gap-1"
          title="Chiudi/apri scorciatoie"
        >
          <Keyboard size={22} className="transition-transform duration-500" />
        </div>
      )}
    </button>
  );
};

export default ToggleButton;
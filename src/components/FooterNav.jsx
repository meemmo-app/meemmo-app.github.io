import React, { useState, useEffect } from "react";
import { Keyboard, X } from "lucide-react";

export const FooterNav = ({ isModalOpen, setIsModalOpen, isSettingsOpen }) => {
  const [isOpen, setIsOpen] = useState(true);

  // Listener per il tasto "?"
  useEffect(() => {
    if (!isModalOpen && !isSettingsOpen) {
      const handleKeyDown = (e) => {
        if (e.key === "?") {
          setIsOpen((prev) => !prev);
        }
      };
      window.addEventListener("keydown", handleKeyDown);
      return () => window.removeEventListener("keydown", handleKeyDown);
    }
  });

  // Stile base del vetro scuro
  const glassBase = `
    bg-slate-900/60 backdrop-blur-xl -webkit-backdrop-blur-xl
    border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.3)]
  `;

  return (
    <div
      className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 ${isModalOpen || isSettingsOpen ? "hidden" : ""}`}
    >
      {/* Container Principale con Transizione Fluida */}
      <div
        className={`
        ${glassBase}
        flex items-center overflow-hidden transition-all duration-500 cubic-bezier(0.4, 0, 0.2, 1)
        ${
          isOpen
            ? "max-w-250 px-6 py-3 rounded-3xl opacity-100"
            : "max-w-0 px-0 py-3 rounded-3xl opacity-0 pointer-events-none border-none"
        }
      `}
      >
        <div className="flex gap-6 items-center whitespace-nowrap text-white/90 text-xs font-medium">
          <div
            className="flex gap-2 items-center cursor-pointer hover:text-white hover:scale-105 transition-all"
            onClick={() => setIsModalOpen(true)}
          >
            <span className="bg-white/10 px-1.5 py-0.5 rounded text-[10px] font-black text-slate-300 border border-white/10">
              space
            </span>
            Crea
          </div>
          <div className="flex gap-2 items-center">
            <span className="bg-white/10 px-1.5 py-0.5 rounded text-[10px] font-black text-slate-300 border border-white/10">
              J/K
            </span>
            Tasks
          </div>
          <div className="flex gap-2 items-center">
            <span className="bg-white/10 px-1.5 py-0.5 rounded text-[10px] font-black text-slate-300 border border-white/10">
              H/L
            </span>
            Quarti
          </div>
          <div className="flex gap-2 items-center">
            <span className="bg-white/10 px-1.5 py-0.5 rounded text-[10px] font-black text-slate-300 border border-white/10">
              M
            </span>
            Modifica
          </div>
          <div className="flex gap-2 items-center">
            <span className="bg-white/10 px-1.5 py-0.5 rounded text-[10px] font-black text-slate-300 border border-white/10">
              D
            </span>
            Completa
          </div>
          <div className="flex gap-2 items-center">
            <span className="bg-red-500/20 px-1.5 py-0.5 rounded text-[10px] font-black text-red-400 border border-red-500/30">
              X
            </span>
            Elimina
          </div>
        </div>
      </div>

      {/* Bolla Indipendente (Pulsante Toggle) */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`
          ${glassBase}
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
            title="Digita ? per aprire le scorciatoie"
          >
            <Keyboard size={20} className="transition-transform duration-500" />
          </div>
        )}
      </button>
    </div>
  );
};

import { useState, useEffect } from "react";
import { Keyboard, X, Mic, Plus, HelpCircle } from "lucide-react";
import { GLASSBASE } from "../constants/styles";
import { VoiceWaveform } from "./ui/VoiceWaveform";
import { useSpeechToText } from "../hooks/useSpeechToText";
import HelpOverlay from "./help/HelpOverlay";
import { Dialog } from "./ui/Dialog";

const FooterItem = ({ keys, description }) => {
  return (
    <div className="flex gap-2 items-center">
      <span className="bg-white/10 px-1.5 py-0.5 rounded text-[10px] font-black text-slate-300 border border-white/10">
        {keys}
      </span>
      {description}
    </div>
  );
};

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

const TextToSpeechButton = ({ startListening, isListening }) => {
  return (
    <>
      <button
        onMouseDown={startListening} // Tieni premuto per parlare
        title="Hold down to speech a task"
        className={`
        ${GLASSBASE}
        rounded-full flex flex-row items-center justify-center gap-2 p-3 h-12 cursor-pointer transition-all duration-300
         text-white/80 hover:text-white ${isListening ? "scale-90" : "hover:scale-105 active:scale-90"}`}
      >
        <Mic size={22} className={isListening ? "animate-pulse" : ""} />
        {isListening && (
          <div className="relative">
            <VoiceWaveform />
          </div>
        )}
      </button>
    </>
  );
};

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

export const FooterNav = ({
  isModalOpen,
  setIsModalOpen,
  isSettingsOpen,
  isBacklogOpen,
  handleCreateTask,
  newTask,
  setNewTask,
}) => {
  const [isOpen, setIsOpen] = useState(true);
  const [isHelpOpen, setIsHelpOpen] = useState(false);

  const { isListening, startListening } = useSpeechToText(
    newTask,
    setNewTask,
    handleCreateTask,
  );

  // Listener per il tasto "?"
  useEffect(() => {
    if (!isModalOpen && !isSettingsOpen) {
      const handleKeyDown = (e) => {
        if (e.key === "?") {
          // Toggle help overlay instead of footer shortcuts
          setIsHelpOpen((prev) => !prev);
        }
      };
      window.addEventListener("keydown", handleKeyDown);
      return () => window.removeEventListener("keydown", handleKeyDown);
    }
  });

  return (
    <>
      <div
        className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-40 flex items-center gap-3 ${isModalOpen || isSettingsOpen || isBacklogOpen ? "hidden" : ""}`}
      >
        {/* Container Principale con Transizione Fluida NASCOSTO PER NUOVI SVILUPPI */}
        <div
          className={`
            hidden
        ${GLASSBASE}
        flex items-center overflow-hidden transition-all duration-500 cubic-bezier(0.4, 0, 0.2, 1)
        ${
          isOpen
            ? "max-w-250 px-6 py-3 rounded-3xl opacity-100"
            : "max-w-0 px-0 py-3 rounded-3xl opacity-0 pointer-events-none border-none"
        }
      `}
        >
          <div className="flex gap-6 items-center whitespace-nowrap text-white/90 text-xs font-medium">
            <FooterItem keys={"Space"} description={"Crea"} />
            <FooterItem keys={"J/K"} description={"Scorri Tasks"} />
            <FooterItem keys={"H/L"} description={"Scorri Quarti"} />
            <FooterItem keys={"E"} description={"Modifica"} />
            <FooterItem keys={"D"} description={"Completa"} />
            <FooterItem keys={"X"} description={"Elimina"} />
          </div>
        </div>

        {/* Bolla Indipendente (Pulsante Toggle) NASCOSTO PER NUOVI SVILUPPI*/}
        <div className="hidden">
          <ToggleButton isOpen={isOpen} setIsOpen={setIsOpen} />
        </div>

        {/* Help Button */}
        <HelpButton isHelpOpen={isHelpOpen} setIsHelpOpen={setIsHelpOpen} />

        {/* Speech control */}
        <TextToSpeechButton
          startListening={startListening}
          isListening={isListening}
        />
      </div>

      {/* Help Overlay */}
      <HelpOverlay isOpen={isHelpOpen} onClose={() => setIsHelpOpen(false)} />
    </>
  );
};

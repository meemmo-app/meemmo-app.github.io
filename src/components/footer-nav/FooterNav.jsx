import { useState, useEffect } from "react";
import { useSpeechToText } from "../../hooks/useSpeechToText";
import HelpOverlay from "../help/HelpOverlay";
import { handleKeyBindings } from "../../utils/handleKeyBindings";
import HelpButton from "./HelpButton";
import TextToSpeechButton from "./TextToSpeechButton";
import ToggleButton from "./ToggleButton";
import ShortcutsPanel from "./ShortcutsPanel";

const FooterNav = ({
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

  // Added listener for the key "?"
  useEffect(() => {
    if (!isModalOpen && !isSettingsOpen) {
      const handleKeyDown = (e) => {
        handleKeyBindings(e, {
          "?": {
            action: () => {
              setIsHelpOpen((prev) => !prev);
            },
          },
        });
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
        <div className="hidden">
          <ShortcutsPanel isOpen={isOpen} />
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

export default FooterNav;

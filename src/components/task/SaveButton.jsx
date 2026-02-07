import React from "react";

// --- SaveButton Component ---
const SaveButton = ({ onSave, onClose }) => {
  const handleClick = () => {
    onSave();
    onClose(); // Close the modal after saving
  };

  return (
    <button
      onClick={handleClick}
      tabIndex="0"
      data-testid="new-task-save"
      className="w-full py-5 bg-orange-500 hover:bg-orange-400 text-white rounded-2xl font-black text-xl transition-all shadow-2xl shadow-orange-500/30 focus:ring-2 focus:ring-orange-500 focus:bg-orange-600 outline-none active:scale-95 border-t border-white/20"
    >
      SALVA TASK 🦐
    </button>
  );
};

export default SaveButton;
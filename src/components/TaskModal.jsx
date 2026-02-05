import React from "react";
import { GLASSBASE } from "../constants/styles";
import ModalHeader from "./ui/ModalHeader";
import { TagSection } from "./TagSection";
import PixelSprite from "./PixelSprite";

// --- InputField Component ---
const InputField = ({ value, onChange, placeholder, autoFocus, testId }) => (
  <input
    autoFocus={autoFocus}
    className="w-full text-xl font-bold bg-black/40 border border-white/10 rounded-2xl p-4 text-white focus:ring-2 focus:ring-orange-500 focus:bg-black/60 outline-none placeholder:text-white/40 transition-all shadow-inner"
    placeholder={placeholder}
    value={value}
    onChange={onChange}
    data-testid={testId}
  />
);

// --- TextAreaField Component ---
const TextAreaField = ({ value, onChange, placeholder, testId }) => (
  <textarea
    className="w-full bg-black/40 border border-white/10 rounded-2xl p-4 text-white focus:ring-2 focus:ring-orange-500 focus:bg-black/60 outline-none placeholder:text-white/40 resize-none h-28 transition-all shadow-inner"
    placeholder={placeholder}
    value={value}
    onChange={onChange}
    data-testid={testId}
  />
);

// --- PriorityButton Component ---
const PriorityButton = ({ isPriority, togglePriority }) => (
  <button
    type="button"
    tabIndex="0"
    onClick={togglePriority}
    className={`px-4 py-2 rounded-xl text-xs font-black transition-all border-2 focus:ring-2 focus:ring-orange-500 outline-none ${
      isPriority
        ? "bg-orange-500 text-white border-orange-400 shadow-lg shadow-orange-500/40 scale-105 focus:bg-orange-600"
        : "bg-white/5 text-white/50 border-white/10 hover:border-white/30 focus:bg-white/4"
    }`}
    data-testid="new-task-priority"
  >
    {isPriority ? "Priorità Alta (P)" : "Priorità Normale (P)"}
  </button>
);

// --- SaveButton Component ---
const SaveButton = ({ onSave }) => (
  <button
    onClick={onSave}
    tabIndex="0"
    data-testid="new-task-save"
    className="w-full py-5 bg-orange-500 hover:bg-orange-400 text-white rounded-2xl font-black text-xl transition-all shadow-2xl shadow-orange-500/30 focus:ring-2 focus:ring-orange-500 focus:bg-orange-600 outline-none active:scale-95 border-t border-white/20"
  >
    SALVA TASK 🦐
  </button>
);

// --- TaskModal Component ---
export const TaskModal = ({
  title,
  newTask,
  setNewTask,
  onSave,
  sectionLabel,
  onClose,
  editingTask,
  spriteExperimental,
}) => {
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      onSave();
    }

    if (
      e.key.toLowerCase() === "p" &&
      document.activeElement.tagName !== "INPUT" &&
      document.activeElement.tagName !== "TEXTAREA"
    ) {
      e.preventDefault();
      togglePriority();
    }
  };

  const togglePriority = () =>
    setNewTask((prev) => ({ ...prev, priority: !prev.priority }));

  const removeTag = (tagToRemove) => {
    setNewTask((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove),
    }));
  };

  return (
    <div
      className={`${GLASSBASE} rounded-3xl p-8`}
      onKeyDown={handleKeyDown}
      data-testid="new-task-modal"
    >
      {/* Animated Shrimp Badge */}
      {!spriteExperimental && (
        <div className="absolute z-50 -top-5 -left-5 text-6xl animate-[bounce_3s_ease-in-out_infinite] drop-shadow-2xl">
          🦐
        </div>
      )}

      {spriteExperimental && (
        <div className="absolute scale-20 z-50 -top-130 -left-65 transition-all">
          <PixelSprite
            imagePath={"/image.png"}
            frameWidth={514}
            frameHeight={1024}
            columns={3}
            rows={1}
            frames={3}
          />
        </div>
      )}

      {/* Modal Header */}
      <ModalHeader title={title} onClose={onClose} dataTestId="modal-close" />

      {/* Section Label */}
      <p className="text-xs font-black text-white/40 mb-4 uppercase tracking-wide flex items-center gap-2">
        Sezione:{" "}
        <span className="text-orange-400 bg-orange-400/10 px-2 py-0.5 rounded-md border border-orange-400/40">
          {sectionLabel}
        </span>
      </p>

      <div className="space-y-5">
        {/* Tag Section */}
        <div className="text-xs">
          <TagSection tags={newTask.tags} onRemoveTag={removeTag} />
        </div>

        {/* Task Title Input */}
        <div className="space-y-1">
          <InputField
            autoFocus={!editingTask}
            value={newTask.title}
            onChange={(e) =>
              setNewTask((prev) => ({ ...prev, title: e.target.value }))
            }
            placeholder="Titolo della missione"
            testId="new-task-title"
          />
        </div>

        {/* Task Notes TextArea */}
        <div className="space-y-1">
          <TextAreaField
            value={newTask.note}
            onChange={(e) =>
              setNewTask((prev) => ({ ...prev, note: e.target.value }))
            }
            placeholder="Aggiungi dettagli extra..."
            testId="new-task-note"
          />
        </div>

        {/* Priority Toggle and Instruction */}
        <div className="flex items-center justify-between pt-2">
          <PriorityButton
            isPriority={newTask.priority}
            togglePriority={togglePriority}
          />
          <span className="text-xs text-white/40 font-bold uppercase tracking-tighter">
            INVIO per salvare
          </span>
        </div>

        {/* Save Button */}
        <SaveButton onSave={() => onSave()} />
      </div>
    </div>
  );
};

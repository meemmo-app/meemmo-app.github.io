import React from "react";
import { GLASSBASE } from "../../constants/styles";
import ModalHeader from "../ui/ModalHeader";
import { TagSection } from "../TagSection";
import PixelSprite from "../PixelSprite";
import { handleKeyBindings } from "../../utils/handleKeyBindings";
import InputField from "./InputField";
import TextAreaField from "./TextAreaField";
import PriorityButton from "./PriorityButton";
import SaveButton from "./SaveButton";

// --- TaskModal Component ---
const TaskModal = ({
  title,
  newTask,
  setNewTask,
  onSave,
  sectionLabel,
  onClose,
  editingTask,
  spriteExperimental,
}) => {
  const togglePriority = () =>
    setNewTask((prev) => ({ ...prev, priority: !prev.priority }));

  const removeTag = (tagToRemove) => {
    setNewTask((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove),
    }));
  };

  const handleKeyDown = (e) => {
    handleKeyBindings(e, {
      Enter: {
        action: () => {
          onSave();
          onClose(); // Close the modal after saving
        },
        runInInputFields: true,
      },
      p: { action: togglePriority },
    });
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
        <div className="absolute scale-20 z-50 -top-65 -left-55 transition-all">
          <PixelSprite
            imagePath={"/writing_sprite_inline.png"}
            frameWidth={437}
            frameHeight={480}
            columns={6}
            rows={1}
            frames={6}
            animationDuration={2.5}
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
        <SaveButton onSave={() => onSave()} onClose={onClose} />
      </div>
    </div>
  );
};

export default TaskModal;

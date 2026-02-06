import { useEffect } from "react";
import { handleKeyBindings } from "../utils/handleKeyBindings";

export const useKeyboardShortcuts = ({
  isModalOpen,
  isSettingsOpen,
  tasks,
  sections,
  activeQuarterIndex,
  sectionCount,
  showCompleted,
  focusedTaskIndex,
  setActiveQuarterIndex,
  setFocusedTaskIndex,
  setIsModalOpen,
  setIsSettingsOpen,
  requestDelete,
  toggleComplete,
  handleEditOpen,
  onTaskFocus,
}) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (isModalOpen) {
        handleKeyBindings(e, {
          Escape: {
            action: () => {
              e.stopPropagation();
              setIsModalOpen(false);
            },
          },
        });
        return;
      }

      if (isSettingsOpen) {
        handleKeyBindings(e, {
          Escape: {
            action: () => {
              e.stopPropagation();
              setIsSettingsOpen(false);
            },
          },
        });
        return;
      }

      const visibleTasks = tasks.filter(
        (t) =>
          t.sectionId === sections[activeQuarterIndex].id &&
          (showCompleted || !t.completed),
      );

      handleKeyBindings(e, {
        " ": {
          action: () => {
            setIsModalOpen(true);
          },
        },
        h: {
          action: () => {
            setActiveQuarterIndex((prev) =>
              prev > 0 ? prev - 1 : sectionCount,
            );
            setFocusedTaskIndex(-1);
          },
        },
        arrowleft: {
          action: () => {
            setActiveQuarterIndex((prev) =>
              prev > 0 ? prev - 1 : sectionCount,
            );
            setFocusedTaskIndex(-1);
          },
        },
        l: {
          action: () => {
            setActiveQuarterIndex((prev) =>
              prev < sectionCount ? prev + 1 : 0,
            );
            setFocusedTaskIndex(-1);
          },
        },
        arrowright: {
          action: () => {
            setActiveQuarterIndex((prev) =>
              prev < sectionCount ? prev + 1 : 0,
            );
            setFocusedTaskIndex(-1);
          },
        },
        j: {
          action: () => {
            if (visibleTasks.length > 0) {
              setFocusedTaskIndex((prev) =>
                prev < visibleTasks.length - 1 ? prev + 1 : 0,
              );
            }
          },
        },
        arrowdown: {
          action: () => {
            if (visibleTasks.length > 0) {
              setFocusedTaskIndex((prev) =>
                prev < visibleTasks.length - 1 ? prev + 1 : 0,
              );
            }
          },
        },
        k: {
          action: () => {
            if (visibleTasks.length > 0) {
              setFocusedTaskIndex((prev) =>
                prev > 0 ? prev - 1 : visibleTasks.length - 1,
              );
            }
          },
        },
        arrowup: {
          action: () => {
            if (visibleTasks.length > 0) {
              setFocusedTaskIndex((prev) =>
                prev > 0 ? prev - 1 : visibleTasks.length - 1,
              );
            }
          },
        },
        x: {
          action: () => {
            if (focusedTaskIndex !== -1 && visibleTasks[focusedTaskIndex]) {
              requestDelete(visibleTasks[focusedTaskIndex].id);
              setFocusedTaskIndex(-1);
            }
          },
        },
        d: {
          action: () => {
            if (focusedTaskIndex !== -1 && visibleTasks[focusedTaskIndex]) {
              toggleComplete(visibleTasks[focusedTaskIndex].id);
            }
          },
        },
        e: {
          action: () => {
            if (visibleTasks[focusedTaskIndex]) {
              handleEditOpen(visibleTasks[focusedTaskIndex]);
            }
          },
        },
      });
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [
    isModalOpen,
    isSettingsOpen,
    tasks,
    sections,
    activeQuarterIndex,
    sectionCount,
    showCompleted,
    focusedTaskIndex,
    setActiveQuarterIndex,
    setFocusedTaskIndex,
    setIsModalOpen,
    setIsSettingsOpen,
    requestDelete,
    toggleComplete,
    handleEditOpen,
    onTaskFocus,
  ]);
};

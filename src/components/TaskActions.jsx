import { Edit3, Trash2 } from "lucide-react";
// --- TaskActions Component ---
export const TaskActions = ({ task, onCloseSwipe, onEdit, onDelete }) => {
  const handleEditClick = (e) => {
    e.stopPropagation();
    onEdit(task);
    onCloseSwipe();
  };

  const handleDeleteClick = (e) => {
    e.stopPropagation();
    onDelete(task.id);
    onCloseSwipe();
  };

  return (
    <div className="absolute inset-0 flex justify-end items-center gap-2 px-4 bg-white/80 dark:bg-slate-700/80 backdrop-blur-sm">
      <button
        onClick={handleEditClick}
        data-testid="task-item-edit-button"
        className="p-2.5 bg-white/80 hover:bg-white text-slate-600 rounded-xl transition-all shadow-sm"
      >
        <Edit3 size={18} />
      </button>
      <button
        onClick={handleDeleteClick}
        data-testid="task-item-delete-button"
        className="p-2.5 bg-red-500 hover:bg-red-600 text-white rounded-xl transition-all shadow-lg shadow-red-500/30"
      >
        <Trash2 size={18} />
      </button>
    </div>
  );
};

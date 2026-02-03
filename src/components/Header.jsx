import { useState } from "react";
import { Keyboard, Eye, EyeOff, Settings, Trash } from "lucide-react";
import { ConfirmModal } from "./ConfirmModal";
import { Dialog } from "./ui/Dialog";

const HeaderIcon = ({ icon, onClick, title }) => {
  return (
    <button
      title={title}
      className="p-2 hover:bg-slate-100 rounded-full transition-all cursor-pointer"
      onClick={onClick}
    >
      {icon}
    </button>
  );
};

export const Header = ({
  ACCENT_COLOR,
  showCompleted,
  setShowCompleted,
  setIsSettingsModalOpen,
  deleteCompletedTasks,
}) => {
  const [deleteCompleted, setDeleteCompleted] = useState(false);

  const confirmDeleteCompleted = () => {
    deleteCompletedTasks();
    setDeleteCompleted(false);
  };

  return (
    <header className="p-6 flex justify-between items-center max-w-7xl mx-auto">
      <div className="flex items-center gap-3">
        <div className="bg-white p-2 rounded-2xl shadow-sm border border-orange-100 rotate-12 text-3xl">
          🦐
        </div>
        <div>
          <h1
            className="text-3xl font-black tracking-tight"
            style={{ color: ACCENT_COLOR }}
          >
            MEEMMO
          </h1>
          <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">
            Organizza la tua giornata
          </p>
        </div>
      </div>

      <div className="flex gap-3 items-center">
        <button
          title={`${showCompleted ? "Hide completed tasks" : "Show completed tasks"}`}
          onClick={() => setShowCompleted(!showCompleted)}
          className={`cursor-pointer flex items-center gap-2 px-4 py-2 rounded-full border transition-all font-bold text-xs uppercase tracking-wider ${
            showCompleted
              ? "bg-white border-orange-200 text-orange-600"
              : "bg-orange-500 text-white shadow-lg shadow-orange-200"
          }`}
        >
          {showCompleted ? <Eye size={14} /> : <EyeOff size={14} />}
          {showCompleted ? "Nascondi completati" : "Mostra completati"}
        </button>
        <HeaderIcon
          icon={<Trash size={22} className="text-slate-400" />}
          onClick={() => setDeleteCompleted(true)}
          title="Delete completed tasks"
        ></HeaderIcon>
        <HeaderIcon
          icon={<Settings size={22} className="text-slate-400" />}
          onClick={() => setIsSettingsModalOpen(true)}
          title="Settings"
        ></HeaderIcon>
      </div>
      <Dialog
        isOpen={!!deleteCompleted}
        onClose={() => setDeleteCompleted(false)}
      >
        <ConfirmModal
          title="Eliminare i Task completati?"
          message="Questa azione è irreversibile. Saranno eliminati tutti i Task completati."
          onConfirm={confirmDeleteCompleted}
          onCancel={() => setDeleteCompleted(false)}
          confirmLabel="Elimina tutti"
        />
      </Dialog>
    </header>
  );
};

import { Keyboard, Eye, EyeOff, Settings } from "lucide-react";

export const Header = ({
  ACCENT_COLOR,
  showCompleted,
  setShowCompleted,
  isSettingsModalOpen,
  setIsSettingsModalOpen,
}) => {
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
          onClick={() => setShowCompleted(!showCompleted)}
          className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-all font-bold text-xs uppercase tracking-wider ${
            showCompleted
              ? "bg-white border-orange-200 text-orange-600"
              : "bg-orange-500 text-white shadow-lg shadow-orange-200"
          }`}
        >
          {showCompleted ? <Eye size={14} /> : <EyeOff size={14} />}
          {showCompleted ? "Nascondi completati" : "Mostra completati"}
        </button>
        <button
          name="Settings"
          className="p-2 hover:bg-slate-100 rounded-full transition-colors"
          onClick={() => setIsSettingsModalOpen(true)}
        >
          <Settings size={22} className="text-slate-400" />
        </button>
      </div>
    </header>
  );
};

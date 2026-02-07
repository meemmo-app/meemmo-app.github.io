import { useState } from "react";
import { Keyboard, Eye, EyeOff, Settings, Trash, Filter, Shrimp } from "lucide-react";
import { ConfirmModal } from "./ConfirmModal";
import { Dialog } from "./ui/Dialog";
import { TagFilter } from "./TagFilter";

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

const ExperienceLevel = ({ completedTasks }) => {
  // Calculate level and progress using a balanced formula
  // Each level requires (level * 5) tasks to advance (level 1: 5 tasks, level 2: 10 tasks, etc.)
  const calculateLevelAndProgress = (tasks) => {
    let level = 1;
    let totalExpForCurrentLevel = 0;
    let expNeededForNextLevel = 5; // Base amount for level 1
    
    // Calculate which level the user is currently at
    while (tasks >= totalExpForCurrentLevel + expNeededForNextLevel) {
      totalExpForCurrentLevel += expNeededForNextLevel;
      level++;
      expNeededForNextLevel = level * 5; // Each level requires level * 5 tasks
    }
    
    const currentLevelExp = tasks - totalExpForCurrentLevel;
    const progressPercentage = Math.min((currentLevelExp / expNeededForNextLevel) * 100, 100);
    
    return {
      level,
      progress: progressPercentage,
      currentExp: currentLevelExp,
      expNeeded: expNeededForNextLevel,
      totalExp: tasks
    };
  };

  const { level, progress, currentExp, expNeeded } = calculateLevelAndProgress(completedTasks);

  return (
    <div className="flex items-center gap-3 bg-white p-3 rounded-xl shadow-sm border border-orange-100">
      <Shrimp size={24} className="text-orange-500" />
      <div className="flex flex-col">
        <div className="flex items-center gap-2">
          <span className="font-bold text-sm">Lvl {level}</span>
          <span className="text-xs text-slate-500">{currentExp}/{expNeeded} XP</span>
        </div>
        <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-orange-400 to-orange-500 transition-all duration-300"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

const ToggleCompleteTaskVisibility = ({ showCompleted, setShowCompleted }) => {
  return (
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
  );
};

export const Header = ({
  selectedTag,
  setSelectedTag,
  allTags,

  ACCENT_COLOR,
  showCompleted,
  setShowCompleted,
  setIsSettingsModalOpen,
  deleteCompletedTasks,
  completedTasksCount, // Pass the completed tasks count as a prop
}) => {
  const [deleteCompleted, setDeleteCompleted] = useState(false);

  const confirmDeleteCompleted = () => {
    deleteCompletedTasks();
    setDeleteCompleted(false);
  };

  const tags = allTags();

  return (
    <header className="p-6 md:px-18 flex justify-between items-center max-w-full mx-auto">
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
        <ExperienceLevel completedTasks={completedTasksCount} />
        <TagFilter
          selectedTag={selectedTag}
          setSelectedTag={setSelectedTag}
          tags={tags}
        />
        <ToggleCompleteTaskVisibility
          showCompleted={showCompleted}
          setShowCompleted={setShowCompleted}
        />
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

import { useState } from "react";
import {
  Keyboard,
  Eye,
  EyeOff,
  Settings,
  Trash,
  Filter,
  Shrimp,
} from "lucide-react";
import { ConfirmModal } from "./ConfirmModal";
import { Dialog } from "./ui/Dialog";
import { TagFilter } from "./TagFilter";

const HeaderIcon = ({ icon, onClick, title }) => {
  return (
    <button
      title={title}
      className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-all cursor-pointer"
      onClick={onClick}
    >
      {icon}
    </button>
  );
};

const ExperienceLevel = ({ completedTasks }) => {
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
    const progressPercentage = Math.min(
      (currentLevelExp / expNeededForNextLevel) * 100,
      100,
    );

    return {
      level,
      progress: progressPercentage,
      currentExp: currentLevelExp,
      expNeeded: expNeededForNextLevel,
      totalExp: tasks,
    };
  };

  const { level, progress, currentExp, expNeeded } =
    calculateLevelAndProgress(completedTasks);

  return (
    <div className="flex items-center gap-3 bg-white dark:bg-slate-900 px-4 py-2 rounded-full shadow-none border border-orange-200 dark:border-slate-700 text-xs">
      <Shrimp size={16} className="text-orange-500 hide" />
      <div className="flex flex-col">
        <div className="flex items-center gap-2">
          <span className="font-bold ">Lvl {level}</span>
          <div className="w-32 h-2 bg-gray-200 dark:bg-slate-600 rounded-full overflow-hidden">
            <div
              className="h-full bg-linear-to-r from-orange-400 to-orange-500 transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <span className="text-xs text-slate-500 dark:text-slate-400">
            {currentExp}/{expNeeded} XP
          </span>
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
          ? "bg-white dark:bg-slate-900 border-orange-200 dark:border-slate-700 text-orange-600 dark:text-orange-500"
          : "bg-orange-500 border-orange-400 text-white shadow-lg shadow-orange-200 dark:shadow-slate-700"
      }`}
    >
      {showCompleted ? <Eye size={16} /> : <EyeOff size={16} />}
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
  mascotteExperimental,
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
        {mascotteExperimental ? (
          <div className="bg-white dark:bg-slate-900 p-0 flex items-center justify-center rounded-2xl w-13 h-13 shadow-sm border border-orange-100 dark:border-slate-700 text-3xl">
            <img src="/meemmo_mascotte.png"></img>
          </div>
        ) : (
          <div className="bg-white dark:bg-slate-900 p-2 rounded-2xl shadow-sm border border-orange-100 dark:border-slate-800 rotate-12 text-3xl">
            🦐
          </div>
        )}
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

      <ExperienceLevel completedTasks={completedTasksCount} />
      <div className="flex gap-3 items-center">
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
          icon={
            <Trash size={22} className="text-slate-500 dark:text-slate-400" />
          }
          onClick={() => setDeleteCompleted(true)}
          title="Delete completed tasks"
        ></HeaderIcon>
        <HeaderIcon
          icon={
            <Settings
              size={22}
              className="text-slate-500 dark:text-slate-400"
            />
          }
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

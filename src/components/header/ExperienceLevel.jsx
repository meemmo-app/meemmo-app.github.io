import React from "react";
import { Shrimp } from "lucide-react";

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

export default ExperienceLevel;
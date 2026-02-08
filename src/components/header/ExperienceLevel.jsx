import { React, useState } from "react";
import { motion, useAnimation, AnimatePresence } from "framer-motion";
import { Shrimp, X } from "lucide-react";

const ExperienceLevel = ({ completedTasks }) => {
  const [statsOpen, setStatsOpen] = useState(false);
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

  const toggleStatsOpen = () => {
    setStatsOpen((p) => (p = !p));
  };

  const { level, progress, currentExp, expNeeded } =
    calculateLevelAndProgress(completedTasks);

  return (
    <div onClick={toggleStatsOpen} className="relative">
      <div className="cursor-pointer flex items-center gap-3 bg-white dark:bg-slate-900 px-4 py-2 rounded-full shadow-none border border-orange-200 dark:border-slate-700 text-xs">
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
      {/* Overlay open */}
      {statsOpen && (
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: -20 }}
            transition={{
              type: "spring",
              stiffness: 400,
              damping: 30,
              mass: 0.8,
            }}
            className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 z-30 w-80 bg-white dark:bg-slate-900 p-4 rounded-xl shadow-lg border border-orange-200 dark:border-slate-700"
          >
            <div className="flex justify-between items-start mb-3">
              <div className="flex items-center gap-2">
                <Shrimp size={24} className="text-orange-500 animate-pulse" />
                <div>
                  <h3 className="font-bold text-slate-800 dark:text-white">
                    Il tuo Progresso
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-300">
                    Tieni duro, granchietto!
                  </p>
                </div>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setStatsOpen(false);
                }}
                className="cursor-pointer text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
              >
                <X size={18} />
              </button>
            </div>

            <div className="space-y-4">
              {/* Level Progress Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-linear-to-r from-orange-100 to-amber-100 dark:from-slate-700 dark:to-slate-800 p-4 rounded-xl border border-orange-200 dark:border-slate-600"
              >
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-bold text-slate-800 dark:text-white">
                    LIVELLO {level}
                  </span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-slate-600 rounded-full h-3 overflow-hidden">
                  <motion.div
                    className="h-full bg-linear-to-r from-orange-400 via-orange-500 to-amber-500"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                  ></motion.div>
                </div>
                <div className="flex justify-between mt-2 text-xs">
                  <span className="text-slate-600 dark:text-slate-300">
                    {currentExp} XP
                  </span>
                  <span className="text-slate-600 dark:text-slate-300">
                    {expNeeded} XP per il prossimo
                  </span>
                </div>
              </motion.div>

              {/* Stats Grid */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="grid grid-cols-2 gap-3"
              >
                <motion.div className="bg-white dark:bg-slate-700 p-3 rounded-lg border border-orange-100 dark:border-slate-600">
                  <div className="text-center">
                    <div className="text-xl font-bold text-orange-500">
                      {completedTasks}
                    </div>
                    <div className="text-xs text-slate-500 dark:text-slate-400">
                      Tasks Completati
                    </div>
                  </div>
                </motion.div>

                <motion.div className="bg-white dark:bg-slate-700 p-3 rounded-lg border border-amber-100 dark:border-slate-600">
                  <div className="text-center">
                    <div className="text-xl font-bold text-amber-500">
                      {progress}%
                    </div>
                    <div className="text-xs text-slate-500 dark:text-slate-400">
                      Progresso Livello
                    </div>
                  </div>
                </motion.div>
              </motion.div>

              {/* Next Goals */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="pt-1"
              >
                <h4 className="font-semibold text-slate-800 dark:text-white mb-2">
                  Prossime Sfide
                </h4>
                <ul className="space-y-2">
                  <motion.li
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 }}
                    className="flex items-center justify-between text-sm"
                  >
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-3 h-3 rounded-full ${progress === 100 ? "bg-green-500" : "bg-orange-400"}`}
                      ></div>
                      <span className="text-slate-700 dark:text-slate-300">
                        Lvl {level + 1}
                      </span>
                    </div>
                    <span className="text-slate-600 dark:text-slate-400">
                      {(level + 1) * 5} XP
                    </span>
                  </motion.li>
                  <motion.li
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 }}
                    className="flex items-center justify-between text-sm"
                  >
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-amber-400"></div>
                      <span className="text-slate-700 dark:text-slate-300">
                        Lvl {level + 2}
                      </span>
                    </div>
                    <span className="text-slate-600 dark:text-slate-400">
                      {(level + 2) * 5} XP
                    </span>
                  </motion.li>
                </ul>
              </motion.div>
            </div>
          </motion.div>
        </AnimatePresence>
      )}
    </div>
  );
};

export default ExperienceLevel;

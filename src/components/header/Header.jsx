import React, { useState } from "react";
import HeaderBranding from "./HeaderBranding";
import ExperienceLevel from "./ExperienceLevel";
import { TagFilter } from "../TagFilter";
import ToggleCompleteTaskVisibility from "./ToggleCompleteTaskVisibility";
import HeaderActions from "./HeaderActions";

const Header = ({
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
  const tags = allTags();

  const confirmDeleteCompleted = () => {
    deleteCompletedTasks();
    setDeleteCompleted(false);
  };

  return (
    <header className="p-6 md:px-18 flex justify-between items-center max-w-full mx-auto">
      <HeaderBranding
        ACCENT_COLOR={ACCENT_COLOR}
        mascotteExperimental={mascotteExperimental}
      />
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
        <HeaderActions
          setIsSettingsModalOpen={setIsSettingsModalOpen}
          deleteCompleted={deleteCompleted}
          setDeleteCompleted={setDeleteCompleted}
          confirmDeleteCompleted={confirmDeleteCompleted}
        />
      </div>
    </header>
  );
};

export default Header;

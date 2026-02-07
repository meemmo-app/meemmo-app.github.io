import React from "react";
import { Layout } from "lucide-react";
import Badge from "../ui/Badge";
import { GLASSBASE } from "../../constants/styles";

const BacklogIcon = ({
  onDrop,
  onDragOver,
  onDragLeave,
  isOver,
  onClick,
  count,
}) => {
  return (
    <div
      className={`
        ${GLASSBASE} rounded-full
        fixed bottom-6 right-4 z-40 transition-all duration-300 cursor-pointer hover:scale-105 active:scale-95 text-white/90 hover:text-white
        ${isOver ? "scale-115 rotate-12 border border-white/30" : ""}
      `}
      onDrop={onDrop}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onClick={onClick}
      title="Open the Backlog or Drag & Drop a Task to put it into the Backlog"
      data-testid="backlog-icon"
    >
      {count !== 0 && (
        <div className="absolute -top-1 -right-1">
          <Badge number={count} dataTestid="backlog-badge" />
        </div>
      )}
      <div
        className={`
        w-auto py-2 px-4 rounded-full shadow-lg transition-all duration-200 flex flex-row items-center gap-2
      `}
      >
        <Layout size={28} className="transition-transform duration-500" />
        <span className="text-sm font-medium ">Backlog</span>
      </div>
    </div>
  );
};

export default BacklogIcon;
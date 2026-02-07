import React from "react";
import { Layout } from "lucide-react";
import ModalHeader from "./ui/ModalHeader";
import { GLASSBASE } from "../constants/styles";
import Badge from "./ui/Badge";

const BacklogEmptyMessage = () => {
  return (
    <div
      className="flex flex-col items-center justify-center text-white/90 space-y-4"
      data-testid="backlog-empty-message"
    >
      <Layout size={60} strokeWidth={1} />
      <p className="text-lg font-medium">Backlog vuoto</p>
      <p className="text-sm text-white/80 max-w text-center">
        Trascina i task sull'icona per metterli in attesa. Potrai riassegnarli
        più tardi.
      </p>
    </div>
  );
};

const Backlog = ({ isOpen, onClose, children }) => {
  return (
    <div
      className={`
        ${GLASSBASE} p-8 rounded-3xl rounded-b-none
      fixed bottom-0 left-50 right-50 w-2/3 z-40 transition-all duration-300
      ${isOpen ? "h-[40vh] translate-y-0" : "h-16 translate-y-[calc(40vh-4rem)]"}
    `}
      data-testid="backlog-drawer"
    >
      {/* Backlog Header */}
      <div className="px-0">
        <ModalHeader
          title={"Backlog"}
          subtitle={"Task in attesa...trascinali nelle varie sezioni"}
          onClose={onClose}
          icon={<Layout size={42} className="text-white/90" />}
          dataTestId="backlog-header-close-button"
        ></ModalHeader>
      </div>

      {/* Backlog Content */}
      <div
        className="flex-1 overflow-y-scroll h-[30vh] pb-8 custom-scrollbar scroll-smooth"
        data-testid="backlog-content"
      >
        {React.Children.count(children) === 0 ? (
          <BacklogEmptyMessage />
        ) : (
          <div className="space-y-3" data-testid="backlog-tasks-container">
            {children}
          </div>
        )}
      </div>
    </div>
  );
};

// Backlog Icon component (always visible at bottom)
export const BacklogIcon = ({
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

export default Backlog;

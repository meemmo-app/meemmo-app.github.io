import React from "react";
import { Layout } from "lucide-react";
import ModalHeader from "../ui/ModalHeader";
import { GLASSBASE } from "../../constants/styles";
import BacklogEmptyMessage from "./BacklogEmptyMessage";

const BacklogDrawer = ({ isOpen, onClose, children }) => {
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
        />
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

export default BacklogDrawer;
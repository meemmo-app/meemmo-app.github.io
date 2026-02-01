import React, { useState, useRef, useEffect } from "react";
import { Layout, Plus } from "lucide-react";
import ModalHeader from "./ui/ModalHeader";
import { GLASSBASE } from "../constants/styles";

const Backlog = ({ isOpen, onClose, onDrop, children, isOver }) => {
  return (
    <div
      className={`
        ${GLASSBASE} p-8 rounded-3xl rounded-b-none
      fixed bottom-0 left-50 right-50 w-2/3 z-40 transition-all duration-300
      ${isOpen ? "h-[40vh] translate-y-0" : "h-16 translate-y-[calc(40vh-4rem)]"}
    `}
    >
      {/* Backlog Header */}
      <div className="px-0">
        <ModalHeader
          title={"Backlog"}
          subtitle={"Task in attesa...trascinali nelle varie sezioni"}
          onClose={onClose}
          icon={<Layout size={42} className="text-white/90" />}
        ></ModalHeader>
      </div>

      {/* Backlog Content */}
      <div className="flex-1 overflow-y-scroll h-[30vh] pb-8">
        {React.Children.count(children) === 0 ? (
          <div className="flex flex-col items-center justify-center text-slate-300 space-y-4">
            <Layout size={60} strokeWidth={1} className="text-slate-300" />
            <p className="text-lg font-medium text-slate-400">Backlog vuoto</p>
            <p className="text-sm text-slate-500 max-w text-center">
              Trascina i task qui per metterli in attesa. Potrai riassegnarli
              più tardi.
            </p>
          </div>
        ) : (
          <div className="space-y-3">{children}</div>
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
    >
      {count !== 0 && (
        <div className="absolute -top-1 -right-1 py-1 px-2 text-xs font-bold bg-orange-500 rounded-full">
          {count}
        </div>
      )}
      <div
        className={`
        w-auto  py-2 px-4 rounded-full shadow-lg transition-all duration-200 flex flex-row items-center gap-2
      `}
      >
        <Layout size={28} className="transition-transform duration-500" />
        <span className="text-sm font-medium ">Backlog</span>
      </div>
    </div>
  );
};

export default Backlog;

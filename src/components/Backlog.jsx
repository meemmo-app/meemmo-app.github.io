import React, { useState, useRef, useEffect } from "react";
import { Layout, Plus } from "lucide-react";
import ModalHeader from "./ui/ModalHeader";

const Backlog = ({ isOpen, onClose, onDrop, children, isOver }) => {
  return (
    <div
      className={`
      fixed bottom-0 left-50 right-50 w-2/3 z-40 transition-all duration-300
      ${isOpen ? "h-[40vh] translate-y-0" : "h-16 translate-y-[calc(40vh-4rem)]"}
      bg-white/95 backdrop-blur-lg border-t border-slate-200 rounded-t-3xl
      shadow-2xl shadow-slate-900/20
    `}
    >
      {/* Backlog Header */}
      <div className="flex items-center justify-between p-6 border-b border-slate-200">
        <div className="flex items-center gap-3">
          <div className="bg-orange-500 text-white p-2 rounded-xl">
            <Layout size={20} />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-800">Backlog</h2>
            <p className="text-sm text-slate-500">Task in attesa</p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="text-slate-400 hover:text-slate-600 transition-colors"
        >
          ✕
        </button>
      </div>

      {/* Backlog Content */}
      <div className="flex-1 overflow-y-scroll h-[30vh] p-6">
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
}) => {
  return (
    <div
      className={`
        fixed bottom-4 right-4 z-40 transition-all duration-200 cursor-pointer
        ${isOver ? "scale-110 rotate-12" : ""}
      `}
      onDrop={onDrop}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onClick={onClick}
    >
      <div
        className={`
        bg-white p-4 rounded-2xl shadow-lg border-2 transition-all duration-200
        ${isOver ? "border-orange-500 bg-orange-50" : "border-slate-200"}
      `}
      >
        <div className="flex flex-col items-center gap-2">
          <div
            className={`
            bg-orange-500 text-white p-3 rounded-xl transition-all duration-200
            ${isOver ? "bg-orange-600 scale-110" : ""}
          `}
          >
            <Layout size={24} />
          </div>
          <span className="text-xs font-medium text-slate-600">Backlog</span>
        </div>
      </div>
    </div>
  );
};

export default Backlog;

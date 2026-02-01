import React from "react";
import { AlertTriangle } from "lucide-react";
import { GLASSBASE } from "../constants/styles";

export const ConfirmModal = ({
  title,
  message,
  onConfirm,
  onCancel,
  confirmLabel = "Elimina",
  confirmColor = "bg-red-500/90",
}) => {
  return (
    <div
      className={`
        ${GLASSBASE} rounded-3xl p-8 relative`}
    >
      <div className="flex flex-col items-center text-center space-y-4">
        {/* Icona di Avviso */}
        <div className="w-16 h-16 bg-red-500/40 rounded-full flex items-center justify-center border border-red-500 text-red-500">
          <AlertTriangle size={32} />
        </div>

        <div className="space-y-2">
          <h2 className="text-xl font-black text-white">{title}</h2>
          <p className="text-sm text-white/60 leading-relaxed">{message}</p>
        </div>

        <div className="flex flex-col md:flex-row w-full gap-3 pt-4">
          <button
            onClick={onConfirm}
            tabIndex={0}
            className={`w-full py-4 ${confirmColor} hover:brightness-110 text-white rounded-2xl font-black text-sm uppercase tracking-widest transition-all active:scale-95 shadow-lg shadow-red-500/20`}
          >
            {confirmLabel}
          </button>

          <button
            onClick={onCancel}
            tabIndex={0}
            className="w-full py-4 bg-white/5 hover:bg-white/10 text-white/60 rounded-2xl font-black text-sm uppercase tracking-widest transition-all border border-white/10"
          >
            Annulla
          </button>
        </div>
      </div>
    </div>
  );
};

import React from "react";

const Switch = ({ option, setOption, iconOn, iconOff, title, subtitle }) => {
  return (
    <div className="bg-black/50 p-4 rounded-3xl border border-white/10 mb-8 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div
          className={`p-2 rounded-xl ${
            option ? "bg-orange-500 text-white" : "bg-slate-200 text-slate-500"
          }`}
        >
          {option ? iconOn : iconOff}
        </div>
        <div>
          <p className="font-bold text-white text-sm">{title}</p>
          {subtitle && (
            <p className="text-xs text-white/90 tracking-tight">{subtitle}</p>
          )}
        </div>
      </div>
      <button
        onClick={() => setOption(!option)}
        className={`cursor-pointer w-12 h-6 rounded-full transition-all relative ${
          option ? "bg-orange-500" : "bg-slate-300 dark:bg-slate-700"
        }`}
      >
        <div
          className={`absolute top-1 w-4 h-4 bg-white dark:bg-slate-50 rounded-full transition-all ${
            option ? "left-7" : "left-1"
          }`}
        />
      </button>
    </div>
  );
};

export default Switch;
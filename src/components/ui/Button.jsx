import React from "react";

export function ButtonPrimary({ text, onClick }) {
  return (
    <button
      onClick={onClick}
      className="cursor-pointer w-full my-2 py-4 bg-black/90 dark:bg-slate-50/80 text-white dark:text-slate-900 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-black/70 dark:hover:bg-slate-50/70 transition-all"
    >
      {text}
    </button>
  );
}

export function ButtonSecondary({ text, onClick, icon }) {
  return (
    <button
      onClick={onClick}
      className="flex flex-row gap-2 items-center justify-center cursor-pointer w-full my-2 py-4 px-4 bg-white/40 dark:bg-slate-700/80 border border-white/10 text-black/90 dark:text-slate-50 rounded-2xl font-black text-sm tracking-wide uppercase hover:bg-white/50 dark:hover:bg-slate-700/90 transition-all"
    >
      {icon} {text}
    </button>
  );
}

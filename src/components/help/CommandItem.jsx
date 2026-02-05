import React from "react";

const CommandItem = ({ keys, description }) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-3 p-3 rounded-xl border border-white/10 bg-black/20">
      <div className="flex gap-2 items-center flex-shrink-0">
        <span className="bg-white/10 px-2 py-1 rounded text-xs font-black text-slate-300 border border-white/10">
          {keys}
        </span>
      </div>
      <p className="text-sm text-white/90">{description}</p>
    </div>
  );
};

export default CommandItem;
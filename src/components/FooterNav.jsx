export const FooterNav = () => {
  return (
    <footer className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-slate-900 text-white px-6 py-3 rounded-full shadow-2xl flex gap-6 text-xs font-medium z-40 border border-slate-700 whitespace-nowrap">
      <div className="flex gap-2 items-center">
        <span className="bg-slate-700 px-1.5 py-0.5 rounded text-[10px] font-bold text-orange-400">
          SPACE
        </span>{" "}
        Crea
      </div>
      <div className="flex gap-2 items-center">
        <span className="bg-slate-700 px-1.5 py-0.5 rounded text-[10px] font-bold text-orange-400">
          J/K
        </span>{" "}
        Naviga Tasks
      </div>
      <div className="flex gap-2 items-center">
        <span className="bg-slate-700 px-1.5 py-0.5 rounded text-[10px] font-bold text-orange-400">
          H/L
        </span>{" "}
        Naviga Quarti
      </div>
      <div className="flex gap-2 items-center">
        <span className="bg-slate-700 px-1.5 py-0.5 rounded text-[10px] font-bold text-orange-400">
          D
        </span>{" "}
        Completa
      </div>
      <div className="flex gap-2 items-center">
        <span className="bg-slate-700 px-1.5 py-0.5 rounded text-[10px] font-bold text-red-400">
          X
        </span>{" "}
        Elimina
      </div>
    </footer>
  );
};

import React from "react";

const HeaderBranding = ({ ACCENT_COLOR, mascotteExperimental }) => {
  return (
    <div className="flex items-center gap-3">
      {mascotteExperimental ? (
        <div className="bg-white dark:bg-slate-900 p-0 flex items-center justify-center rounded-2xl w-13 h-13 shadow-sm border border-orange-100 dark:border-slate-700 text-3xl">
          <img src="/meemmo_mascotte.png" alt="Mascotte" />
        </div>
      ) : (
        <div className="bg-white dark:bg-slate-900 p-2 rounded-2xl shadow-sm border border-orange-100 dark:border-slate-800 rotate-12 text-3xl">
          🦐
        </div>
      )}
      <div>
        <h1
          className="text-3xl font-black tracking-tight"
          style={{ color: ACCENT_COLOR }}
        >
          MEEMMO
        </h1>
        <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">
          Organizza la tua giornata
        </p>
      </div>
    </div>
  );
};

export default HeaderBranding;
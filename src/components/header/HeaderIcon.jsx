import React from "react";

const HeaderIcon = ({ icon, onClick, title }) => {
  return (
    <button
      title={title}
      className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-all cursor-pointer"
      onClick={onClick}
    >
      {icon}
    </button>
  );
};

export default HeaderIcon;
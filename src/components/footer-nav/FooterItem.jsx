import React from "react";

const FooterItem = ({ keys, description }) => {
  return (
    <div className="flex gap-2 items-center">
      <span className="bg-white/10 px-1.5 py-0.5 rounded text-[10px] font-black text-slate-300 border border-white/10">
        {keys}
      </span>
      {description}
    </div>
  );
};

export default FooterItem;
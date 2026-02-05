import React from "react";

const FeatureItem = ({ title, description, icon }) => {
  return (
    <div className="flex items-start gap-3 p-3 rounded-xl border border-white/10 bg-black/20">
      <div className="text-orange-400 flex-shrink-0">
        {icon}
      </div>
      <div>
        <h3 className="font-bold text-white text-sm">{title}</h3>
        <p className="text-xs text-white/80">{description}</p>
      </div>
    </div>
  );
};

export default FeatureItem;
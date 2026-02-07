import React from "react";
import { Shrimp } from "lucide-react";

const ProductivityIndicator = ({ section, percentage, completed, total }) => {
  // Create shrimp emoji visualization (5 shrimp total)
  const TOTAL_SHRIMP = 5;
  const filledShrimp = Math.round((percentage / 100) * TOTAL_SHRIMP);

  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center gap-2">
        {/* Shrimp emoji visualization */}
        <div className="flex gap-1">
          {Array.from({ length: TOTAL_SHRIMP }).map((_, index) => (
            <Shrimp
              size={14}
              className="text-gray-400"
              style={{
                color: index < filledShrimp ? section.color : undefined,
              }}
            />
          ))}
        </div>

        {/* Percentage text */}
        <span className="text-xs font-medium text-slate-500">
          {percentage}%
        </span>
      </div>
    </div>
  );
};

export default ProductivityIndicator;
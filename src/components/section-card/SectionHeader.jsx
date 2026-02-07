import React from "react";
import { Hash } from "lucide-react";
import SectionHours from "./SectionHours";
import ProductivityIndicator from "./ProductivityIndicator";
import CurrentSectionMarker from "./CurrentSectionMarker";

const SectionHeader = ({
  section,
  isFocused,
  isCurrentTime,
  taskCounter,
  productivity,
}) => {
  return (
    <div
      className={`p-6 flex items-center justify-between ${isCurrentTime ? "bg-orange-50/50 dark:bg-slate-800/50" : ""}`}
    >
      <div className="flex-1">
        <div className="flex items-center justify-between">
          <h2
            className="text-xl inline-flex items-baseline gap-2 font-bold not-dark:text-slate-700 dark:text-slate-100"
            style={{ color: isFocused ? section.color : undefined }}
          >
            {section.label}
            <span className="inline-flex items-baseline text-lg font-normal">
              <Hash size={12} /> {taskCounter}
            </span>
          </h2>
        </div>

        <div className="flex flex-col gap-1 mt-1">
          <SectionHours sectionHours={section.hours} />
          <div className="flex items-center justify-between">
            <ProductivityIndicator
              section={section}
              percentage={productivity.percentage}
              completed={productivity.completed}
              total={productivity.total}
            />
          </div>
        </div>
      </div>
      {isCurrentTime && (
        <div className="ml-2">
          <CurrentSectionMarker color={section.color} />
        </div>
      )}
    </div>
  );
};

export default SectionHeader;
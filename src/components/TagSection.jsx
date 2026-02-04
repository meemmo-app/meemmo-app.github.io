import React from "react";

export const TagSection = ({ tags }) => {
  if (!tags || tags.length === 0) return null;
  return (
    <div className="flex flex-wrap gap-2">
      {tags.map((tag, idx) => (
        <span
          key={idx}
          className="text-orange-400 bg-orange-400/10 uppercase font-bold tracking-wide px-2 py-0.5 rounded-md border border-orange-400/40"
        >
          #{tag}
        </span>
      ))}
    </div>
  );
};

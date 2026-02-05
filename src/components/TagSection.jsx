import React from "react";

export const TagSection = ({ tags, onRemoveTag }) => {
  if (!tags || tags.length === 0) return null;
  return (
    <div className="flex flex-wrap gap-2">
      {tags.map((tag, idx) => (
        <div
          key={idx}
          className="flex items-center text-orange-400 bg-orange-400/10 uppercase font-bold tracking-wide px-2 py-0.5 rounded-md border border-orange-400/40"
        >
          #{tag}
          {onRemoveTag && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onRemoveTag(tag);
              }}
              data-testid={`remove-tag-${tag}`}
              className="ml-1 text-xs hover:bg-orange-500/30 rounded-full w-4 h-4 flex items-center justify-center"
              title="Remove tag"
            >
              ×
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

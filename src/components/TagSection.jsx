import React from 'react';

export const TagSection = ({ tags }) => {
  if (!tags || tags.length === 0) return null;
  return (
    <div className="mb-2 flex flex-wrap gap-2">
      {tags.map((tag, idx) => (
        <span
          key={idx}
          className="px-2 py-1 bg-orange-200 text-orange-800 rounded-full text-xs font-medium"
        >
          #{tag}
        </span>
      ))}
    </div>
  );
};

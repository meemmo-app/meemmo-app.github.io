import React from "react";

// --- TextAreaField Component ---
const TextAreaField = ({ value, onChange, placeholder, testId }) => (
  <textarea
    className="w-full bg-black/40 border border-white/10 rounded-2xl p-4 text-white focus:ring-2 focus:ring-orange-500 focus:bg-black/60 outline-none placeholder:text-white/40 resize-none h-28 transition-all shadow-inner"
    placeholder={placeholder}
    value={value}
    onChange={onChange}
    data-testid={testId}
  />
);

export default TextAreaField;
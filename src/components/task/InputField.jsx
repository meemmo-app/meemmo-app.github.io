import React from "react";

// --- InputField Component ---
const InputField = ({ value, onChange, placeholder, autoFocus, testId }) => (
  <input
    autoFocus={autoFocus}
    className="w-full text-xl font-bold bg-black/40 border border-white/10 rounded-2xl p-4 text-white focus:ring-2 focus:ring-orange-500 focus:bg-black/60 outline-none placeholder:text-white/40 transition-all shadow-inner"
    placeholder={placeholder}
    value={value}
    onChange={onChange}
    data-testid={testId}
  />
);

export default InputField;
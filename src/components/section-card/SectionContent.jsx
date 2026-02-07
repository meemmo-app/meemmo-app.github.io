import React from "react";
import { Layout } from "lucide-react";

const SectionContent = ({ children }) => {
  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar scroll-smooth">
      {React.Children.count(children) === 0 ? (
        <div className="h-full flex flex-col items-center justify-center text-slate-300 opacity-50 space-y-2 py-8">
          <Layout size={40} strokeWidth={1} />
          <p className="text-sm font-medium italic">Nessun task 🦐</p>
        </div>
      ) : (
        children
      )}
    </div>
  );
};

export default SectionContent;
import React, { useState, useRef, useEffect } from "react";
import { Filter, ChevronDown, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export const TagFilter = ({ selectedTag, setSelectedTag, tags }) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  // Chiude il menu se si clicca fuori
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (tag) => {
    setSelectedTag(tag === "all" ? "" : tag);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={containerRef}>
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        data-testid="tag-filter-trigger"
        className={`cursor-pointer flex items-center px-4 py-2 rounded-full border transition-all duration-300 active:scale-95
          ${
            !selectedTag
              ? "bg-white border-orange-200 text-orange-600"
              : "bg-orange-500 border-orange-400 text-white shadow-lg shadow-orange-500/30"
          }
        `}
      >
        <Filter size={14} className="mr-2" />
        <span className="text-xs font-bold uppercase">
          {selectedTag || "Tutti i tag"}
        </span>
      </button>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 5, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="absolute right-0 mt-2 w-56 p-1.5 z-[100] bg-slate-900/90 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.5)] overflow-hidden"
          >
            <div className="flex flex-col gap-0.5">
              {/* Option: All Tags */}
              <button
                onClick={() => handleSelect("all")}
                className={`flex items-center justify-between px-3 py-2 rounded-xl text-xs font-bold transition-colors
                  ${!selectedTag ? "bg-orange-500 text-white" : "text-white/60 hover:bg-white/10 hover:text-white"}
                `}
              >
                TUTTI I TAG
                {!selectedTag && <Check size={14} />}
              </button>

              <div className="h-[1px] bg-white/5 my-1" />

              {/* Tag Options */}
              {tags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => handleSelect(tag)}
                  className={`flex items-center justify-between px-3 py-2 rounded-xl text-xs font-bold transition-colors
                    ${selectedTag === tag ? "bg-orange-500 text-white" : "text-white/60 hover:bg-white/10 hover:text-white"}
                  `}
                >
                  {tag.toUpperCase()}
                  {selectedTag === tag && <Check size={14} />}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

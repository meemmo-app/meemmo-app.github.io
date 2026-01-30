import { useState, useEffect } from "react";
import { SECTIONS } from "../constants/sections";

export function useSections() {
  const [sections, setSections] = useState(() => {
    const saved = localStorage.getItem("meemmo-sections");
    return saved ? JSON.parse(saved) : SECTIONS; // DEFAULT_SECTIONS è il tuo array originale
  });

  const [isDynamicColumns, setIsDynamicColumns] = useState(() => {
    const saved = localStorage.getItem("meemmo-dynamic");
    return saved ? JSON.parse(saved) : false;
  });

  const getActiveSectionId = () => {
    const hour = new Date().getHours();
    return sections.find((s) => s.hours.includes(hour))?.id || "morning-1";
  };

  const sectionCount = sections.length - 1;

  useEffect(() => {
    localStorage.setItem("meemmo-sections", JSON.stringify(sections));
    localStorage.setItem("meemmo-dynamic", JSON.stringify(isDynamicColumns));
  }, [sections, isDynamicColumns]);

  return {
    sections,
    setSections,
    getActiveSectionId,
    sectionCount,
    isDynamicColumns,
    setIsDynamicColumns,
  };
}

import { useState, useEffect } from "react";
import { SECTIONS } from "../constants/sections";
import { ACCENT_COLOR } from "../constants/sections";

const ORANGE_COLOR = "#ed8936";

export function useSections() {
  const [sections, setSections] = useState(() => {
    const saved = localStorage.getItem("meemmo-sections");
    let parsedSections = saved ? JSON.parse(saved) : SECTIONS;

    // Add default color to sections if they don't have one
    parsedSections = parsedSections.map((section) => ({
      ...section,
      color: section.color || ORANGE_COLOR,
    }));

    return parsedSections;
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

  const resetSectionColor = (id) => {
    setSections(
      sections.map((s) => (s.id === id ? { ...s, color: ORANGE_COLOR } : s)),
    );
  };

  return {
    sections,
    setSections,
    getActiveSectionId,
    sectionCount,
    isDynamicColumns,
    setIsDynamicColumns,
    resetSectionColor,
  };
}

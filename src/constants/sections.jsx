export const SECTIONS = [
  { id: "morning-1", label: "Prima Mattina", hours: [6, 7, 8, 9, 10, 11] },
  { id: "morning-2", label: "Tarda Mattina", hours: [12, 13, 14] },
  { id: "afternoon-1", label: "Pomeriggio", hours: [15, 16, 17, 18] },
  {
    id: "afternoon-2",
    label: "Sera",
    hours: [19, 20, 21, 22, 23, 0, 1, 2, 3, 4, 5],
  },
];

export const ACCENT_COLOR = "#ff6347";

export const getActiveSectionId = () => {
  const hour = new Date().getHours();
  return SECTIONS.find((s) => s.hours.includes(hour))?.id || "morning-1";
};

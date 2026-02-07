import { useState, useEffect } from "react";

export function useTheme() {
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem("dark");
    return saved ? saved : false;
  });

  useEffect(() => {
    localStorage.setItem("dark", theme);
  }, [theme]);

  return {
    theme,
    setTheme,
  };
}

import { useState, useEffect } from "react";

export function useTheme() {
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem("dark");
    return saved ? saved === "true" : false;
  });

  useEffect(() => {
    // Apply theme to document element
    if (theme) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    
    // Save to localStorage
    localStorage.setItem("dark", theme.toString());
  }, [theme]);

  return {
    theme,
    setTheme,
  };
}

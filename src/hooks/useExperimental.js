import { useState, useEffect } from "react";

const DEFAULT = {
  sprite: false,
};

export function useExperimental() {
  const [experimental, setExperimental] = useState(() => {
    const saved = localStorage.getItem("meemmo-experimental");
    return saved ? JSON.parse(saved) : DEFAULT; // DEFAULT_SECTIONS è il tuo array originale
  });

  const getSpriteExperimental = () => {
    return experimental.sprite;
  };

  const setSpriteExperimental = (value) => {
    setExperimental({ sprite: value });
  };

  useEffect(() => {
    localStorage.setItem("meemmo-sections", JSON.stringify(experimental));
  }, [experimental]);

  return {
    experimental,
    setExperimental,
    getSpriteExperimental,
    setSpriteExperimental,
  };
}

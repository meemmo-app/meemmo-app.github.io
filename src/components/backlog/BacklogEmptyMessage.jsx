import React from "react";
import { Layout } from "lucide-react";

const BacklogEmptyMessage = () => {
  return (
    <div
      className="flex flex-col items-center justify-center text-white/90 space-y-4"
      data-testid="backlog-empty-message"
    >
      <Layout size={60} strokeWidth={1} />
      <p className="text-lg font-medium">Backlog vuoto</p>
      <p className="text-sm text-white/80 max-w text-center">
        Trascina i task sull'icona per metterli in attesa. Potrai riassegnarli
        più tardi.
      </p>
    </div>
  );
};

export default BacklogEmptyMessage;
import React from "react";
import { GLASSBASE } from "../../constants/styles";
import FooterItem from "./FooterItem";

const ShortcutsPanel = ({ isOpen }) => {
  return (
    <div
      className={`
        ${GLASSBASE}
        flex items-center overflow-hidden transition-all duration-500 cubic-bezier(0.4, 0, 0.2, 1)
        ${
          isOpen
            ? "max-w-250 px-6 py-3 rounded-3xl opacity-100"
            : "max-w-0 px-0 py-3 rounded-3xl opacity-0 pointer-events-none border-none"
        }
      `}
    >
      <div className="flex gap-6 items-center whitespace-nowrap text-white/90 text-xs font-medium">
        <FooterItem keys={"Space"} description={"Crea"} />
        <FooterItem keys={"J/K"} description={"Scorri Tasks"} />
        <FooterItem keys={"H/L"} description={"Scorri Quarti"} />
        <FooterItem keys={"E"} description={"Modifica"} />
        <FooterItem keys={"D"} description={"Completa"} />
        <FooterItem keys={"X"} description={"Elimina"} />
      </div>
    </div>
  );
};

export default ShortcutsPanel;
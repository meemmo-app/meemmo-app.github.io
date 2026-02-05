import React from "react";
import {
  X,
  Command,
  Mic,
  MousePointer2,
  Info,
  Calendar,
  Filter,
  Settings,
} from "lucide-react";
import { GLASSBASE } from "../../constants/styles";
import ModalHeader from "../ui/ModalHeader";
import { Dialog } from "../ui/Dialog";

const HelpOverlay = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  // Define commands organized by category
  const commands = [
    // Navigation
    {
      keys: "← → / H L",
      description: "Naviga tra le sezioni",
      category: "Navigazione",
    },
    {
      keys: "↓ ↑ / J K",
      description: "Naviga tra i task di una sezione",
    },
    { keys: "?", description: "Apri questa guida" },

    // Task Management
    {
      keys: "Spazio",
      description: "Aggiungi un nuovo task",
      category: "Creazione Task",
    },
    {
      keys: "P",
      description: "Attiva/disattiva priorità task",
    },
    {
      keys: "D",
      description: "Contrassegna come completato",
      category: "Gestione Task",
    },
    {
      keys: "E",
      description: "Modifica il task selezionato",
    },
    { keys: "X", description: "Elimina il task selezionato" },
  ];

  // Define features
  const features = [
    {
      title: "Comandi Vocali",
      description:
        "Tieni premuto il pulsante del microfono per dettare i tuoi task",
      icon: <Mic size={20} />,
    },
    {
      title: "Drag & Drop Task",
      description: "Sposta i task nelle sezioni usando facendo drag & drop",
      icon: <MousePointer2 size={20} />,
    },
    {
      title: "Sezioni Temporali",
      description: "Organizza i task in base all'ora della giornata",
      icon: <Calendar size={20} />,
    },
    {
      title: "Sistema di Tag",
      description: "Categorizza i task con tag per una migliore organizzazione",
      icon: <Info size={20} />,
    },
    {
      title: "Filtro Tag",
      description: "Filtra i task per categoria utilizzando i tag",
      icon: <Filter size={20} />,
    },
    {
      title: "Personalizzazione",
      description:
        "Personalizza le sezioni temporali e le impostazioni dell'app",
      icon: <Settings size={20} />,
    },
  ];

  return (
    <Dialog isOpen={isOpen} onClose={onClose} size="xl">
      <div
        className={`relative ${GLASSBASE} rounded-3xl w-full max-h-[90vh] overflow-y-scroll custom-scrollbar p-6`}
      >
        <ModalHeader
          title="Comandi & Funzionalità"
          subtitle="Scorciatoie da tastiera e funzionalità dell'app"
          onClose={onClose}
          icon={<Command size={32} className="text-white/90" />}
        />
        <div className="grid grid-cols-1 lg:grid-cols-2">
          {/* Left side - Commands */}
          <div className="p-6 border-r border-white/10 flex flex-col">
            <div className="flex-1 overflow-y-auto custom-scrollbar pb-6">
              <h3 className="font-bold text-white text-lg mb-4">
                Comandi da Tastiera
              </h3>
              <div className="space-y-2">
                {commands.map((cmd, index) => (
                  <div key={index} className="mb-4 last:mb-0">
                    <h4 className="text-orange-400 font-bold text-sm uppercase tracking-wide mb-2">
                      {cmd.category}
                    </h4>
                    <div className="pl-2">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-3 p-3 rounded-xl border border-white/10 bg-black/20">
                        <div className="flex gap-2 items-center flex-shrink-0">
                          <span className="bg-white/10 px-2 py-1 rounded text-xs font-black text-slate-300 border border-white/10">
                            {cmd.keys}
                          </span>
                        </div>
                        <p className="text-sm text-white/90">
                          {cmd.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right side - Features */}
          <div className="p-6 flex flex-col">
            <div className="mb-6">
              <h3 className="font-bold text-white text-lg">
                Funzionalità Principali
              </h3>
            </div>

            <div className="flex-1 overflow-y-auto custom-scrollbar">
              <div className="space-y-3">
                {features.map((feature, index) => (
                  <div key={index} className="mb-4 last:mb-0">
                    <div className="flex items-start gap-3 p-3 rounded-xl border border-white/10 bg-black/20">
                      <div className="text-orange-400 flex-shrink-0">
                        {feature.icon}
                      </div>
                      <div>
                        <h3 className="font-bold text-white text-sm">
                          {feature.title}
                        </h3>
                        <p className="text-xs text-white/80">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Dialog>
  );
};

export default HelpOverlay;

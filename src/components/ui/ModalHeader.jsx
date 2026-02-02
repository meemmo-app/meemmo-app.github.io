import { X } from "lucide-react";

function ModalHeader({ title, subtitle, onClose, icon }) {
  return (
    <div
      className={
        icon ? "flex flex-row items-center-safe mb-8 w-full gap-2" : "mb-8"
      }
    >
      {icon}
      <div className="flex justify-between items-center w-full">
        <div>
          <h2 className="text-2xl font-black text-white tracking-tight">
            {title}
          </h2>
          {subtitle && (
            <p className="text-xs font-bold text-white/50 uppercase">
              {subtitle}
            </p>
          )}
        </div>
        <button
          data-testid="cypress-close-modal"
          onClick={onClose}
          className="p-2 hover:bg-white/10 rounded-full transition-all cursor-pointer active:scale-90 group"
        >
          <X size={22} className="text-white/60 group-hover:text-white" />
        </button>
      </div>
    </div>
  );
}

export default ModalHeader;

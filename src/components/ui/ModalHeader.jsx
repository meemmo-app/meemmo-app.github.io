import { X } from "lucide-react";

function ModalHeader({ title, subtitle, onClose }) {
  return (
    <div className="flex justify-between items-center mb-8">
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
        onClick={onClose}
        className="p-2 hover:bg-white/10 rounded-full transition-all active:scale-90 group"
      >
        <X size={22} className="text-white/60 group-hover:text-white" />
      </button>
    </div>
  );
}

export default ModalHeader;

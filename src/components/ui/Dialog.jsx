import { motion } from "framer-motion";

export const Dialog = ({ isOpen, onClose, children, size = "md" }) => {
  if (!isOpen) return null;

  // Define size classes
  const sizeClasses = {
    sm: "max-w-md",
    md: "max-w-lg",
    lg: "max-w-2xl",
    xl: "max-w-4xl",
    full: "max-w-full",
  };

  const sizeClass = sizeClasses[size] || sizeClasses.md;

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center backdrop-blur-sm p-4">
      <div className="absolute inset-0" onClick={onClose} />

      <motion.div
        // Entrata: da piccolo e basso verso il centro
        initial={{ opacity: 0.7, scale: 0.9, y: 0 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        // Uscita: torna piccolo e scivola verso il basso
        exit={{ opacity: 0.7, scale: 0.9, y: 0 }}
        transition={{
          type: "spring",
          stiffness: 600,
          damping: 28,
          mass: 0.8,
        }}
        className={`rounded-3xl shadow-2xl w-full ${sizeClass} max-h-[90vh] `}
      >
        {children}
      </motion.div>
    </div>
  );
};

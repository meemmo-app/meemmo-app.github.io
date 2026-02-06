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
        // Apple-style entrance: smooth scale up with subtle fade
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        // Apple-style exit: smooth scale down with fade and slight movement
        exit={{ opacity: 0, scale: 0.8, y: 20 }}
        transition={{
          type: "spring",
          stiffness: 400,
          damping: 30,
          mass: 0.8,
        }}
        className={`rounded-3xl shadow-2xl w-full ${sizeClass} max-h-[90vh] `}
      >
        {children}
      </motion.div>
    </div>
  );
};

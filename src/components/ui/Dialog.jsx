export const Dialog = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center  backdrop-blur-sm p-4">
      <div className="rounded-3xl shadow-2xl w-full max-w-md  animate-in zoom-in duration-200">
        {children}
      </div>
    </div>
  );
};

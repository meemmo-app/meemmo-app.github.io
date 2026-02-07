import React from "react";
import { Trash, Settings } from "lucide-react";
import HeaderIcon from "./HeaderIcon";
import { ConfirmModal } from "../ConfirmModal";
import { Dialog } from "../ui/Dialog";

const HeaderActions = ({
  setIsSettingsModalOpen,
  deleteCompleted,
  setDeleteCompleted,
  confirmDeleteCompleted,
}) => {
  return (
    <>
      <div className="flex gap-3 items-center">
        <HeaderIcon
          icon={
            <Trash size={22} className="text-slate-500 dark:text-slate-400" />
          }
          onClick={() => setDeleteCompleted(true)}
          title="Delete completed tasks"
        />
        <HeaderIcon
          icon={
            <Settings
              size={22}
              className="text-slate-500 dark:text-slate-400"
            />
          }
          onClick={() => setIsSettingsModalOpen(true)}
          title="Settings"
        />
      </div>
      <Dialog
        isOpen={!!deleteCompleted}
        onClose={() => setDeleteCompleted(false)}
      >
        <ConfirmModal
          title="Eliminare i Task completati?"
          message="Questa azione è irreversibile. Saranno eliminati tutti i Task completati."
          onConfirm={confirmDeleteCompleted}
          onCancel={() => setDeleteCompleted(false)}
          confirmLabel="Elimina tutti"
        />
      </Dialog>
    </>
  );
};

export default HeaderActions;
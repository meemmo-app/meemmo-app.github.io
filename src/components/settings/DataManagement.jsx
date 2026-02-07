import React from "react";
import { Download, Upload } from "lucide-react";
import { ButtonSecondary } from "../ui/Button";
import {
  exportLocalStorageData,
} from "../../constants/utils";

const DataManagement = ({ onImportData }) => {
  return (
    <div className="flex gap-2 w-full justify-between">
      <div className="grow">
        <ButtonSecondary
          text={"Scarica dati"}
          icon={<Download size={16} />}
          onClick={exportLocalStorageData}
        />
      </div>
      <div className="relative grow">
        <input
          type="file"
          accept=".json"
          onChange={onImportData}
          className="hidden"
          id="import-file"
        />
        <ButtonSecondary
          text={"Carica dati"}
          icon={<Upload size={16} />}
          onClick={() => document.getElementById("import-file").click()}
        />
      </div>
    </div>
  );
};

export default DataManagement;
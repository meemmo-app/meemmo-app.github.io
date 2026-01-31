// Function to export all localStorage data to JSON
export const exportLocalStorageData = () => {
  const data = {
    meemmoTasks: localStorage.getItem("meemmo-tasks"),
    meemmoSections: localStorage.getItem("meemmo-sections"),
    meemmoDynamic: localStorage.getItem("meemmo-dynamic"),
    exportDate: new Date().toISOString(),
    version: "1.0",
  };

  const dataStr = JSON.stringify(data, null, 2);
  const dataUri =
    "data:application/json;charset=utf-8," + encodeURIComponent(dataStr);

  const exportFileDefaultName = `meemmo-backup-${new Date().toISOString().split("T")[0]}.json`;

  const linkElement = document.createElement("a");
  linkElement.setAttribute("href", dataUri);
  linkElement.setAttribute("download", exportFileDefaultName);
  linkElement.click();
};

// Function to import data from JSON file and save to localStorage
export const importLocalStorageData = (event) => {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = (e) => {
    try {
      const data = JSON.parse(e.target.result);

      // Validate the imported data structure
      if (!data.meemmoTasks || !data.meemmoSections || !data.meemmoDynamic) {
        alert(
          "File non valido. Assicurati che sia un file di backup Meemmo valido.",
        );
        return;
      }

      // Confirm import
      if (
        confirm(
          "Sei sicuro di voler importare questi dati? Questo sovrascriverà tutti i dati attuali.",
        )
      ) {
        // Clear existing data
        localStorage.clear();

        // Import the data
        localStorage.setItem("meemmo-tasks", data.meemmoTasks);
        localStorage.setItem("meemmo-sections", data.meemmoSections);
        localStorage.setItem("meemmo-dynamic", data.meemmoDynamic);

        alert(
          "Dati importati con successo! Ricarica la pagina per vedere i cambiamenti.",
        );

        // Reset file input
        event.target.value = "";
      }
    } catch (error) {
      alert(
        "Errore durante l'importazione del file. Assicurati che sia un file JSON valido.",
      );
      console.error("Import error:", error);
    }
  };
  reader.readAsText(file);
};

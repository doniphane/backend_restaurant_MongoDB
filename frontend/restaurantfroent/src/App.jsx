import React from "react";
import { useState } from "react";
import FormReservation from "./FormReservation";
import FormTable from "./FormTable";
import FileArianeperso from "./FileArianeperso";

function App() {
  const [loading, setLoading] = useState(false);
  const [showTable, setShowTable] = useState(false);

  const handleSearchTables = () => {
    setLoading(true);

    // Simulation d'une recherche
    setTimeout(() => {
      setLoading(false);
      setShowTable(true);
    }, 2000);
  };

  const getCurrentStep = () => {
    if (loading) return "search";
    if (showTable) return "selection";
    return "reservation";
  };

  const getTitle = () => {
    if (loading) return "Recherche en cours...";
    if (showTable) return "Choisir une table";
    return "Réserver une table";
  };

  return (
    <div className="flex flex-col gap-2 space-y-4 justify-center items-center h-screen ">
      <FileArianeperso currentStep={getCurrentStep()} />

      <h1 className="text-2xl font-bold">{getTitle()}</h1>

      {loading ? (
        <span className="loading loading-spinner loading-xl"></span>
      ) : showTable ? (
        <FormTable />
      ) : (
        <FormReservation onSubmit={handleSearchTables} />
      )}
    </div>
  );
}

export default App;

import { useState } from "react";
import FormReservation from "./FormReservation";
import FormTable from "./FormTable";

function App() {
  const [loading, setLoading] = useState(false);
  const [showTable, setShowTable] = useState(false);
  const [tables, setTables] = useState([]);

  return (
    <div className="flex flex-col space-y-4 justify-center items-center h-screen">
      {loading && (
        <div className="flex flex-col space-y-4 justify-center items-center">
          <h1>Chargement en cours</h1>
          <span className="loading loading-spinner loading-xl"></span>
        </div>
      )}
      {!loading &&
        (showTable ? (
          <FormTable />
        ) : (
          <FormReservation
            setShowTable={setShowTable}
            setLoading={setLoading}
            setTables={setTables}
          />
        ))}
    </div>
  );
}

export default App;
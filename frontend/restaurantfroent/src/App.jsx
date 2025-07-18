import { useState } from "react";
import FormReservation from "./FormReservation";
import FormTable from "./FormTable";
import AuthConfig from "./AuthConfig";
import { Toaster } from "react-hot-toast";

function App() {
  const [loading, setLoading] = useState(false);
  const [showTable, setShowTable] = useState(false);
  const [tables, setTables] = useState([]);
  const [formData, setFormData] = useState({
    nom: "",
    email: "",
    telephone: "",
    capacite: "",
    dateReservation: "",
  });
  const [apiToken, setApiToken] = useState(localStorage.getItem('api_token') || '');

  const handleTokenSet = (token) => {
    setApiToken(token);
  };

  const handleBackToForm = () => {
    setShowTable(false);
    setTables([]);
  };

  return (
    <div className="flex flex-col space-y-4 justify-center items-center h-screen">
      <div>
        <Toaster />
      </div>

      {/* Composant d'authentification */}
      <AuthConfig onTokenSet={handleTokenSet} />

      {loading && (
        <div className="flex flex-col space-y-4 justify-center items-center">
          <h1>Chargement en cours</h1>
          <span className="loading loading-spinner loading-xl"></span>
        </div>
      )}
      {!loading &&
        (showTable ? (
          <FormTable
            tables={tables}
            setFormData={setFormData}
            formData={formData}
            onBack={handleBackToForm}
          />
        ) : (
          <FormReservation
            setShowTable={setShowTable}
            setLoading={setLoading}
            setTables={setTables}
            setFormData={setFormData}
            formData={formData}
          />
        ))}
    </div>
  );
}

export default App;
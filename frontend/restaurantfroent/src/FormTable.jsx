import { useState } from "react";
import { TbUsersGroup } from "react-icons/tb";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { createClient, createReservation, fetchClient } from "./lib/api";
import toast from "react-hot-toast";

function FormTable({ tables, setFormData, formData, onBack }) {
    const [selectedTable, setSelectedTable] = useState("");

    async function handleClick() {
        if (!selectedTable) {
            toast.error("Veuillez sélectionner une table !");
            return;
        }

        try {
            // Vérifier si l'utilisateur existe
            let idUser = await fetchClient(formData.email);
            if (!idUser) {
                // S'il n'existe pas, alors on créé l'utilisateur
                idUser = await createClient(
                    formData.nom,
                    formData.email,
                    formData.telephone
                );
                toast.success("Client créé avec succès !");
            } else {
                toast.success("Client existant trouvé !");
            }

            // On créé la réservation
            await createReservation(formData, idUser, selectedTable);
            toast.success("Réservation créée avec succès !");

            // Retourner au formulaire après succès
            setTimeout(() => {
                onBack && onBack();
            }, 1500);
        } catch (error) {
            toast.error("Erreur lors de la réservation");
        }
    }

    // Vérifier que tables est un tableau
    if (!tables || !Array.isArray(tables)) {
        return (
            <div className="flex flex-col space-y-4 justify-center items-center w-2xl">
                <div className="flex items-center justify-between w-full">
                    {onBack && (
                        <button
                            className="btn btn-ghost btn-sm"
                            onClick={onBack}
                        >
                            <AiOutlineArrowLeft />
                            Retour
                        </button>
                    )}
                    <h1 className="text-center flex-1">Choisir une table</h1>
                </div>
                <div className="alert alert-warning">
                    <span>Aucune table disponible ou erreur de chargement</span>
                </div>
            </div>
        );
    }

    if (tables.length === 0) {
        return (
            <div className="flex flex-col space-y-4 justify-center items-center w-2xl">
                <div className="flex items-center justify-between w-full">
                    {onBack && (
                        <button
                            className="btn btn-ghost btn-sm"
                            onClick={onBack}
                        >
                            <AiOutlineArrowLeft />
                            Retour
                        </button>
                    )}
                    <h1 className="text-center flex-1">Choisir une table</h1>
                </div>
                <div className="alert alert-warning">
                    <span>Aucune table disponible pour cette date et capacité</span>
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col space-y-4 justify-center items-center w-2xl">
            <div className="flex items-center justify-between w-full">
                {onBack && (
                    <button
                        className="btn btn-ghost btn-sm"
                        onClick={onBack}
                    >
                        <AiOutlineArrowLeft />
                        Retour
                    </button>
                )}
                <h1 className="text-center flex-1">Choisir une table</h1>
            </div>

            <fieldset className="space-y-3">
                <legend className="sr-only">Tables</legend>

                {tables.map((table) => (
                    <div key={table.id}>
                        <label
                            htmlFor={`table-${table.id}`}
                            className="w-xl flex items-center justify-between gap-4 rounded border border-gray-300 bg-white p-3 text-sm font-medium shadow-sm transition-colors hover:bg-gray-50 has-checked:border-blue-600 has-checked:ring-1 has-checked:ring-blue-600"
                        >
                            <p className="text-gray-700">Table n°{table.numero}</p>

                            <p className="flex items-center gap-x-2 text-gray-900">
                                <TbUsersGroup /> {table.capacite}
                            </p>

                            <input
                                type="radio"
                                name="tables"
                                id={`table-${table.id}`}
                                className="sr-only"
                                onChange={(e) =>
                                    setSelectedTable("/api/table_restaurants/" + table.id)
                                }
                            />
                        </label>
                    </div>
                ))}
            </fieldset>
            <button
                className="btn btn-primary"
                onClick={handleClick}
                disabled={!selectedTable}
            >
                Réserver cette table
            </button>
        </div>
    );
}

export default FormTable;
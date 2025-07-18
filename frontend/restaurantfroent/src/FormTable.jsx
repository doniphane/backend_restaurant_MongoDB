import { useState } from "react";
import { TbUsersGroup, TbArmchair } from "react-icons/tb";
import { AiOutlineArrowLeft, AiOutlineCheckCircle } from "react-icons/ai";
import { MdOutlineTableRestaurant } from "react-icons/md";
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

    const handleTableSelect = (tableId) => {
        setSelectedTable("/api/table_restaurants/" + tableId);
    };

    // Vérifier que tables est un tableau
    if (!tables || !Array.isArray(tables)) {
        return (
            <div className="flex flex-col space-y-6 justify-center items-center w-full max-w-2xl">
                <div className="flex items-center justify-between w-full">
                    {onBack && (
                        <button
                            className="btn btn-ghost btn-sm text-gray-300 hover:text-white"
                            onClick={onBack}
                        >
                            <AiOutlineArrowLeft className="w-4 h-4" />
                            Retour
                        </button>
                    )}
                    <div className="text-center flex-1">
                        <h1 className="text-3xl font-bold text-white mb-2 drop-shadow-lg">Tables disponibles</h1>
                        <p className="text-gray-300">Aucune table trouvée</p>
                    </div>
                </div>
                <div className="alert alert-warning shadow-lg">
                    <span>Aucune table disponible ou erreur de chargement</span>
                </div>
            </div>
        );
    }

    if (tables.length === 0) {
        return (
            <div className="flex flex-col space-y-6 justify-center items-center w-full max-w-2xl">
                <div className="flex items-center justify-between w-full">
                    {onBack && (
                        <button
                            className="btn btn-ghost btn-sm text-gray-300 hover:text-white"
                            onClick={onBack}
                        >
                            <AiOutlineArrowLeft className="w-4 h-4" />
                            Retour
                        </button>
                    )}
                    <div className="text-center flex-1">
                        <h1 className="text-3xl font-bold text-white mb-2 drop-shadow-lg">Tables disponibles</h1>
                        <p className="text-gray-300">Aucune table pour cette date et capacité</p>
                    </div>
                </div>
                <div className="alert alert-warning shadow-lg">
                    <span>Aucune table disponible pour cette date et capacité</span>
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col space-y-6 justify-center items-center w-full max-w-4xl px-4">
            {/* En-tête */}
            <div className="flex items-center justify-between w-full">
                {onBack && (
                    <button
                        className="btn btn-ghost btn-sm text-gray-300 hover:text-white transition-colors"
                        onClick={onBack}
                    >
                        <AiOutlineArrowLeft className="w-4 h-4" />
                        Retour
                    </button>
                )}
                <div className="text-center flex-1">
                    <h1 className="text-3xl font-bold text-white mb-2">Tables disponibles</h1>
                    <p className="text-gray-300">Choisissez votre table préférée</p>
                </div>
            </div>

            {/* Grille des tables */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
                {tables.map((table) => (
                    <div key={table.id} className="relative">
                        <input
                            type="radio"
                            name="table-choice"
                            id={`table-${table.id}`}
                            className="sr-only peer"
                            value={table.id}
                            checked={selectedTable === "/api/table_restaurants/" + table.id}
                            onChange={() => handleTableSelect(table.id)}
                        />
                        <label
                            htmlFor={`table-${table.id}`}
                            className="block cursor-pointer group"
                        >
                            <div className="relative bg-white rounded-2xl border-2 border-gray-200 p-6 transition-all duration-300 hover:border-blue-300 hover:shadow-xl hover:-translate-y-1 peer-checked:border-blue-500 peer-checked:bg-gradient-to-br peer-checked:from-blue-50 peer-checked:to-indigo-50 peer-checked:shadow-xl peer-checked:shadow-blue-200/50">

                                {/* Icône de table */}
                                <div className="flex justify-center mb-4">
                                    <div className="relative">
                                        <MdOutlineTableRestaurant className="w-12 h-12 text-gray-400 group-hover:text-blue-500 peer-checked:text-blue-600 transition-colors duration-300" />
                                        {selectedTable === "/api/table_restaurants/" + table.id && (
                                            <div className="absolute -top-1 -right-1 bg-green-500 rounded-full p-1">
                                                <AiOutlineCheckCircle className="w-4 h-4 text-white" />
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Numéro de table */}
                                <div className="text-center mb-3">
                                    <h3 className="text-xl font-bold text-gray-800 group-hover:text-blue-600 transition-colors">
                                        Table {table.numero}
                                    </h3>
                                </div>

                                {/* Capacité */}
                                <div className="flex items-center justify-center gap-2 text-gray-600 group-hover:text-blue-500 transition-colors">
                                    <TbUsersGroup className="w-5 h-5" />
                                    <span className="font-medium">{table.capacite} personnes</span>
                                </div>

                                {/* Indicateur de sélection */}
                                <div className="absolute top-3 right-3">
                                    <div className={`w-4 h-4 rounded-full border-2 transition-all duration-300 ${selectedTable === "/api/table_restaurants/" + table.id
                                        ? 'bg-blue-500 border-blue-500'
                                        : 'border-gray-300 group-hover:border-blue-400'
                                        }`}>
                                        {selectedTable === "/api/table_restaurants/" + table.id && (
                                            <div className="w-2 h-2 bg-white rounded-full mx-auto mt-0.5"></div>
                                        )}
                                    </div>
                                </div>

                                {/* Badge premium pour les grandes tables */}
                                {table.capacite >= 6 && (
                                    <div className="absolute top-3 left-3">
                                        {/* <span className="bg-gradient-to-r from-amber-400 to-orange-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                                            Grande table
                                        </span> */}
                                    </div>
                                )}
                            </div>
                        </label>
                    </div>
                ))}
            </div>

            {/* Confirmation de sélection */}
            {selectedTable && (
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-2xl p-6 w-full max-w-md mx-auto shadow-lg">
                    <div className="flex items-center gap-3">
                        <div className="bg-green-500 rounded-full p-2">
                            <AiOutlineCheckCircle className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <h4 className="font-bold text-green-800">Table sélectionnée</h4>
                            <p className="text-green-600">
                                Table {tables.find(t => selectedTable === "/api/table_restaurants/" + t.id)?.numero} - {tables.find(t => selectedTable === "/api/table_restaurants/" + t.id)?.capacite} personnes
                            </p>
                        </div>
                    </div>
                </div>
            )}

            {/* Bouton de réservation */}
            <button
                className={`btn btn-lg w-full max-w-md mx-auto transition-all duration-300 ${selectedTable
                    ? 'btn-primary bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg hover:shadow-xl'
                    : 'btn-disabled'
                    }`}
                onClick={handleClick}
                disabled={!selectedTable}
            >
                <TbArmchair className="w-5 h-5" />
                Confirmer la réservation
            </button>
        </div>
    );
}

export default FormTable;
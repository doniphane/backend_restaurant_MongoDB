import React, { useState, useEffect } from "react";
import { AiOutlineTable, AiOutlineTeam } from "react-icons/ai";
import { fetchAvailableTables } from "./lib/api.js";

function FormTable({ capacite = 4, dateReservation = "2025-07-17" }) {
    const [selectedTable, setSelectedTable] = useState("");
    const [tables, setTables] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getTables = async () => {
            try {
                setLoading(true);

                const availableTables = await fetchAvailableTables(capacite, dateReservation, setLoading);

                setTables(availableTables);
            } catch (error) {
                console.error('Erreur:', error);
                setLoading(false);
            }
        };

        getTables();
    }, [capacite, dateReservation]);

    const selectTable = (tableId) => {
        setSelectedTable(tableId);
    };


    if (loading) {
        return (
            <div className="flex justify-center items-center p-8">
                <span>Chargement des tabless...</span>
            </div>
        );
    }


    if (tables.length === 0) {
        return (
            <div className="alert alert-warning">
                <span>Aucune table disponible</span>
            </div>
        );
    }


    return (
        <div className="flex flex-col gap-4 justify-center items-center">
            <h2>Tables disponibles</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {tables.map((table, index) => (
                    <div
                        key={table.id || index}
                        className={`card bg-base-100 shadow-xl cursor-pointer ${selectedTable === table.id ? "ring-2 ring-primary" : ""
                            }`}
                        onClick={() => selectTable(table.id)}
                    >
                        <div className="card-body">
                            <div className="flex items-center gap-3">
                                <AiOutlineTable className="text-2xl text-primary" />
                                <div>
                                    <h3>Table N° {table.numero}</h3>
                                    <div className="flex items-center gap-2">
                                        <AiOutlineTeam />
                                        <span>{table.capacite} personnes</span>
                                    </div>
                                </div>
                            </div>
                            <input
                                type="radio"
                                name="table"
                                checked={selectedTable === table.id}
                                onChange={() => selectTable(table.id)}
                            />
                        </div>
                    </div>
                ))}
            </div>

            {selectedTable && (
                <button className="btn btn-primary mt-4">
                    Réserver cette table
                </button>
            )}
        </div>
    );
}

export default FormTable;

import React, { useState } from "react";
import { AiOutlineTable, AiOutlineTeam } from "react-icons/ai";

function FormTable() {
    const [selectedTable, setSelectedTable] = useState("");

    // Tables d'exemple pour l'affichage
    const tables = [
        { id: "table1", number: 1, capacity: 2 },
        { id: "table2", number: 3, capacity: 4 },
        { id: "table3", number: 5, capacity: 6 },
        { id: "table4", number: 8, capacity: 8 },
        { id: "table5", number: 10, capacity: 10 },
        { id: "table6", number: 12, capacity: 12 },
        { id: "table7", number: 14, capacity: 14 },
        { id: "table8", number: 16, capacity: 16 },
        { id: "table9", number: 18, capacity: 18 },
        { id: "table10", number: 20, capacity: 20 },
    ];

    const handleTableSelect = (tableId) => {
        setSelectedTable(tableId);
    };

    return (
        <div className="flex flex-col gap-2 space-y-4 justify-center items-center w-2xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-4xl">
                {tables.map((table) => (
                    <div
                        key={table.id}
                        className={`card bg-base-100 shadow-xl cursor-pointer transition-all ${selectedTable === table.id ? "ring-2 ring-primary bg-primary/5" : "hover:shadow-2xl"
                            }`}
                        onClick={() => handleTableSelect(table.id)}
                    >
                        <div className="card-body">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <AiOutlineTable className="text-2xl text-primary" />
                                    <div>
                                        <h3 className="card-title text-lg">Table N° {table.number}</h3>
                                        <div className="flex items-center gap-2 text-sm text-white">
                                            <AiOutlineTeam className="text-lg" />
                                            <span>{table.capacity} personnes</span>
                                        </div>
                                    </div>
                                </div>
                                <input
                                    type="radio"
                                    name="table-selection"
                                    className="radio radio-primary"
                                    checked={selectedTable === table.id}
                                    onChange={() => handleTableSelect(table.id)}
                                />
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {selectedTable && (
                <button className="btn btn-primary mt-4">
                    Reserver cette table
                </button>
            )}
        </div>
    );
}

export default FormTable;

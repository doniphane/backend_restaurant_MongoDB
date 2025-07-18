import React from "react";
import { AiOutlineForm, AiOutlineSearch, AiOutlineTable } from "react-icons/ai";

function Breadcrumb({ currentStep }) {
    const steps = [
        {
            id: "reservation",
            label: "Réservation",
            icon: <AiOutlineForm className="w-4 h-4" />
        },
        {
            id: "search",
            label: "Recherche",
            icon: <AiOutlineSearch className="w-4 h-4" />
        },
        {
            id: "selection",
            label: "Sélection",
            icon: <AiOutlineTable className="w-4 h-4" />
        },
    ];

    const getStepStatus = (stepId) => {
        const stepIndex = steps.findIndex(step => step.id === stepId);
        const currentIndex = steps.findIndex(step => step.id === currentStep);

        if (stepIndex < currentIndex) return "completed";
        if (stepIndex === currentIndex) return "active";
        return "inactive";
    };

    return (
        <div className="w-full max-w-4xl mb-6">
            <div className="breadcrumbs">
                <ul className="flex justify-center">
                    {steps.map((step, index) => {
                        const status = getStepStatus(step.id);
                        return (
                            <li key={step.id} className="flex items-center">
                                <div
                                    className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${status === "active"
                                        ? "bg-primary text-primary-content font-semibold"
                                        : status === "completed"
                                            ? "bg-success text-success-content"
                                            : "bg-base-200 text-base-content opacity-60"
                                        }`}
                                >
                                    {step.icon}
                                    <span className="text-sm">{step.label}</span>
                                </div>
                                {index < steps.length - 1 && (
                                    <div className="mx-2 text-base-300">
                                        <svg
                                            className="w-4 h-4"
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                    </div>
                                )}
                            </li>
                        );
                    })}
                </ul>
            </div>
        </div>
    );
}

export default Breadcrumb; 
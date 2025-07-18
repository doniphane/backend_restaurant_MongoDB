import React from "react";
import {
    AiOutlineUser,
    AiFillPhone,
    AiOutlineMail,
    AiOutlineDashboard,
} from "react-icons/ai";

function FormReservation({ onSubmit }) {
    return (
        <>
            <div className="flex flex-col gap-2 space-y-4 justify-center items-center w-2xl">
                <label className="input">
                    <AiOutlineUser />
                    <input type="nom" className="grow" placeholder="nom" />

                    <kbd className="kbd kbd-sm">⌘</kbd>
                    <kbd className="kbd kbd-sm">K</kbd>
                </label>
                <label className="input">
                    <AiOutlineMail />
                    <input type="email" className="grow" placeholder="email" />

                    <kbd className="kbd kbd-sm">⌘</kbd>
                    <kbd className="kbd kbd-sm">K</kbd>
                </label>
                <label className="input">
                    <AiFillPhone />
                    <input type="phone" className="grow" placeholder="phone" />

                    <kbd className="kbd kbd-sm">⌘</kbd>
                    <kbd className="kbd kbd-sm">K</kbd>
                </label>
                <label className="input">
                    <AiOutlineDashboard />
                    <input type="number" className="grow" placeholder="capacity" />

                    <kbd className="kbd kbd-sm">⌘</kbd>
                    <kbd className="kbd kbd-sm">K</kbd>
                </label>
                <label className="input">
                    <input type="date" className="grow" placeholder="date" />

                    <kbd className="kbd kbd-sm">⌘</kbd>
                    <kbd className="kbd kbd-sm">K</kbd>
                </label>
            </div>
            <button className="btn btn-primary" onClick={onSubmit}>
                Rechercher une table
            </button>
        </>
    );
}

export default FormReservation;

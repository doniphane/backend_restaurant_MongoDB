import {
    AiOutlineMail,
    AiOutlineUser,
    AiOutlineUsergroupAdd,
} from "react-icons/ai";
import { MdOutlinePhoneInTalk } from "react-icons/md";
import { fetchAvailableTables } from "./lib/api.js";
import { toast } from 'react-toastify';

function FormReservation({ setShowTable, setLoading, setTables }) {
    async function handleFetchTables(capacite, dateReservation) {
        try {
            const tables = await fetchAvailableTables(capacite, dateReservation, setLoading);
            setTables(tables);
            setShowTable(true);


            toast.success('Tables bien récupérées !', {
                autoClose: 5000,
            });
        } catch (error) {
            console.error('Erreur lors de la récupération des tables:', error);


            toast.error('Erreur : impossible de récupérer les données des tables', {
                autoClose: false,
            });

            setLoading(false);
        }
    }

    async function handleClick() {
        await handleFetchTables(3, "2025-07-17");
    }

    return (
        <div className="flex flex-col space-y-4 justify-center items-center w-2xl">
            <h1>Reserver une table</h1>
            <label className="input">
                <AiOutlineUser />
                <input type="text" className="grow" placeholder="Nom" />
            </label>
            <label className="input">
                <AiOutlineMail />
                <input type="email" className="grow" placeholder="Email" />
            </label>
            <label className="input">
                <MdOutlinePhoneInTalk />
                <input type="text" className="grow" placeholder="Téléphone" />
            </label>
            <label className="input">
                <AiOutlineUsergroupAdd />
                <input type="text" className="grow" placeholder="Capacité" />
            </label>
            <label className="input">
                <input type="date" className="grow" placeholder="Date" />
            </label>
            <button className="btn btn-primary" onClick={handleClick}>
                Rechercher une table
            </button>
        </div>
    );
}

export default FormReservation;
import {
    AiOutlineMail,
    AiOutlineUser,
    AiOutlineUsergroupAdd,
} from "react-icons/ai";
import { MdOutlinePhoneInTalk } from "react-icons/md";

function FormReservation({ setShowTable, setLoading, setTables }) {
    async function fetchTables(capacite, dateReservation) {
        try {
            const myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");

            const raw = JSON.stringify({
                date: dateReservation || "2025-07-17",
                capacite: capacite || 3,
            });

            const requestOptions = {
                method: "POST",
                headers: myHeaders,
                body: raw,
            };

            const response = await fetch(
                "https://127.0.0.1:8000/api/booking/tables",
                requestOptions
            );

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            console.log('Tables disponibles:', data);
            setTables(data.tables_dispo || []);
            setShowTable(true);
        } catch (error) {
            console.error('Erreur lors de la récupération des tables:', error);
            alert('Erreur lors de la récupération des tables: ' + error.message);
        } finally {
            setLoading(false);
        }
    }

    async function handleClick() {
        await fetchTables(3, "2025-07-17");
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
import {
    AiOutlineMail,
    AiOutlineUser,
    AiOutlineUsergroupAdd,
} from "react-icons/ai";
import { MdOutlinePhoneInTalk } from "react-icons/md";
import { fetchTables } from "./lib/api";
import toast from "react-hot-toast";

function FormReservation({
    setShowTable,
    setLoading,
    setTables,
    setFormData,
    formData,
}) {
    async function handleClick() {
        if (!formData.capacite || !formData.dateReservation) {
            toast.error("Veuillez remplir tous les champs !");
            return;
        }

        if (!formData.nom || !formData.email || !formData.telephone) {
            toast.error("Veuillez remplir vos informations personnelles !");
            return;
        }

        setLoading(true);
        try {
            const data = await fetchTables(
                formData.capacite,
                formData.dateReservation
            );

            setTables(data);
            setShowTable(true);
            toast.success("Tables trouvées !");
        } catch (error) {
            if (error.message.includes('500')) {
                toast.error("Erreur serveur (500). Vérifiez que le backend est démarré et accessible.");
            } else if (error.message.includes('fetch')) {
                toast.error("Impossible de contacter le serveur. Vérifiez votre connexion.");
            } else {
                toast.error(`Erreur: ${error.message}`);
            }
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="flex flex-col space-y-4 justify-center items-center w-2xl">
            <h1>Reserver une table</h1>
            <label className="input">
                <AiOutlineUser />
                <input
                    type="text"
                    className="grow"
                    placeholder="Nom"
                    value={formData.nom}
                    onInput={(e) => {
                        setFormData({ ...formData, nom: e.target.value });
                    }}
                    required
                />
            </label>
            <label className="input">
                <AiOutlineMail />
                <input
                    type="email"
                    className="grow"
                    placeholder="Email"
                    value={formData.email}
                    onInput={(e) => {
                        setFormData({ ...formData, email: e.target.value });
                    }}
                    required
                />
            </label>
            <label className="input">
                <MdOutlinePhoneInTalk />
                <input
                    type="text"
                    className="grow"
                    placeholder="Téléphone"
                    value={formData.telephone}
                    onInput={(e) => {
                        setFormData({ ...formData, telephone: e.target.value });
                    }}
                    required
                />
            </label>
            <label className="input">
                <AiOutlineUsergroupAdd />
                <input
                    type="number"
                    className="grow"
                    placeholder="Capacité"
                    min="1"
                    max="12"
                    value={formData.capacite}
                    onInput={(e) => {
                        setFormData({ ...formData, capacite: e.target.value });
                    }}
                    required
                />
            </label>
            <label className="input">
                <input
                    type="date"
                    className="grow"
                    placeholder="Date"
                    min={new Date().toISOString().split('T')[0]}
                    value={formData.dateReservation}
                    onInput={(e) => {
                        setFormData({ ...formData, dateReservation: e.target.value });
                    }}
                    required
                />
            </label>
            <button className="btn btn-primary" onClick={handleClick}>
                Rechercher une table
            </button>
        </div>
    );
}

export default FormReservation;
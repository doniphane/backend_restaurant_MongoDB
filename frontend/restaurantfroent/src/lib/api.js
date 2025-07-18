const apiURL = import.meta.env.VITE_API_PROXY_PATH || "/api";


const getApiHeaders = () => {
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Accept", "application/ld+json");


    const token = localStorage.getItem('api_token');
    if (token) {

        if (token.startsWith('Bearer ')) {
            headers.append("Authorization", token);
        } else {
            headers.append("Authorization", `Bearer ${token}`);
        }
    }

    return headers;
};


async function handleResponse(response, endpoint) {
    if (!response.ok) {
        const errorText = await response.text();

        if (response.status === 401) {
            throw new Error(`Authentification requise (401). Vérifiez votre configuration.`);
        }

        throw new Error(`HTTP ${response.status}: ${errorText.substring(0, 200)}...`);
    }

    const contentType = response.headers.get('content-type');
    if (contentType && (contentType.includes('application/json') || contentType.includes('application/ld+json'))) {
        return await response.json();
    } else {
        const text = await response.text();
        throw new Error(`Réponse non-JSON reçue: ${text.substring(0, 100)}...`);
    }
}

export async function fetchTables(capacite, dateReservation) {

    const requestData = {
        date: dateReservation,
        capacite: parseInt(capacite)
    };

    const requestOptions = {
        method: "POST",
        headers: getApiHeaders(),
        body: JSON.stringify(requestData),
    };

    try {
        const response = await fetch(apiURL + "/booking/tables", requestOptions);
        const data = await handleResponse(response, 'fetchTables');

        // Retourner les tables selon la structure API Platform
        if (data['hydra:member'] && Array.isArray(data['hydra:member'])) {
            return data['hydra:member'];
        } else if (data.tables_dispo && Array.isArray(data.tables_dispo)) {
            return data.tables_dispo;
        } else if (Array.isArray(data)) {
            return data;
        } else {
            return [];
        }
    } catch (error) {
        throw error;
    }
}

export async function fetchClient(email) {
    const requestOptions = {
        method: "GET",
        headers: getApiHeaders(),
    };

    try {
        const response = await fetch(apiURL + "/clients?email=" + encodeURIComponent(email), requestOptions);
        const data = await handleResponse(response, 'fetchClient');


        if (data['hydra:member'] && data['hydra:member'].length > 0) {
            return data['hydra:member'][0]['@id'];
        } else if (data.member && data.member.length > 0) {
            return data.member[0]["@id"];
        } else if (data.totalItems > 0 && data.member) {
            return data.member[0]["@id"];
        }
        return false;
    } catch (error) {
        throw error;
    }
}

export async function createClient(nom, email, telephone) {
    const clientData = {
        nom: nom,
        email: email,
        telephone: telephone,
    };

    const requestOptions = {
        method: "POST",
        headers: getApiHeaders(),
        body: JSON.stringify(clientData),
    };

    try {
        const response = await fetch(apiURL + "/clients", requestOptions);
        const data = await handleResponse(response, 'createClient');
        return data["@id"];
    } catch (error) {
        throw error;
    }
}

export async function createReservation(
    { dateReservation, capacite },
    idClient,
    idTable
) {
    const reservationData = {
        createdAt: new Date().toISOString(),
        creneau: "12:00",
        nombrePersonne: parseInt(capacite),
        client: idClient,
        tableRestaurant: idTable,
        dateReservation: dateReservation + "T00:00:00.000Z",
    };

    const requestOptions = {
        method: "POST",
        headers: getApiHeaders(),
        body: JSON.stringify(reservationData),
    };

    try {
        const response = await fetch(apiURL + "/reservations", requestOptions);
        const data = await handleResponse(response, 'createReservation');
        return data;
    } catch (error) {
        throw error;
    }
}
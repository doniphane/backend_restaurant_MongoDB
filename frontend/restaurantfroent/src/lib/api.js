const apiURL = "/api"; // Utilise le proxy Vite

// Headers spécifiques pour API Platform
const getApiHeaders = () => {
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Accept", "application/ld+json");

    // Ajouter le token d'authentification s'il est disponible
    const token = localStorage.getItem('api_token');
    if (token) {
        // Ajouter Bearer si ce n'est pas déjà inclus
        if (token.startsWith('Bearer ')) {
            headers.append("Authorization", token);
        } else {
            headers.append("Authorization", `Bearer ${token}`);
        }
        console.log('🔑 Token d\'authentification ajouté');
    } else {
        console.log('ℹ️ Aucun token d\'authentification');
    }

    return headers;
};

// Fonction utilitaire pour gérer les réponses
async function handleResponse(response, endpoint) {
    console.log(`Réponse ${endpoint}:`, {
        status: response.status,
        statusText: response.statusText,
        headers: Object.fromEntries(response.headers.entries())
    });

    if (!response.ok) {
        const errorText = await response.text();
        console.error(`Erreur ${endpoint} (${response.status}):`, errorText);

        if (response.status === 401) {
            throw new Error(`Authentification requise (401). Cliquez sur "🔑 Auth API" pour configurer votre token.`);
        }

        throw new Error(`HTTP ${response.status}: ${errorText.substring(0, 200)}...`);
    }

    const contentType = response.headers.get('content-type');
    if (contentType && (contentType.includes('application/json') || contentType.includes('application/ld+json'))) {
        return await response.json();
    } else {
        const text = await response.text();
        console.warn(`Réponse non-JSON reçue de ${endpoint}:`, text.substring(0, 200));
        throw new Error(`Réponse non-JSON reçue: ${text.substring(0, 100)}...`);
    }
}

export async function fetchTables(capacite, dateReservation) {
    // Format standard pour API Platform
    const requestData = {
        date: dateReservation,
        capacite: parseInt(capacite)
    };

    console.log('🚀 Envoi fetchTables avec format API Platform:', requestData);

    const requestOptions = {
        method: "POST",
        headers: getApiHeaders(),
        body: JSON.stringify(requestData),
    };

    try {
        const response = await fetch(apiURL + "/booking/tables", requestOptions);
        const data = await handleResponse(response, 'fetchTables');

        console.log('✅ Données reçues fetchTables:', data);

        // Retourner les tables selon la structure API Platform
        if (data['hydra:member'] && Array.isArray(data['hydra:member'])) {
            console.log('📋 Tables trouvées via hydra:member:', data['hydra:member'].length);
            return data['hydra:member'];
        } else if (data.tables_dispo && Array.isArray(data.tables_dispo)) {
            console.log('📋 Tables trouvées via tables_dispo:', data.tables_dispo.length);
            return data.tables_dispo;
        } else if (Array.isArray(data)) {
            console.log('📋 Tables trouvées (tableau direct):', data.length);
            return data;
        } else {
            console.warn('⚠️ Format de réponse inattendu:', data);
            return [];
        }
    } catch (error) {
        console.error('❌ Erreur dans fetchTables:', error);
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

        console.log('Réponse fetchClient:', data);

        // Gestion API Platform
        if (data['hydra:member'] && data['hydra:member'].length > 0) {
            return data['hydra:member'][0]['@id'];
        } else if (data.member && data.member.length > 0) {
            return data.member[0]["@id"];
        } else if (data.totalItems > 0 && data.member) {
            return data.member[0]["@id"];
        }
        return false;
    } catch (error) {
        console.error('Erreur dans fetchClient:', error);
        throw error;
    }
}

export async function createClient(nom, email, telephone) {
    const clientData = {
        nom: nom,
        email: email,
        telephone: telephone,
    };

    console.log('Création client avec:', clientData);

    const requestOptions = {
        method: "POST",
        headers: getApiHeaders(),
        body: JSON.stringify(clientData),
    };

    try {
        const response = await fetch(apiURL + "/clients", requestOptions);
        const data = await handleResponse(response, 'createClient');
        console.log('Client créé:', data);
        return data["@id"];
    } catch (error) {
        console.error('Erreur dans createClient:', error);
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

    console.log('Création réservation avec:', reservationData);

    const requestOptions = {
        method: "POST",
        headers: getApiHeaders(),
        body: JSON.stringify(reservationData),
    };

    try {
        const response = await fetch(apiURL + "/reservations", requestOptions);
        const data = await handleResponse(response, 'createReservation');
        console.log('Réservation créée:', data);
        return data;
    } catch (error) {
        console.error('Erreur dans createReservation:', error);
        throw error;
    }
}
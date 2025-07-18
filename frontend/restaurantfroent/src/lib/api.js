import { toast } from 'react-toastify';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;


const getDefaultHeaders = () => ({
    'Content-Type': 'application/json',
});


const handleResponse = async (response) => {
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
};


export const fetchAvailableTables = async (capacite, dateReservation, setLoading = null) => {
    try {
        const requestOptions = {
            method: 'POST',
            headers: getDefaultHeaders(),
            body: JSON.stringify({
                date: dateReservation || "2025-07-17",
                capacite: capacite || 3,
            }),
        };

        const response = await fetch(
            `${API_BASE_URL}/booking/tables`,
            requestOptions
        );

        const data = await handleResponse(response);
        console.log('Tables disponibles:', data);

        return data.tables_dispo || [];
    } catch (error) {
        console.error('Erreur lors de la récupération des tables:', error);
        throw error;
    } finally {

        if (setLoading && typeof setLoading === 'function') {
            setLoading(false);
        }
    }
};


export const createReservation = async (reservationData, setLoading = null) => {
    try {
        const requestOptions = {
            method: 'POST',
            headers: getDefaultHeaders(),
            body: JSON.stringify(reservationData),
        };

        const response = await fetch(
            `${API_BASE_URL}/reservations`,
            requestOptions
        );

        const result = await handleResponse(response);
        return result;
    } catch (error) {
        console.error('Erreur lors de la création de la réservation:', error);
        throw error;
    } finally {

        if (setLoading && typeof setLoading === 'function') {
            setLoading(false);
        }
    }
};


export const fetchAllTables = async (setLoading = null) => {
    try {
        const response = await fetch(
            `${API_BASE_URL}/tables`,
            {
                method: 'GET',
                headers: getDefaultHeaders(),
            }
        );

        const result = await handleResponse(response);
        return result;
    } catch (error) {
        console.error('Erreur lors de la récupération des tables:', error);
        throw error;
    } finally {

        if (setLoading && typeof setLoading === 'function') {
            setLoading(false);
        }
    }
}; 
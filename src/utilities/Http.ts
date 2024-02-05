import { settings } from "./state.js";

export async function fetchData(endpoint: string, criteria?: string) {
    try {

        let url: string = '';

        if (criteria) {
            url = `${settings.DB_BASE_URL_PATH}${endpoint}?${criteria}`;
        } else {
            url = `${settings.DB_BASE_URL_PATH}${endpoint}`;
        }

        const response = await fetch(url);

        if (response.ok) {
            const data = await response.json();
            return data;
        } else {
            throw new Error(`Det gick fel när vi skulle hämta data ${response.status} - ${response.statusText}`);
        }

    } catch (error) {
        // throw new Error(error.message);
        if (error instanceof Error) {
            throw new Error(error.message);
        }
    }
}

export async function addData(endpoint: string, data: object) {
    try {

        let url: string = `${settings.DB_BASE_URL_PATH}${endpoint}`;

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (response.ok) {
            const result = await response.json();
            return result;
        } else {
            throw new Error(`${response.status} ${response.statusText}`);
        }
    } catch (error) {
        throw new Error(`An error ocurred in the add method: ${error}`);
    }

}
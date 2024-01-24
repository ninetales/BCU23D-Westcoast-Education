export default class HttpClient {

    #url = '';

    constructor(url) {
        this.#url = url;
    }

    async get() {
        try {
            const response = await fetch(this.#url);

            if (response.ok) {
                const data = await response.json();
                return data;
            } else {
                throw new Error(`Det gick fel när vi skulle hämta data ${response.status} - ${response.statusText}`);
            }

        } catch (error) {
            throw new Error(error.message);
        }
    }

    async add(data) {

        try {
            const response = await fetch(this.#url, {
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
            throw new Error(`Ett fel inträffade i add metoden: ${error}`);
        }

    }

}

// import { settings } from "../utilities/config.js";

// export default class HttpClient {

//     // Skapa en metod som kan hämta baserat på url'en som skickas in
//     async get(resource) {
//         try {
//             const baseUrl = `${settings.BASE_URL}/${resource}`;
//             const url = `${baseUrl}?api_key=${settings.API_KEY}&language=sv-SE`;
//             console.log(url);
//             const response = await fetch(url);

//             if (response.ok) {
//                 const data = await response.json();
//                 return data;
//             } else {
//                 throw new Error(`Det gick fel när vi skulle hämta data ${response.status} - ${response.statusText}`);
//             }

//         } catch (error) {
//             throw new Error(error.message);
//         }
//     }

// }


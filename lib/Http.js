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
            throw new Error(`An error ocurred in the add method: ${error}`);
        }

    }

}
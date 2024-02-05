import HttpClient from "../lib/Http.js";
import { settings } from "../utilities/config.js";

export default class UserManager {

    #userId = 0;
    #userEmail = '';
    constructor(userId, userEmail) {
        this.#userId = userId;
        this.#userEmail = userEmail;
    }

    async getUsers() {

        try {
            const http = new HttpClient(`${settings.DB_USER_PATH}`);
            const result = await http.get();
            return result;
        } catch (error) {
            throw new Error(error.message);
        }

    }

    async getSingleUser() {
        try {
            const http = new HttpClient(`${settings.DB_USER_PATH}?id=${this.#userId}`);
            const result = await http.get();
            return result[0];
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async addNewUser(user) {

        const http = new HttpClient(`${settings.DB_USER_PATH}`);
        const result = await http.add(user);
        return result;
    }

    async getUserByEmail() {
        const http = new HttpClient(`${settings.DB_USER_PATH}?email=${this.#userEmail}`);
        const result = await http.get();
        if (result[0]) {
            return true;
        } else {
            return false;
        }
    }
}
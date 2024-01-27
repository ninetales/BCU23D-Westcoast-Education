import HttpClient from "../lib/Http.js";
import { settings } from "../utilities/config.js";

export default class BookingManager {
    #userId = 0;
    #courseId = 0;
    constructor(userId, courseId) {
        this.#userId = userId;
        this.#courseId = courseId;
    }

    async getBookingStatus() {
        try {
            const http = new HttpClient(`${settings.DB_ENROLLMENT_PATH}?userId=${this.#userId}&courseId=${this.#courseId}`);
            const result = await http.get();
            console.log('booking status says', result);
            if (result[0]) {
                return true;
            } else {
                return false;
            }
        } catch (error) {
            throw new Error(error);
        }
    }
}
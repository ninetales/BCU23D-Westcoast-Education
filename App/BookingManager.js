import HttpClient from "../lib/Http.js";
import { settings } from "../utilities/config.js";

export default class BookingManager {
    #userId = 0;
    #courseId = 0;
    #firstname = '';
    #lastname = '';
    #address = '';
    #date = '';
    #email = '';
    #phone = 0;
    constructor(userId, courseId, firstname, lastname, address, date, email, phone) {
        this.#userId = userId;
        this.#courseId = courseId;
        this.#firstname = firstname;
        this.#lastname = lastname;
        this.#address = address;
        this.#date = date;
        this.#email = email;
        this.#phone = phone;
    }

    async getBookingStatus() {
        try {
            const http = new HttpClient(`${settings.DB_ENROLLMENT_PATH}?userId=${this.#userId}&courseId=${this.#courseId}`);
            const result = await http.get();

            if (result[0]) {
                return true;
            } else {
                return false;
            }
        } catch (error) {
            throw new Error(error);
        }
    }

    async bookCourse() {

        try {
            const bookingData = {
                userId: this.#userId,
                courseId: this.#courseId,
                date: this.#date,
                fname: this.#firstname,
                lname: this.#lastname,
                email: this.#email,
                phone: this.#phone,
                address: this.#address
            }
            const http = new HttpClient(`${settings.DB_ENROLLMENT_PATH}`);
            await http.add(bookingData);
            return true;
        } catch (error) {
            throw new Error(error)
        }
    }
}
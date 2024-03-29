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
    #location = '';
    constructor(userId, courseId, firstname, lastname, address, date, email, phone, location) {
        this.#userId = userId;
        this.#courseId = courseId;
        this.#firstname = firstname;
        this.#lastname = lastname;
        this.#address = address;
        this.#date = date;
        this.#email = email;
        this.#phone = phone;
        this.#location = location;
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
                address: this.#address,
                location: this.#location
            }
            const http = new HttpClient(`${settings.DB_ENROLLMENT_PATH}`);
            await http.add(bookingData);
            return true;
        } catch (error) {
            throw new Error(error)
        }
    }

    async getBookedCourses() {
        try {
            const http = new HttpClient(`${settings.DB_ENROLLMENT_PATH}`);
            const result = await http.get();
            return result;
        } catch (error) {
            throw new Error(error);
        }
    }
}
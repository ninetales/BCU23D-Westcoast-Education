import HttpClient from "../lib/Http.js";
import { settings } from "../utilities/config.js";

export default class RegisterManager {
    #firstname = '';
    #lastname = '';
    #email = '';
    #city = '';
    #street = '';
    #postalCode = '';
    #phone = '';
    #password = '';

    constructor(firstname, lastname, email, city, street, postalCode, phone, password) {
        this.#firstname = firstname;
        this.#lastname = lastname;
        this.#email = email;
        this.#city = city;
        this.#street = street;
        this.#postalCode = postalCode;
        this.#phone = phone;
        this.#password = password;
    }

    async registerUser() {
        try {
            console.log('making registration');
            const registerData = {
                role: "student",
                fname: this.#firstname,
                lname: this.#lastname,
                email: this.#email,
                password: this.#password,
                phone: this.#phone,
                address: {
                    city: this.#city,
                    postalCode: this.#postalCode,
                    street: this.#street
                },
                accountState: {
                    status: "active",
                    date: new Date().toISOString().split('T')[0]
                }
            }
            const http = new HttpClient(`${settings.DB_USER_PATH}`);
            await http.add(registerData);
            return true;
        } catch (error) {
            throw new Error(error)
        }
    }
}
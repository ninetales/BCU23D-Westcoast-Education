export default class User {

    #fname = '';
    #lname = '';
    #email = '';
    #password = '';
    #accountCreated = 0;
    #address = '';
    #city = '';
    #postalCode = '';
    #street = '';
    #housenumber = '';
    #streetNumber = '';
    #accountStatus = '';

    constructor(fname, lname, email, password, accountCreated, address, city, postalCode, street, housenumber, streetNumber, accountStatus) {
        this.#fname = fname;
        this.#lname = lname;
        this.#email = email;
        this.#password = password;
        this.#accountCreated = accountCreated;
        this.#address = address;
        this.#city = city;
        this.#postalCode = postalCode;
        this.#street = street;
        this.#housenumber = housenumber;
        this.#streetNumber = streetNumber;
        this.#accountStatus = accountStatus;
    }

    get fname() {
        return this.#fname;
    }

    get lname() {
        return this.#lname;
    }

    get email() {
        return this.#email;
    }

    get password() {
        return this.#password;
    }

    get accountCreated() {
        return this.#accountCreated;
    }

    get address() {
        return this.#address;
    }

    get city() {
        return this.#city;
    }

    get postalCode() {
        return this.#postalCode;
    }

    get street() {
        return this.#street;
    }

    get housenumber() {
        return this.#housenumber;
    }

    get streetNumber() {
        return this.#streetNumber;
    }

    get accountStatus() {
        return this.#accountStatus;
    }

}
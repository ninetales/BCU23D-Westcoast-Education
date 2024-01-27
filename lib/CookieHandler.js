export default class CookieHandler {

    #daysActive = 3;
    #stayLoggedIn = false;
    #userId = 0;

    constructor(userId, stayLoggedIn) {
        this.#userId = userId;
        this.#stayLoggedIn = stayLoggedIn;
    }

    setLoginCookie() {

        if (this.#stayLoggedIn) {
            const date = new Date();
            date.setTime(date.getTime() + (this.#daysActive * 24 * 60 * 60 * 1000));
            const expires = "expires=" + date.toUTCString();
            document.cookie = `westcoast_user=${this.#userId}; path=/; ${expires};`;
        } else {
            document.cookie = `westcoast_user=${this.#userId}; path=/;`;
        }
    };

    removeLoginCookie() {
        document.cookie = 'westcoast_user' + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        this.hideLoggedInElements();
        location.href = '../index.html';
    }

    getLoggedInUserIdCookie() {
        const keyValuePair = document.cookie.split(';').map(pair => pair.trim().split('='));
        const result = keyValuePair.find(([name, value]) => name === 'westcoast_user');
        if (result) {
            this.hideLoggedOutElements();
            return result[1];
        } else {
            this.hideLoggedInElements();
            return false;
        }

    }

    hideLoggedOutElements() {
        const elements = document.querySelectorAll('[data-logged-out]');
        elements.forEach((element) => {
            element.style.display = 'none';
        });
    }

    hideLoggedInElements() {
        const elements = document.querySelectorAll('[data-logged-in]');
        elements.forEach((element) => {
            element.style.display = 'none';
        });
    }

};
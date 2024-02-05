import { deleteLoginCookie } from "./cookieHandler.js";

export const logoutHandler = () => {

    const logoutBtns = document.querySelectorAll('[data-logout-btn]');
    logoutBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            deleteLoginCookie();
        });
    });

}


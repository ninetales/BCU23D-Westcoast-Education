export function setLoginCookie(userId, userRole, stayLoggedIn) {
    userRole = userRole === '' ? 'student' : userRole;
    const daysActive = 3;
    const userObject = {
        userId: userId,
        userRole: userRole
    };
    const cookieValue = JSON.stringify(userObject);
    if (stayLoggedIn) {
        const date = new Date();
        date.setTime(date.getTime() + (daysActive * 24 * 60 * 60 * 1000));
        const expires = "expires=" + date.toUTCString();
        if (document.cookie = `westcoast_user=${cookieValue}; path=/; ${expires}`) {
            return true;
        }
        else {
            return false;
        }
    }
    else {
        if (document.cookie = `westcoast_user=${cookieValue}; path=/;`) {
            return true;
        }
        else {
            return false;
        }
    }
}
export function getLoginCookie() {
    const keyValuePair = document.cookie.split(';').map(pair => pair.trim().split('='));
    const result = keyValuePair.find(([name, value]) => name === 'westcoast_user');
    if (result) {
        hideLoggedOutElements();
        const cookieValues = JSON.parse(result[1]);
        if (cookieValues.userRole === 'admin') {
            showLoggedInAdminElements();
        }
        return cookieValues;
    }
    else {
        hideLoggedInElements();
        return false;
    }
}
export function isAdminCookie() {
    const keyValuePair = document.cookie.split(';').map(pair => pair.trim().split('='));
    const result = keyValuePair.find(([name, value]) => name === 'westcoast_user');
    if (result) {
        const cookieValues = JSON.parse(result[1]);
        if (cookieValues.userRole === 'admin') {
            return true;
        }
        else {
            return false;
        }
    }
    else {
        return false;
    }
}
export function deleteLoginCookie() {
    document.cookie = 'westcoast_user' + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    hideLoggedInElements();
    location.href = '/src/index.html';
}
function hideLoggedOutElements() {
    const elements = document.querySelectorAll('[data-logged-out]');
    elements.forEach((element) => {
        element.style.display = 'none';
    });
}
function hideLoggedInElements() {
    const elements = document.querySelectorAll('[data-logged-in]');
    elements.forEach((element) => {
        element.style.display = 'none';
    });
}
function showLoggedInAdminElements() {
    const elements = document.querySelectorAll('[data-admin]');
    elements.forEach((element) => {
        element.style.display = 'block';
    });
}

import { state } from './utilities/state.js';
import { loginHandler } from './lib/loginHandler.js';
import { getLoginCookie, isAdminCookie } from './lib/cookieHandler.js';
import { addNewCourse, displayCourse, displayCourses } from './lib/courseHandler.js';
import { logoutHandler } from './lib/logoutHandler.js';
import { registerHandler } from './lib/registerHandler.js';
import { displayBookedCourses } from './dom/booked-courses-dom.js';
const initApp = () => {
    console.log('Init app');
    getLoginCookie();
    logoutHandler();
    switch (state.currentPage) {
        case '/':
        case '/src/index.html':
            console.log('Current page', state.currentPage);
            break;
        case '/src/pages/courses.html':
            console.log('Current page courses', state.currentPage);
            displayCourses();
            break;
        case '/src/pages/book.html':
            console.log('Current page', state.currentPage);
            displayCourse();
            break;
        case '/src/pages/booked-courses.html':
            console.log('Current page', state.currentPage);
            if (getLoginCookie() && isAdminCookie()) {
                displayBookedCourses();
            }
            else {
                location.href = '../index.html';
            }
            break;
        case '/src/pages/create-course.html':
            console.log('Current page create', state.currentPage);
            if (getLoginCookie() && isAdminCookie()) {
                addNewCourse();
            }
            else {
                location.href = '../index.html';
            }
            break;
        case '/src/pages/login.html':
            loginHandler();
            if (getLoginCookie()) {
                location.href = '../index.html';
            }
            break;
        case '/src/pages/register.html':
            if (getLoginCookie()) {
                location.href = '../index.html';
            }
            else {
                registerHandler();
            }
            break;
        default:
            console.log('Something went wrong with the currentpage');
            break;
    }
};
document.addEventListener('DOMContentLoaded', initApp);

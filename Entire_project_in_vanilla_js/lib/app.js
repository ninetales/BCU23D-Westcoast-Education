import { state } from '../utilities/config.js';
import UserManager from '../App/UserManager.js';
import { formValidator, formMsg } from './formHandler.js';
import CookieHandler from './cookieHandler.js';
import CourseManager from '../App/CourseManager.js';
import { courseCard } from '../dom/courses-dom.js';
import { courseDisplay } from '../dom/course-display-dom.js';
import RegisterManager from '../App/RegisterManager.js';
import { standardMessage } from '../dom/shared-dom.js';
import { newCourse } from './newCourse.js';
import { displayBookedCourses } from './bookedCourses.js';
import { sidebar } from './sidebar.js';

// Typescript imports
// import { newCourse } from '../dist/newCourse.js';


function initApp() {

    sidebar();

    switch (state.currentPage) {
        case '/':
        case '/index.html':
            break;
        case '/pages/login.html':
            document.querySelector('#loginForm').addEventListener('submit', loginHandler);
            if (new CookieHandler().getLoggedInUserIdCookie()) {
                location.href = '../index.html';
            }
            break;
        case '/pages/register.html':
            document.querySelector('#registerForm').addEventListener('submit', registerHandler);
            if (new CookieHandler().getLoggedInUserIdCookie()) {
                location.href = '../index.html';
            }
            break;
        case '/pages/courses.html':
            displayCourses();
            break;
        case '/pages/book.html':
            displayCourse();
            break;
        case '/pages/booked-courses.html':
            displayBookedCourses();
            break;
        case '/pages/create-course.html':
            newCourse();
            break;
    }

}

const loginHandler = async (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);

    if (formValidator(formData)) {

        const formEmail = formData.get('email').trim().toLowerCase();
        const formPassword = formData.get('password');
        const rememberMe = !!formData.get('rememberMe');

        const users = await new UserManager().getUsers();
        const user = users.find((user) => {
            return user.email.trim().toLowerCase() === formEmail;
        });

        if (user) {
            if (user.accountState.status === 'active') {
                if (user.password === formPassword) {
                    new CookieHandler(user.id, rememberMe, user.role).setLoginCookie();
                    location.href = '../index.html';
                } else {
                    formMsg(form, 'Incorrect email or password', 'error');
                }
            } else {
                formMsg(form, 'Please verify your account. Check your email.', 'warning');
            }

        } else {
            formMsg(form, 'Incorrect email or password', 'error');
        }

    }
}

const logoutHandler = (e) => {
    e.preventDefault();
    new CookieHandler().removeLoginCookie();
}

const logoutBtns = document.querySelectorAll('[data-logout-btn]');
logoutBtns.forEach(btn => {
    btn.addEventListener('click', logoutHandler);
});


const displayCourses = async () => {
    const result = await new CourseManager().getCourses();
    result.forEach(course => {
        document.querySelector('#courses').appendChild(courseCard(course));
    });
}

const displayCourse = async () => {
    const result = await new CourseManager().getCourses();
    const courseId = location.search.split('=')[1];
    const course = result.find((course) => course.id === courseId);
    document.querySelector('#course').appendChild(await courseDisplay(course));
}

const registerHandler = async (e) => {
    e.preventDefault();

    const form = e.target;

    const registerData = new FormData(form);
    const obj = Object.fromEntries(registerData.entries());

    if (await new UserManager('', obj.email).getUserByEmail()) {
        formMsg(form, 'Looks like you already have an account :O Try logging in instead', 'error');
    } else {
        if (makeRegistration()) {
            form.innerHTML = '';
            form.appendChild(standardMessage('Registration completed! :)', 'success'));
            // set location to login page within x seconds
        } else {
            form.innerHTML = '';
            form.appendChild(standardMessage('Registration failed! Contact support :(', 'error'));
        }
    }

    async function makeRegistration() {
        await new RegisterManager(obj.firstname, obj.lastname, obj.email, obj.city, obj.street, obj.postalcode, obj.phone, obj.password).registerUser()
    }
}


document.addEventListener('DOMContentLoaded', initApp);

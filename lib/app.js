import { state } from '../utilities/config.js';
import UserManager from '../App/UserManager.js';
import { formValidator, formErrorMsg } from './formHandler.js';
import CookieHandler from './cookieHandler.js';
import CourseManager from '../App/CourseManager.js';
import { courseCard } from '../dom/courses-dom.js';
import { courseDisplay } from '../dom/course-display-dom.js';


function initApp() {

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
            if (new CookieHandler().getLoggedInUserIdCookie()) {
                // TODO: display form if logged in
            }
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
                    new CookieHandler(user.id, rememberMe).setLoginCookie();
                    location.href = '../index.html';
                } else {
                    formErrorMsg(form, 'Incorrect email or password');
                }
            } else {
                formErrorMsg(form, 'Please verify your account. Check your email.');
            }

        } else {
            formErrorMsg(form, 'Incorrect email or password');
        }

    }
}

const logoutHandler = (e) => {
    e.preventDefault();
    new CookieHandler().removeLoginCookie();
}

document.querySelector('#logout-btn').addEventListener('click', logoutHandler);


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
    const formData = new FormData(form);
    // await formValidator(formData);
    console.log('The status of the form validation: ', formValidator(formData));

    // for (let [key, value] of entries) {
    //     if (key !== 'id') {
    //       const input = form.elements[key];
    //       input.value = value;
    //     }
    //   }

    // const users = await new UserManager().getUsers();
    // console.log(users);
}

// const login = async (...data) => {
//     // write validation reference functionality here validateForm()
//     const user await new UserManager()
// }


document.addEventListener('DOMContentLoaded', initApp);

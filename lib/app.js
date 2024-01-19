import { state } from '../utilities/config.js';
import UserManager from '../App/UserManager.js';
import { formValidator, formErrorMsg } from './formHandler.js';




function initApp() {
    console.log('Init App');

    switch (state.currentPage) {
        case '/':
        case '/index.html':
            break;
        case '/pages/login.html':
            document.querySelector('#loginForm').addEventListener('submit', loginHandler);
            break;
        case '/pages/register.html':
            document.querySelector('#registerForm').addEventListener('submit', registerHandler);
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

        const users = await new UserManager().getUsers();
        const user = users.find((user) => {
            return user.email.trim().toLowerCase() === formEmail;
        });

        if (user) {
            if (user.accountState.status === 'active') {
                if (user.password === formPassword) {
                    console.log('password match');
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

        // console.log(user);

    }

    // console.log(users);



    // for (let [key, value] of formData.entries()) {
    //     const email = 'demo@example.com';
    //     const user = users.find((user) => {
    //         return email === user.email;
    //     });
    //     console.log(user);
    // }

    // const users = await new UserManager().getUsers();
    // console.log(users);
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

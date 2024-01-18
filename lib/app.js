import UserManager from '../App/UserManager.js';
import formValidator from './formHandler.js';

const loginForm = document.querySelector('#loginForm');
const registerForm = document.querySelector('#registerForm');

function initApp() {
    console.log('Init App');
}

const loginHandler = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    console.log('The status of the form validation: ', await formValidator(formData));

    // for (let [key, value] of entries) {
    //     if (key !== 'id') {
    //       const input = form.elements[key];
    //       input.value = value;
    //     }
    //   }

    // const users = await new UserManager().getUsers();
    // console.log(users);
}
loginForm.addEventListener('submit', loginHandler);


const registerHandler = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    // await formHandler(formData);
    console.log('The status of the form validation: ', await formValidator(formData));

    // for (let [key, value] of entries) {
    //     if (key !== 'id') {
    //       const input = form.elements[key];
    //       input.value = value;
    //     }
    //   }

    // const users = await new UserManager().getUsers();
    // console.log(users);
}
registerForm.addEventListener('submit', registerHandler);

// const login = async (...data) => {
//     // write validation reference functionality here validateForm()
//     const user await new UserManager()
// }


document.addEventListener('DOMContentLoaded', initApp);

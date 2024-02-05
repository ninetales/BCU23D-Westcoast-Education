import { formHandler } from './formHandler.js';
import { getUsers } from '../services/users.js';
import { User } from '../models/User.js';
import { formMessage } from '../dom/notice-dom.js';
import { setLoginCookie } from './cookieHandler.js';


const loginHandler = () => {
  const loginForm = document.querySelector<HTMLFormElement>('#loginForm');

  if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const formData = new FormData(loginForm);
      if (formHandler(loginForm, formData)) {
        console.log('Form validated, now get users!');

        const formEmail = formData.get('email')?.toString().trim().toLowerCase();
        const formPassword = formData.get('password');
        const rememberMe = !!formData.get('rememberMe');


        const users: User[] = await getUsers();

        const user = users.find((user) => {
          return user.email.trim().toLowerCase() === formEmail;
        });


        if (user) {
          if (user.accountState.status === 'active') {
            if (user.password === formPassword) {
              if (setLoginCookie(user.id, user.role, rememberMe)) {
                location.href = '../index.html';
              }

            } else {
              formMessage(loginForm, 'Incorrect email or password', 'error');
            }
          } else {
            formMessage(loginForm, 'Please verify your account. Check your email.', 'warning');
          }

        } else {
          formMessage(loginForm, 'Incorrect email or password', 'error');
        }

      }
    });
  }
};

document.addEventListener('DOMContentLoaded', loginHandler);

export { loginHandler };

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { formHandler } from './formHandler.js';
import { getUsers } from '../services/users.js';
import { formMessage } from '../dom/notice-dom.js';
import { setLoginCookie } from './cookieHandler.js';
const loginHandler = () => {
    const loginForm = document.querySelector('#loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => __awaiter(void 0, void 0, void 0, function* () {
            var _a;
            e.preventDefault();
            const formData = new FormData(loginForm);
            if (formHandler(loginForm, formData)) {
                console.log('Form validated, now get users!');
                const formEmail = (_a = formData.get('email')) === null || _a === void 0 ? void 0 : _a.toString().trim().toLowerCase();
                const formPassword = formData.get('password');
                const rememberMe = !!formData.get('rememberMe');
                const users = yield getUsers();
                const user = users.find((user) => {
                    return user.email.trim().toLowerCase() === formEmail;
                });
                if (user) {
                    if (user.accountState.status === 'active') {
                        if (user.password === formPassword) {
                            if (setLoginCookie(user.id, user.role, rememberMe)) {
                                location.href = '../index.html';
                            }
                        }
                        else {
                            formMessage(loginForm, 'Incorrect email or password', 'error');
                        }
                    }
                    else {
                        formMessage(loginForm, 'Please verify your account. Check your email.', 'warning');
                    }
                }
                else {
                    formMessage(loginForm, 'Incorrect email or password', 'error');
                }
            }
        }));
    }
};
document.addEventListener('DOMContentLoaded', loginHandler);
export { loginHandler };

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { formMessage } from "../dom/notice-dom.js";
import { getUserByEmail, registerUser } from "../services/users.js";
export const registerHandler = () => __awaiter(void 0, void 0, void 0, function* () {
    const form = document.querySelector('#registerForm');
    form === null || form === void 0 ? void 0 : form.addEventListener('submit', (e) => __awaiter(void 0, void 0, void 0, function* () {
        e.preventDefault();
        const formData = new FormData(form);
        const registerData = {};
        formData.forEach((value, key) => {
            registerData[key] = value.toString();
        });
        const userEmail = registerData.email.toLowerCase().trim();
        if (userEmail) {
            if (yield getUserByEmail(userEmail)) {
                formMessage(form, 'An account with this email is already in use', 'error');
            }
            else {
                if (yield registerUser(registerData)) {
                    formMessage(form, 'You have successfully created an account!', 'success');
                    form.reset();
                }
                else {
                    formMessage(form, 'Not able to register at this time. Contact support...', 'error');
                }
            }
        }
        else {
            formMessage(form, 'Please fill in an email address', 'error');
        }
    }));
});

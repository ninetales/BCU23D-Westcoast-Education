import { formMessage } from "../dom/notice-dom.js";
import { getUserByEmail, registerUser } from "../services/users.js";

export const registerHandler = async () => {

    const form = document.querySelector<HTMLFormElement>('#registerForm');

    form?.addEventListener('submit', async (e) => {
        e.preventDefault();

        const formData = new FormData(form);
        const registerData: Record<string, string> = {};
        formData.forEach((value, key) => {
            registerData[key] = value.toString();
        });

        const userEmail = registerData.email.toLowerCase().trim();

        if (userEmail) {
            if (await getUserByEmail(userEmail)) {
                formMessage(form, 'An account with this email is already in use', 'error');
            } else {
                if (await registerUser(registerData)) {
                    formMessage(form, 'You have successfully created an account!', 'success');
                    form.reset();
                } else {
                    formMessage(form, 'Not able to register at this time. Contact support...', 'error');
                }
            }
        } else {
            formMessage(form, 'Please fill in an email address', 'error');
        }

    });

}
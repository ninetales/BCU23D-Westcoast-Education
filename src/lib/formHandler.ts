import { clearFormMessage, formMessage, inputErrorMessage, clearInputErrorMessage } from "../dom/notice-dom.js";

let errorCounter = 0;

const formHandler = (form: HTMLFormElement, formData: { [key: string]: any }) => {

    if (Array.from(formData.values()).filter((value: unknown) => value as string !== '').length === 0) {
        formMessage(form, 'The form cannot be empty...', 'error');
        return;
    } else {
        clearFormMessage(form);
    }

    for (let [key, value] of formData.entries()) {

        const formElement = document.querySelector<HTMLFormElement>(`[name=${key}]`);

        if (value && formElement?.hasAttribute('required')) {
            if (!validateInput(formElement, value)) {
                errorCounter++;
            }
            formElement.addEventListener('keyup', () => {
                validateInput(formElement, formElement.value);
            });
        }
    }

    if (errorCounter === 0) {
        errorCounter = 0;
        return true; // The form is all good
    } else {
        errorCounter = 0;
        return false; // Opps, something wrong with the form
    }
};

function validateInput(formElement: HTMLFormElement, value: string) {
    clearInputErrorMessage(formElement);
    if (!value) {
        formElement.parentElement?.appendChild(inputErrorMessage('This field cannot be empty'));
        return false;
    } else {
        return true;
    }
}

export { formHandler };

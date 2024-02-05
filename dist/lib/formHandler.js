import { clearFormMessage, formMessage, inputErrorMessage, clearInputErrorMessage } from "../dom/notice-dom.js";
let errorCounter = 0;
const formHandler = (form, formData) => {
    if (Array.from(formData.values()).filter((value) => value !== '').length === 0) {
        formMessage(form, 'The form cannot be empty...', 'error');
        return;
    }
    else {
        clearFormMessage(form);
    }
    for (let [key, value] of formData.entries()) {
        const formElement = document.querySelector(`[name=${key}]`);
        if (value && (formElement === null || formElement === void 0 ? void 0 : formElement.hasAttribute('required'))) {
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
    }
    else {
        errorCounter = 0;
        return false; // Opps, something wrong with the form
    }
};
function validateInput(formElement, value) {
    var _a;
    clearInputErrorMessage(formElement);
    if (!value) {
        (_a = formElement.parentElement) === null || _a === void 0 ? void 0 : _a.appendChild(inputErrorMessage('This field cannot be empty'));
        return false;
    }
    else {
        return true;
    }
}
export { formHandler };

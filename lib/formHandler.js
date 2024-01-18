import { formErrorMsg } from "./noticeHandler.js";

let errorCounter = 0;

const formValidator = async (formData) => {

    console.log(errorCounter);
    for (let [key, value] of formData.entries()) {

        const formElement = document.querySelector(`[name=${key}]`);

        if (formElement.hasAttribute('required')) {

            if (value !== '' && value !== undefined && value !== null) {
                switch (key) {
                    case 'email':
                        validateEmail(formElement, value);
                        break;
                    case 'password':
                        validateRegisterPassword(formElement, value);
                        break;
                }
            } else {
                errorInputAlert(formElement);
            }
        }
    }


    if (errorCounter === 0) {
        console.log(errorCounter);
        errorCounter = 0;
        return true; // The form is all good
    } else {
        console.log(errorCounter);
        errorCounter = 0;
        return false; // Opps, something wrong with the form
    }


}

const errorInputAlert = (element, message) => {
    errorCounter++;

    if (message === '' || message === undefined || message === null) {
        message = 'Looks like something went wrong here... ';
    }

    if (!element.parentElement.querySelector('.form-notice')) {
        element.parentElement.appendChild(formErrorMsg(message));
        element.classList.add('input-error');
    }
}

const validateEmail = (element, email) => {
    // TODO: write validation functionality
    errorInputAlert(element, 'The email provided is not valid (update this)');
    // Currently always returning invalid form. Add if else statement
}

const validateRegisterPassword = (element, password) => {
    // TODO: write validation functionality
    errorInputAlert(element, 'The password is epic (update this)');
    // Currently always returning invalid form. Add if else statement
}


export default formValidator;
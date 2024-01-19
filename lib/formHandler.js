// import { formErrorMsg } from "./noticeHandler.js";

let errorCounter = 0;

const formValidator = async (formData) => {
    console.log(formData);
    console.log(errorCounter);
    for (let [key, value] of formData.entries()) {

        const formElement = document.querySelector(`[name=${key}]`);

        if (value !== '' && value !== undefined && value !== null) {
            inputHandler(formElement, key, value);
        } else {
            errorInputAlert(formElement);
        }

        formElement.addEventListener('keyup', () => {
            inputHandler(formElement, key, formElement.value);
        });
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

const inputHandler = (formElement, inputName, inputValue) => {
    console.log('inputhandler fire!');
    console.log(formElement);
    console.log(inputName);
    console.log(inputValue);
    switch (inputName) {
        case 'email':
            validateEmail(formElement, inputValue);
            break;
        case 'password':
            validateRegisterPassword(formElement, inputValue);
            break;
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

const clearErrorInputAlert = (element) => {
    if (element.parentElement.querySelector('.form-notice')) {
        element.classList.remove('input-error');
        element.parentElement.querySelector('.form-notice').remove();
    }
}

const formErrorMsg = (text) => {
    const card = document.createElement('span');
    card.classList.add('form-notice');
    card.textContent = text;
    return card;
}


const validateEmail = (element, email) => {
    // TODO: write validation functionality
    errorInputAlert(element, 'The email provided is not valid (update this)');
    // Currently always returning invalid form. Add if else statement
}

const validateRegisterPassword = (element, password) => {
    // TODO: write validation functionality

    if (password.length >= 2) {
        clearErrorInputAlert(element);
    } else {
        errorInputAlert(element, 'The password is epic (update this)');
    }
    // Currently always returning invalid form. Add if else statement
}


export default formValidator;
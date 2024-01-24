// import { formErrorMsg } from "./noticeHandler.js";

let errorCounter = 0;

const formValidator = (formData) => {
    // console.log(formData);
    // console.log(errorCounter);

    // Check if the form is empty and prevent further execution
    if (Array.from(formData.values()).filter((value) => value !== "").length === 0) {
        return false;
    }

    for (let [key, value] of formData.entries()) {

        const formElement = document.querySelector(`[name=${key}]`);

        if (value && formElement.hasAttribute('required')) {
            inputHandler(formElement, key, value);
            formElement.addEventListener('keyup', () => {
                console.log('ELement firing: ', formElement);
                inputHandler(formElement, key, formElement.value);
            });
        }

    }


    if (errorCounter === 0) {
        // console.log(errorCounter);
        errorCounter = 0;
        return true; // The form is all good
    } else {
        // console.log(errorCounter);
        errorCounter = 0;
        return false; // Opps, something wrong with the form
    }


}

const inputHandler = (formElement, inputName, inputValue) => {
    switch (inputName) {
        case 'emails':
            validateEmail(formElement, inputValue);
            break;
        case 'registerPassword':
        case 'registerPasswordRepeat':
            console.log('password handling');
            validateRegisterPassword(formElement, inputValue);
            break;
        case 'firstname':
        case 'lastname':
        case 'country':
        case 'city':
        case 'postalcode':
        case 'phone':
            console.log('validating..');
            validateRegisterPassword(formElement, inputValue); // temporary for testing
            break;
        default:
            // errorInputAlert(formElement, 'Input cannot be empty');
            break;
    }
}

const errorInputAlert = (element, message) => {
    errorCounter++;

    if (message === '' || message === undefined || message === null) {
        message = 'Looks like something went wrong here... ';
    }

    if (!element.parentElement.querySelector('.input-notice')) {
        element.parentElement.appendChild(inputErrorMsg(message));
        element.classList.add('input-error');
    }
}

const clearErrorInputAlert = (element) => {
    if (element.parentElement.querySelector('.input-notice')) {
        element.classList.remove('input-error');
        element.parentElement.querySelector('.input-notice').remove();
    }
}

const inputErrorMsg = (text) => {
    const card = document.createElement('span');
    card.classList.add('input-notice');
    card.textContent = text;
    return card;
}

const formErrorMsg = (form, text) => {
    console.log(form);
    if (form.querySelector('.form-notice')) {
        form.querySelector('.form-notice').remove();
    }
    const card = document.createElement('span');
    card.classList.add('form-notice');
    card.textContent = text;
    form.insertBefore(card, form.firstChild);
}


const validateEmail = (element, email) => {
    // TODO: write validation functionality
    errorInputAlert(element, 'The email provided is not valid (update this)');
    // Currently always returning invalid form. Add if else statement
}


const validateRegisterPassword = (element, password) => {
    // TODO: write validation functionality
    // if (password.length >= 2) {
    //     clearErrorInputAlert(element);
    // } else {
    //     errorInputAlert(element, 'The password is epic (update this)');
    // }
    // Currently always returning invalid form. Add if else statement
}


export { formValidator, formErrorMsg };
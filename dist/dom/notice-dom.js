import { createDiv, createSpan } from "./shared-dom.js";
export const standardMessage = (text, messageType) => {
    const messageCard = createDiv();
    switch (messageType) {
        case 'success':
            messageCard.classList.add('simple-notice--success');
            break;
        case 'error':
            messageCard.classList.add('simple-notice--error');
            break;
    }
    messageCard.classList.add('simple-notice');
    messageCard.textContent = text;
    return messageCard;
};
export const formMessage = (form, text, messageType) => {
    const card = createSpan(text);
    card.classList.add('form-notice');
    switch (messageType) {
        case 'error':
            card.classList.add('form-notice--error');
            break;
        case 'success':
            card.classList.add('form-notice--success');
            break;
        case 'warning':
            card.classList.add('form-notice--warning');
            break;
    }
    clearFormMessage(form);
    form.insertBefore(card, form.firstChild);
};
export const clearFormMessage = (form) => {
    var _a;
    if (form.querySelector('.form-notice')) {
        (_a = form.querySelector('.form-notice')) === null || _a === void 0 ? void 0 : _a.remove();
    }
};
export const inputErrorMessage = (text) => {
    const card = document.createElement('span');
    card.classList.add('input-notice');
    card.textContent = text;
    return card;
};
export const clearInputErrorMessage = (element) => {
    var _a, _b;
    if ((_a = element.parentElement) === null || _a === void 0 ? void 0 : _a.querySelector('.input-notice')) {
        element.classList.remove('input-error');
        (_b = element.parentElement.querySelector('.input-notice')) === null || _b === void 0 ? void 0 : _b.remove();
    }
};

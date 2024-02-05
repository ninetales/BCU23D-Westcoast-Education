import { createDiv, createSpan } from "./shared-dom.js";

export const standardMessage = (text: string, messageType: string) => {
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
}

export const formMessage = (form: HTMLFormElement, text: string, messageType: string) => {
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
}

export const clearFormMessage = (form: HTMLFormElement) => {
    if (form.querySelector<HTMLSpanElement>('.form-notice')) {
        form.querySelector<HTMLSpanElement>('.form-notice')?.remove();
    }
}

export const inputErrorMessage = (text: string) => {
    const card = document.createElement('span');
    card.classList.add('input-notice');
    card.textContent = text;
    return card;
}

export const clearInputErrorMessage = (element: HTMLFormElement) => {
    if (element.parentElement?.querySelector('.input-notice')) {
        element.classList.remove('input-error');
        element.parentElement.querySelector('.input-notice')?.remove();
    }
}
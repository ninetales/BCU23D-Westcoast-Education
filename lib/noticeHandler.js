const formErrorMsg = (text) => {
    const card = document.createElement('span');
    card.classList.add('form-notice');
    card.textContent = text;
    return card;
}

export { formErrorMsg };
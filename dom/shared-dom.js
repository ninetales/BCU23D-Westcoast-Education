export const createDiv = () => {
    const div = document.createElement('div');
    return div;
}

export const createSpan = (text) => {
    const span = document.createElement('span');
    span.textContent = text;
    return span;
}


export const createUl = () => {
    const ul = document.createElement('ul');
    return ul;
}

export const createOl = () => {
    const ol = document.createElement('ol');
    return ol;
}

export const createLi = (text) => {
    const li = document.createElement('li');
    li.textContent = text;
    return li;
}

export const createLiIcon = (icon, text) => {
    const li = document.createElement('li');
    li.classList.add('list-item-with-icon')
    const textInfo = document.createElement('span');
    textInfo.textContent = text;
    li.appendChild(createIcon(icon));
    li.appendChild(textInfo);
    return li;
}


export const createAside = () => {
    const aside = document.createElement('aside');
    return aside;
}

export const createIcon = (text) => {
    const icon = document.createElement('i');
    icon.classList.add(text);
    return icon;
}

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
}
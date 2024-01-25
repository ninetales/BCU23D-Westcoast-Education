import CookieHandler from "../lib/cookieHandler.js";

const courseCard = (course) => {
    const card = document.createElement('div');
    card.classList.add('course-card');

    const imgCon = createDiv();
    imgCon.classList.add('course-card__img-con');
    const img = document.createElement('img');
    if (course.image.src) {
        // img.src = course.image.src;
        img.src = "/assets/images/courses/no-img.png"; // Temporary
    } else {
        img.src = "/assets/images/courses/no-img.png";
    }

    img.alt = course.image.description;
    card.appendChild(imgCon);
    imgCon.appendChild(img);

    if (course.featured) {
        const featured = createDiv();
        featured.classList.add('course-card__featured');
        const featuredIcon = createIcon('iconoir-bright-star');
        featured.appendChild(featuredIcon);
        featured.appendChild(createSpan('Featured'));
        imgCon.appendChild(featured);
    }

    const body = createDiv();
    body.classList.add('course-card__body');
    card.appendChild(body);

    const title = document.createElement('H4');
    title.textContent = course.courseTitle;
    body.appendChild(title);

    const courseCode = createSpan(`Coursecode: ${course.courseCode}`);
    body.appendChild(courseCode);

    const days = createSpan();
    days.textContent = `Duration: ${course.durationInDays} days`;
    body.appendChild(days);

    const location = createDiv();
    location.appendChild(createSpan('Available location: '));
    if (course.location.online) {
        location.appendChild(createSpan('Online'));
    }

    if (course.location.classroom) {
        location.appendChild(createSpan('Classroom'));
    }

    body.appendChild(location);

    const courseDate = createSpan(`Course date: ${course.scheduledDate}`)
    body.appendChild(courseDate);

    const price = createSpan(`Price: ${course.price} SEK`);
    body.appendChild(price);

    if (new CookieHandler().loggedInCookie()) {
        const bookingBtn = document.createElement('a');
        bookingBtn.classList.add('course-card__book-link');
        bookingBtn.setAttribute('href', `/pages/book.html?id=${course.id}`);
        bookingBtn.textContent = 'Book now';
        body.appendChild(bookingBtn);
    } else {
        console.log('You need to login to book');
        const loginLink = document.createElement('a');
        loginLink.setAttribute('href', '/pages/login.html');
        loginLink.textContent = 'login';

        const registerLink = document.createElement('a');
        registerLink.setAttribute('href', '/pages/register.html');
        registerLink.textContent = 'register';

        const bookingMsg = createDiv();
        bookingMsg.innerHTML = `To book, please ${loginLink.outerHTML} or ${registerLink.outerHTML}`;
        body.appendChild(bookingMsg);
    }

    return card;
}

const createDiv = () => {
    const div = document.createElement('div');
    return div;
}

const createSpan = (text) => {
    const span = document.createElement('span');
    span.textContent = text;
    return span;
}

const createIcon = (text) => {
    const icon = document.createElement('i');
    icon.classList.add(text);
    return icon;
}

export { courseCard };
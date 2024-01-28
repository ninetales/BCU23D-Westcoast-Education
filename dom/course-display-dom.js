import { createAside, createDiv, createSpan, createIcon, createLi, createUl, createLiIcon, standardMessage } from "./shared-dom.js";
import CookieHandler from "../lib/cookieHandler.js";
import { bookingForm } from "./booking-form-dom.js";
import BookingManager from "../App/BookingManager.js";

const courseDisplay = async (course) => {

    const container = createDiv();
    container.classList.add('course-display-con');

    const imgCon = createDiv();
    imgCon.classList.add('course-display-con__img-con');
    container.appendChild(imgCon);

    const img = document.createElement('img');
    if (course.image.src) {
        // img.src = course.image.src;
        img.src = "/assets/images/courses/no-img.png"; // Temporary
    } else {
        img.src = "/assets/images/courses/no-img.png";
    }

    img.alt = course.image.description;
    imgCon.appendChild(img);

    if (course.featured) {
        const featured = createDiv();
        featured.classList.add('course-display-con__featured');
        featured.appendChild(createIcon('iconoir-user-star'));
        featured.appendChild(createSpan('Featured'));
        imgCon.appendChild(featured);
    }

    const body = createDiv();
    body.classList.add('course-display-con__body')
    container.appendChild(body);

    const generalTextCon = createDiv();
    generalTextCon.classList.add('course-display-con__text-con');
    body.appendChild(generalTextCon);

    const asideInfo = createAside();
    asideInfo.classList.add('course-display-con__info');
    body.appendChild(asideInfo);

    const title = document.createElement('h2');
    title.textContent = course.courseTitle;
    generalTextCon.appendChild(title);

    const description = document.createElement('p');
    description.textContent = course.description.long;
    generalTextCon.appendChild(description);


    const loginLink = document.createElement('a');
    loginLink.setAttribute('href', '/pages/login.html');
    loginLink.textContent = 'login';

    const registerLink = document.createElement('a');
    registerLink.setAttribute('href', '/pages/register.html');
    registerLink.textContent = 'register';

    if (!new CookieHandler().getLoggedInUserIdCookie()) {
        const bookingMsg = createDiv();
        bookingMsg.classList.add('simple-notice');
        bookingMsg.innerHTML = `To book this course, please ${loginLink.outerHTML} or ${registerLink.outerHTML}`;
        generalTextCon.appendChild(bookingMsg);
    } else {
        const userId = new CookieHandler().getLoggedInUserIdCookie();
        if (await new BookingManager(userId, course.id).getBookingStatus()) {
            generalTextCon.appendChild(standardMessage('You have already booked this course :)', 'success'));
        } else {
            generalTextCon.appendChild(bookingForm(course));
        }
    }

    const listInfo = createUl();
    listInfo.classList.add('course-display-con__info-list')
    asideInfo.appendChild(listInfo);

    if (course.featured) {
        const featured = createLiIcon('iconoir-user-star', 'Featured course');
        listInfo.appendChild(featured);
    }

    const courseCode = createLiIcon('iconoir-cube', `Coursecode: ${course.courseCode}`);
    listInfo.appendChild(courseCode);


    const days = createLiIcon('iconoir-timer', `Duration: ${course.durationInDays} days`);
    listInfo.appendChild(days);

    const locationCon = createLi();
    const locationList = createUl();
    locationCon.appendChild(locationList);


    const locationHeader = createLiIcon('iconoir-map-pin', 'Available location:');
    locationList.appendChild(locationHeader);

    if (course.location.online) {
        const locationHeader = createLiIcon('iconoir-internet', 'Online');
        locationList.appendChild(locationHeader);
    }

    if (course.location.classroom) {
        const locationHeader = createLiIcon('iconoir-city', 'Classroom');
        locationList.appendChild(locationHeader);
    }

    listInfo.appendChild(locationCon);

    const courseDate = createLiIcon('iconoir-calendar', `Course date: ${course.scheduledDate}`);
    listInfo.appendChild(courseDate);


    const price = createLiIcon('iconoir-mastercard-card', `Price: ${course.price} SEK`);
    listInfo.appendChild(price);


    if (!new CookieHandler().getLoggedInUserIdCookie()) {
        const bookingMsg = createLi();
        bookingMsg.innerHTML = `To book this course, please ${loginLink.outerHTML} or ${registerLink.outerHTML}`;
        listInfo.appendChild(bookingMsg);
    }

    return container;

}

export { courseDisplay }
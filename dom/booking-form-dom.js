import CookieHandler from "../lib/cookieHandler.js";
import UserManager from "../App/UserManager.js";
import BookingManager from "../App/BookingManager.js";
import { standardMessage } from "./shared-dom.js";

const userId = new CookieHandler().getLoggedInUserIdCookie();

const bookingForm = (courseId) => {
    const form = document.createElement('form');
    form.classList.add('booking-form');

    if (new CookieHandler().getLoggedInUserIdCookie()) {
        fillForm(form);
    }

    const formTitle = document.createElement('h3');
    formTitle.textContent = 'Book this course';
    form.appendChild(formTitle);

    form.appendChild(createInput('Firstname*', 'firstname', '', '', true));
    form.appendChild(createInput('Lastname*', 'lastname', '', '', true));
    form.appendChild(createInput('Address*', 'address', '', '', true));
    form.appendChild(createInput('Email*', 'email', '', '', true));
    form.appendChild(createInput('Phone*', 'phone', '', '', true));

    const hiddenFieldUserId = document.createElement('input');
    hiddenFieldUserId.setAttribute('name', 'userId');
    hiddenFieldUserId.setAttribute('type', 'hidden');
    hiddenFieldUserId.value = userId;
    form.appendChild(hiddenFieldUserId);

    const hiddenFieldCourseId = document.createElement('input');
    hiddenFieldCourseId.setAttribute('name', 'courseId');
    hiddenFieldCourseId.setAttribute('type', 'hidden');
    hiddenFieldCourseId.value = courseId;
    form.appendChild(hiddenFieldCourseId);

    const hiddenFieldDate = document.createElement('input');
    const todaysDate = new Date().toISOString().split('T')[0];
    hiddenFieldDate.value = todaysDate;
    hiddenFieldDate.setAttribute('name', 'date');
    hiddenFieldDate.setAttribute('type', 'hidden');
    form.appendChild(hiddenFieldDate);

    const preFillBtn = document.createElement('button');
    preFillBtn.textContent = 'Fill form with account data';
    preFillBtn.addEventListener('click', (e) => {
        e.preventDefault();
        fillForm();
    });
    form.appendChild(preFillBtn);

    const resetFormBtn = document.createElement('input');
    resetFormBtn.setAttribute('type', 'reset');
    resetFormBtn.setAttribute('value', 'Clear form fields');
    resetFormBtn.addEventListener('click', form.reset());
    form.appendChild(resetFormBtn);

    const submitBtn = document.createElement('input');
    submitBtn.setAttribute('type', 'submit');
    submitBtn.setAttribute('value', 'Book course');
    form.appendChild(submitBtn);

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const bookingData = new FormData(form);
        const obj = Object.fromEntries(bookingData.entries());

        const makeBooking = async () => {
            await new BookingManager(userId, courseId, obj.firstname, obj.lastname, obj.address, obj.date, obj.email, obj.phone).bookCourse()
        }
        if (makeBooking()) {
            form.innerHTML = '';
            form.appendChild(standardMessage('Booking completed! :)', 'success'));
        } else {
            form.innerHTML = '';
            form.appendChild(standardMessage('Booking failed! Contact support :(', 'error'));
        }

    })

    return form;

}

export { bookingForm };

async function fillForm() {
    const user = await new UserManager(userId).getSingleUser();

    const bookingData = {
        firstname: user.fname,
        lastname: user.lname,
        address: user.address.street,
        email: user.email,
        phone: user.phone
    }

    for (let key in bookingData) {
        document.querySelector(`[name=${key}]`).value = bookingData[key];
    }

}

function createInput(labelName, inputName, inputType, inputValue, requiredField) {
    const label = document.createElement('label');
    const labelText = document.createElement('span')
    labelText.textContent = labelName;

    const input = document.createElement('input');
    input.setAttribute('name', inputName.toLowerCase().trim());

    if (requiredField) {
        input.setAttribute('required', '');
    }

    if (inputType) {
        input.setAttribute('type', inputType.toLowerCase().trim());
    }

    if (inputValue) {
        input.setAttribute('value', inputValue.trim());
    }

    label.appendChild(labelText);
    label.appendChild(input);
    return label;
}
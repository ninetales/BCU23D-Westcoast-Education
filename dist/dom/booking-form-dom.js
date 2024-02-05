var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { getLoginCookie } from "../lib/cookieHandler.js";
import { bookCourse } from "../services/courses.js";
import { getSingleUser } from "../services/users.js";
import { standardMessage } from "./notice-dom.js";
export const bookingForm = (userId, course) => {
    const form = document.createElement('form');
    form.classList.add('booking-form');
    if (getLoginCookie()) {
        fillForm(userId);
    }
    const formTitle = document.createElement('h3');
    formTitle.textContent = 'Book this course';
    form.appendChild(formTitle);
    form.appendChild(createInput('Firstname*', 'firstname', '', '', true));
    form.appendChild(createInput('Lastname*', 'lastname', '', '', true));
    form.appendChild(createInput('Address*', 'address', '', '', true));
    form.appendChild(createInput('Email*', 'email', '', '', true));
    form.appendChild(createInput('Phone*', 'phone', '', '', true));
    const locationLabel = document.createElement('label');
    const locationLabelText = document.createElement('span');
    locationLabelText.textContent = 'Choose location*';
    const location = document.createElement('select');
    location.setAttribute('name', 'location');
    location.setAttribute('required', '');
    locationLabel.appendChild(locationLabelText);
    locationLabel.appendChild(location);
    form.appendChild(locationLabel);
    if (course.location.online) {
        const online = document.createElement('option');
        online.value = 'online';
        online.textContent = 'Online';
        location.appendChild(online);
    }
    if (course.location.classroom) {
        const classroom = document.createElement('option');
        classroom.value = 'classroom';
        classroom.textContent = 'Classroom';
        location.appendChild(classroom);
    }
    const hiddenFieldUserId = document.createElement('input');
    hiddenFieldUserId.setAttribute('name', 'userId');
    hiddenFieldUserId.setAttribute('type', 'hidden');
    hiddenFieldUserId.value = userId.toString();
    form.appendChild(hiddenFieldUserId);
    const hiddenFieldCourseId = document.createElement('input');
    hiddenFieldCourseId.setAttribute('name', 'courseId');
    hiddenFieldCourseId.setAttribute('type', 'hidden');
    hiddenFieldCourseId.value = course.id.toString();
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
        fillForm(userId);
    });
    form.appendChild(preFillBtn);
    const resetFormBtn = document.createElement('input');
    resetFormBtn.setAttribute('type', 'reset');
    resetFormBtn.setAttribute('value', 'Clear form fields');
    resetFormBtn.addEventListener('click', () => {
        form.reset();
    });
    form.appendChild(resetFormBtn);
    const submitBtn = document.createElement('input');
    submitBtn.setAttribute('type', 'submit');
    submitBtn.setAttribute('value', 'Book course');
    form.appendChild(submitBtn);
    form.addEventListener('submit', (e) => __awaiter(void 0, void 0, void 0, function* () {
        e.preventDefault();
        const formData = new FormData(form);
        const bookingData = {};
        formData.forEach((value, key) => {
            bookingData[key] = value.toString();
        });
        if (yield bookCourse(bookingData)) {
            form.innerHTML = '';
            form.appendChild(standardMessage('Booking completed! :)', 'success'));
        }
        else {
            form.innerHTML = '';
            form.appendChild(standardMessage('Booking failed! Contact support :(', 'error'));
        }
    }));
    return form;
};
function fillForm(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield getSingleUser(userId);
        if (user) {
            const bookingData = {
                firstname: user.fname,
                lastname: user.lname,
                address: user.address.street,
                email: user.email,
                phone: user.phone
            };
            for (let key in bookingData) {
                document.querySelector(`[name=${key}]`).value = bookingData[key];
            }
        }
    });
}
function createInput(labelName, inputName, inputType, inputValue, requiredField) {
    const label = document.createElement('label');
    const labelText = document.createElement('span');
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

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { getCourse, getCourses, registerCourse } from "../services/courses.js";
import { courseCard } from "../dom/courses-dom.js";
import { courseDisplay } from "../dom/course-dom.js";
import { formMessage } from "../dom/notice-dom.js";
export const displayCourses = () => __awaiter(void 0, void 0, void 0, function* () {
    const courses = yield getCourses();
    if (courses) {
        const container = document.querySelector('#courses');
        courses.forEach(course => {
            container === null || container === void 0 ? void 0 : container.appendChild(courseCard(course));
        });
    }
});
export const displayCourse = () => __awaiter(void 0, void 0, void 0, function* () {
    const courseId = parseInt(location.search.split('=')[1]);
    const course = yield getCourse(courseId);
    if (course) {
        const container = document.querySelector('#course');
        container === null || container === void 0 ? void 0 : container.appendChild(yield courseDisplay(course[0]));
    }
});
export const addNewCourse = () => {
    const form = document.querySelector('#newCourseForm');
    form === null || form === void 0 ? void 0 : form.addEventListener('submit', (e) => __awaiter(void 0, void 0, void 0, function* () {
        e.preventDefault();
        const formData = new FormData(form);
        const registerCourseData = {};
        formData.forEach((value, key) => {
            registerCourseData[key] = value.toString();
        });
        console.log('add new course', registerCourseData);
        if (yield registerCourse(registerCourseData)) {
            form.reset();
            formMessage(form, 'The course have been saved :)', 'success');
        }
        else {
            form.reset();
            formMessage(form, 'Registration failed! Contact support :(', 'error');
        }
    }));
};

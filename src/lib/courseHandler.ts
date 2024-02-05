import { Course } from "../models/Course.js";
import { getCourse, getCourses, registerCourse } from "../services/courses.js";
import { courseCard } from "../dom/courses-dom.js";
import { courseDisplay } from "../dom/course-dom.js";
import { formMessage } from "../dom/notice-dom.js";

export const displayCourses = async () => {
    const courses: Course[] = await getCourses();

    if (courses) {
        const container = document.querySelector<HTMLDivElement>('#courses');
        courses.forEach(course => {
            container?.appendChild(courseCard(course));
        });
    }
}

export const displayCourse = async () => {
    const courseId = parseInt(location.search.split('=')[1]);
    const course: Course[] = await getCourse(courseId);

    if (course) {
        const container = document.querySelector<HTMLDivElement>('#course');
        container?.appendChild(await courseDisplay(course[0]));
    }
}

export const addNewCourse = () => {

    const form = document.querySelector<HTMLFormElement>('#newCourseForm');

    form?.addEventListener('submit', async (e) => {
        e.preventDefault();

        const formData = new FormData(form);
        const registerCourseData: Record<string, string> = {};
        formData.forEach((value, key) => {
            registerCourseData[key] = value.toString();
        });

        console.log('add new course', registerCourseData);

        if (await registerCourse(registerCourseData)) {
            form.reset();
            formMessage(form, 'The course have been saved :)', 'success');
        } else {
            form.reset();
            formMessage(form, 'Registration failed! Contact support :(', 'error');
        }

    });

}
import CourseManager from "../App/CourseManager.js";
import { formMsg } from "../lib/formHandler.js";

const newCourse = async () => {

    const form = document.querySelector('#newCourseForm');

    form?.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(form);

        const courseData = {
            courseTitle: formData.get('courseTitle'),
            description: {
                short: 'Short demo description text',
                long: 'Long demo description text',
            },
            courseCode: formData.get('courseCode'),
            scheduledDate: '',
            durationInDays: formData.get('days'),
            location: {
                online: true,
                classroom: true,
            },
            image: {
                src: '',
                description: 'Image alt description text',
            },
            featured: false,
            price: formData.get('price'),
        };

        const registerCourse = async () => {
            new CourseManager(courseData.courseTitle, courseData.description.short, courseData.description.long, courseData.courseCode, courseData.scheduledDate, courseData.durationInDays, courseData.location.online, courseData.location.classroom, courseData.image.src, courseData.image.description, courseData.featured, courseData.price).createCourse();
        }
        if (registerCourse()) {
            form.reset();
            formMsg(form, 'The course have been saved :)', 'success');
        } else {
            form.reset();
            formMsg(form, 'Registration failed! Contact support :(', 'error');
        }


    });
};

export { newCourse }
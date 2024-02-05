var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// @ts-ignore
import addCourse from '../dist/courseCreationManager.js';
export const newCourse = () => __awaiter(void 0, void 0, void 0, function* () {
    console.log('new course file loaded!');
    const form = document.querySelector('#newCourseForm');
    form === null || form === void 0 ? void 0 : form.addEventListener('submit', (e) => {
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
            durationInDays: +formData.get('days'),
            location: {
                online: true,
                classroom: true,
            },
            image: {
                src: '',
                description: 'Image alt description text',
            },
            featured: false,
            price: parseFloat(formData.get('price')),
        };
        console.log(courseData);
        addCourse(courseData);
    });
});

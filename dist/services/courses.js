var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { addData, fetchData } from "../utilities/Http.js";
export function getCourses() {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield fetchData('courses/');
        return result;
    });
}
export function getCourse(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield fetchData('courses', `id=${id}`);
        return result;
    });
}
export function getBookedCourse(userId, courseId) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield fetchData('enrollments', `userId=${userId}&courseId=${courseId}`);
        if (Array.isArray(result) && result.length > 0) {
            return result[0];
        }
        return null;
    });
}
export function getBookedCourses() {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield fetchData('enrollments');
        if (Array.isArray(result) && result.length > 0) {
            return result;
        }
        return null;
    });
}
export function bookCourse(formData) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const bookingData = {
                userId: parseInt(formData.userId),
                courseId: parseInt(formData.courseId),
                date: formData.date,
                fname: formData.firstname,
                lname: formData.lastname,
                email: formData.email,
                phone: formData.phone,
                address: formData.address,
                location: formData.location
            };
            const result = yield addData('enrollments', bookingData);
            if (result) {
                return true;
            }
            else {
                return false;
            }
        }
        catch (error) {
            if (error instanceof Error) {
                throw new Error(error.message);
            }
        }
    });
}
export const registerCourse = (course) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const courseData = {
            courseTitle: course.courseTitle,
            description: {
                short: 'Short demo description text',
                long: 'Long demo description text',
            },
            courseCode: course.courseCode,
            scheduledDate: '',
            durationInDays: parseInt(course.days),
            location: {
                online: true,
                classroom: true,
            },
            image: {
                src: '../assets/images/courses/no-img.png',
                description: 'Image alt description text',
            },
            featured: false,
            price: parseInt(course.price),
        };
        const result = yield addData('courses', courseData);
        if (result) {
            return true;
        }
        else {
            return false;
        }
    }
    catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message);
        }
    }
});

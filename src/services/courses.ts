import { Course } from "../models/Course.js";
import { addData, fetchData } from "../utilities/Http.js";

export async function getCourses(): Promise<Course[]> { // Undersök det här med promise och interface
    const result = await fetchData('courses/');
    return result as Course[];
}


export async function getCourse(id: number): Promise<Course[]> { // Undersök det här med promise och interface
    const result = await fetchData('courses', `id=${id}`);
    return result as Course[];
}


export async function getBookedCourse(userId: number, courseId: number): Promise<object | null> { // Undersök det här med promise och interface
    const result = await fetchData('enrollments', `userId=${userId}&courseId=${courseId}`);

    if (Array.isArray(result) && result.length > 0) {
        return result[0] as object;
    }

    return null;
}


export async function getBookedCourses(): Promise<any[] | null> {
    const result = await fetchData('enrollments');

    if (Array.isArray(result) && result.length > 0) {
        return result;
    }

    return null
}

export async function bookCourse(formData: any): Promise<boolean | undefined> {

    try {
        const bookingData = {
            userId: formData.userId,
            courseId: formData.courseId,
            date: formData.date,
            fname: formData.firstname,
            lname: formData.lastname,
            email: formData.email,
            phone: formData.phone,
            address: formData.address,
            location: formData.location
        }

        const result = await addData('enrollments', bookingData);
        if (result) {
            return true;
        } else {
            return false;
        }
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message);
        }
    }
}

export const registerCourse = async (course: any): Promise<boolean | undefined> => {

    try {

        const courseData = {
            courseTitle: course.courseTitle,
            description: {
                short: 'Short demo description text',
                long: 'Long demo description text',
            },
            courseCode: course.courseCode,
            scheduledDate: '',
            durationInDays: course.days,
            location: {
                online: true,
                classroom: true,
            },
            image: {
                src: '../assets/images/courses/no-img.png',
                description: 'Image alt description text',
            },
            featured: false,
            price: course.price,
        };

        const result = await addData('courses', courseData);
        if (result) {
            return true;
        } else {
            return false;
        }

    } catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message);
        }
    }

}
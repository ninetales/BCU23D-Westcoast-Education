import HttpClient from "../lib/Http.js";
import { settings } from "../utilities/config.js";

export default class CourseManager {

    #courseTitle = '';
    #shortDescription = 'Short demo description text';
    #longDescription = 'Long demo description text';
    #courseCode = '';
    #scheduledDate = '';
    #durationInDays = '';
    #locationOnline = true;
    #locationClassroom = true;
    #imageSrc = '';
    #imageDescription = '';
    #featured = false;
    #price = 0;

    constructor(
        courseTitle,
        shortDescription,
        longDescription,
        courseCode,
        scheduledDate,
        durationInDays,
        locationOnline,
        locationClassroom,
        imageSrc,
        imageDescription,
        featured,
        price
    ) {
        this.#courseTitle = courseTitle;
        this.#shortDescription = shortDescription;
        this.#longDescription = longDescription;
        this.#courseCode = courseCode;
        this.#scheduledDate = scheduledDate;
        this.#durationInDays = durationInDays;
        this.#locationOnline = locationOnline;
        this.#locationClassroom = locationClassroom;
        this.#imageSrc = imageSrc;
        this.#imageDescription = imageDescription;
        this.#featured = featured;
        this.#price = price;
    }

    async getCourses() {
        try {
            const http = new HttpClient(`${settings.DB_COURSE_PATH}`);
            const result = http.get();
            return result;
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async createCourse() {
        try {
            const registerData = {
                courseTitle: this.#courseTitle,
                description: {
                    short: this.#shortDescription,
                    long: this.#longDescription,
                },
                courseCode: this.#courseCode,
                scheduledDate: this.#scheduledDate,
                durationInDays: this.#durationInDays,
                location: {
                    online: this.#locationOnline,
                    classroom: this.#locationClassroom
                },
                image: {
                    src: this.#imageSrc,
                    description: this.#imageDescription
                },
                featured: this.#featured,
                price: this.#price
            }
            const http = new HttpClient(`${settings.DB_COURSE_PATH}`);
            await http.add(registerData);
            return true;
        } catch (error) {
            throw new Error(error.message);
        }
    }

}
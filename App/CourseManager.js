import HttpClient from "../lib/Http.js";
import { settings } from "../utilities/config.js";

export default class CourseManager {

    async getCourses() {
        try {
            const http = new HttpClient(`${settings.DB_COURSE_PATH}`);
            const result = http.get();
            return result;
        } catch (error) {
            throw new Error(error.message);
        }
    }

}
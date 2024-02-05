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
import { HttpClient } from '../lib/http.js';
// @ts-ignore
import { settings } from '../utilities/config.js';
const addCourse = (courseData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const http = new HttpClient(`${settings.DB_COURSE_PATH}`);
        yield http.add(courseData);
        return true;
    }
    catch (error) {
        throw new Error(error);
    }
});
export default addCourse;

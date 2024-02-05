// @ts-ignore
import { HttpClient } from '../lib/http.js';
// @ts-ignore
import { settings } from '../utilities/config.js';

const addCourse = async (courseData: object) => {
  try {
    const http = new HttpClient(`${settings.DB_COURSE_PATH}`);
    await http.add(courseData);
    return true;
  } catch (error: any) {
    throw new Error(error);
  }
};

export default addCourse;

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { getBookedCourses, getCourses } from "../services/courses.js";
import { createDiv, createLi, createOl, createUl } from "./shared-dom.js";
export const displayBookedCourses = () => __awaiter(void 0, void 0, void 0, function* () {
    const courses = yield getCourses();
    const enrollments = yield getBookedCourses();
    console.log(courses, enrollments);
    courses.forEach(course => {
        const courseCard = createDiv();
        courseCard.classList.add('course-enrollment-details');
        const courseDetails = createUl();
        courseDetails.appendChild(createLi(course.courseTitle));
        courseDetails.appendChild(createLi(`Course code: ${course.courseCode}`));
        courseDetails.appendChild(createLi(`Scheduled date: ${course.scheduledDate}`));
        courseDetails.appendChild(createLi(`Duration: ${course.durationInDays} days`));
        courseCard.appendChild(courseDetails);
        const enrolledStudents = enrollments === null || enrollments === void 0 ? void 0 : enrollments.filter(student => student.courseId === course.id);
        console.log('enrollments', enrolledStudents);
        if ((enrolledStudents === null || enrolledStudents === void 0 ? void 0 : enrolledStudents.length) !== 0) {
            const studentList = createOl();
            studentList.classList.add('course-enrollments');
            courseCard.appendChild(studentList);
            enrolledStudents === null || enrolledStudents === void 0 ? void 0 : enrolledStudents.forEach(student => {
                const listItem = createLi('');
                listItem.classList.add('course-enrollments__student');
                const studentDetailsCon = createUl();
                listItem.appendChild(studentDetailsCon);
                studentDetailsCon.appendChild(createLi(`Student: ${student.fname} ${student.lname}`));
                studentDetailsCon.appendChild(createLi(`Email: ${student.email}`));
                studentDetailsCon.appendChild(createLi(`Phone: ${student.phone}`));
                studentDetailsCon.appendChild(createLi(`Address: ${student.address}`));
                studentDetailsCon.appendChild(createLi(`Location:: ${student.location}`));
                studentList.appendChild(listItem);
            });
        }
        const courseBoard = document.querySelector('#booked-courses');
        courseBoard === null || courseBoard === void 0 ? void 0 : courseBoard.appendChild(courseCard);
    });
});

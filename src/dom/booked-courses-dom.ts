import { getBookedCourses, getCourses } from "../services/courses.js";
import { createDiv, createLi, createOl, createUl } from "./shared-dom.js";

export const displayBookedCourses = async () => {
    const courses = await getCourses();
    const enrollments = await getBookedCourses();

    courses.forEach(course => {
        const courseCard = createDiv()
        courseCard.classList.add('course-enrollment-details');

        const courseDetails = createUl();
        courseDetails.appendChild(createLi(course.courseTitle));
        courseDetails.appendChild(createLi(`Course code: ${course.courseCode}`));
        courseDetails.appendChild(createLi(`Scheduled date: ${course.scheduledDate}`));
        courseDetails.appendChild(createLi(`Duration: ${course.durationInDays} days`));
        courseCard.appendChild(courseDetails);

        let enrolledStudents = enrollments ? enrollments.filter(student => student.courseId === course.id) : [];


        if (enrolledStudents.length !== 0) {
            const studentList = createOl();
            studentList.classList.add('course-enrollments');
            courseCard.appendChild(studentList);

            enrolledStudents.forEach(student => {
                const listItem = createLi('');
                listItem.classList.add('course-enrollments__student')
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

        const courseBoard = document.querySelector<HTMLDivElement>('#booked-courses');
        courseBoard?.appendChild(courseCard)
    });
}
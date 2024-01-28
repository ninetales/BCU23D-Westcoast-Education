import CourseManager from '../App/CourseManager.js';
import BookingManager from '../App/BookingManager.js';
import { createDiv, createSpan, createUl, createOl, createLi } from '../dom/shared-dom.js';

const courseBoard = document.querySelector('#booked-courses');

const displayBookedCourses = async () => {
    const courses = await new CourseManager().getCourses();
    const enrollments = await new BookingManager().getBookedCourses();

    courses.forEach(course => {
        const courseCard = createDiv()
        courseCard.classList.add('course-enrollment-details');

        const courseDetails = createUl();
        courseDetails.appendChild(createLi(course.courseTitle));
        courseDetails.appendChild(createLi(`Course code: ${course.courseCode}`));
        courseDetails.appendChild(createLi(`Scheduled date: ${course.scheduledDate}`));
        courseDetails.appendChild(createLi(`Duration: ${course.durationInDays} days`));
        courseCard.appendChild(courseDetails);

        const enrolledStudents = enrollments.filter(student => student.courseId === course.id);
        if (enrolledStudents.length !== 0) {
            const studentList = createOl();
            studentList.classList.add('course-enrollments');
            courseCard.appendChild(studentList);

            enrolledStudents.forEach(student => {
                const listItem = createLi();
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


        courseBoard.appendChild(courseCard)
    });
}

export { displayBookedCourses }
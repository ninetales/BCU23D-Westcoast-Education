// @ts-ignore
import addCourse from '../dist/courseCreationManager.js';

export const newCourse = async () => {
  console.log('new course file loaded!');
  const form = document.querySelector<HTMLFormElement>('#newCourseForm');

  form?.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(form);

    const courseData = {
      courseTitle: formData.get('courseTitle') as string,
      description: {
        short: 'Short demo description text' as string,
        long: 'Long demo description text' as string,
      },
      courseCode: formData.get('courseCode') as string,
      scheduledDate: '' as string,
      durationInDays: +formData.get('days')!,
      location: {
        online: true as boolean,
        classroom: true as boolean,
      },
      image: {
        src: '' as string,
        description: 'Image alt description text' as string,
      },
      featured: false as boolean,
      price: parseFloat(formData.get('price') as string),
    };
    console.log(courseData);
    addCourse(courseData);
  });
};

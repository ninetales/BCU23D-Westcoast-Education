interface Course {
  courseTitle: string;
  description: {
    short: string;
    long: string;
  };
  courseCode: string;
  scheduledDate: string;
  durationInDays: number;
  location: {
    online: boolean;
    classroom: boolean;
  };
  image: {
    src: string;
    description: string;
  };
  featured: boolean;
  price: number;
}

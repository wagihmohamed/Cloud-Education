export type CourseStatus = 'active' | 'inactive';

export interface CoursesBody {
  id: string;
  courseName: string;
  category: string;
  lastUpdated: string;
  categoryId: string;
  description: string;
  prerequisites: string[];
  courseCode: string;
  status: CourseStatus;
}

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

export type UserStatus = 'active' | 'inactive';
export type UserRole = 'Teacher' | 'Student';

export interface User {
	id: string;
	firstName: string;
	lastName: string;
	email: string;
	phoneNumber: string;
	status: UserStatus;
	role: UserRole;
	lastLogin: string;
}

export interface UserInfo {
	firstName: string;
	lastName: string;
	phoneNumber: string;
	email: string;
	GPA: number;
	role: UserRole;
	currentLevel: string;
	creditHours: string;
}

/** @format */

import { OutputBlockData } from '@editorjs/editorjs';

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
export interface Message {
	id: string;
	message: string;
	date: Date;
}
export interface ContactDetails {
	userId: string;
	contactName: string;
	chat: Message[];
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

export interface StudnetsAttendanceTableBodyData {
	number: string;
	name: string;
	week1: string;
	week2: string;
	week3: string;
	week4: string;
	bounses: string;
}

export interface Exam {
	examId: string;
	examName: string;
	examDescription: string;
	examQuestions: Question[];
	examDurationInMinutes: number;
}

export interface Question {
	questionId: string;
	questionText: string;
	questionType: ExamType;
	questionChoices?: Choice[];
}

export interface Choice {
	choiceId: string;
	choiceText: string;
}

export type ExamType = 'essay' | 'choice';

export type Course = {
	id?: string;
	title: string;
	course: OutputBlockData[];
};

export interface CoursePayload {
	id?: string;
	title?: string;
	course: OutputBlockData[];
}

export interface InitialStateType {
	courses: {
		id?: string;
		title: string;
		course: OutputBlockData[];
	}[];
}

export interface LoginResponse {
	status: string;
	token: string;
}

export interface ExamListItem {
	id: string;
	title: string;
	class: string;
	grade?: string;
	startDate: Date;
	endDate: Date;
	imageUrl: string;
}

export interface ApiError {
	message: string;
	status: string;
}

export interface ExamError {
	questionId: string;
	answer: string;
}

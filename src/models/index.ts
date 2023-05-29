/** @format */

import { OutputBlockData } from '@editorjs/editorjs';
import { AxiosError, AxiosResponse } from 'axios';

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

export type ApiError = AxiosError<BaseApiError>;

interface BaseApiError {
	message: string;
	status: string;
}

export interface ExamError {
	questionId: string;
	answer: string;
}

export type QuestionType = 'essay' | 'mcq';
export interface MCQType {
	answer: string;
	isCorrect: boolean;
}

export interface ExamInitialValues {
	exam: [
		{
			questionTitle: '';
			essayAnswer: '';
			questionType: QuestionType;
			questionAnswers?: MCQType[];
		}
	];
}

export interface ExamErrorType {
	questionTitle: string;
	essayAnswer?: string;
	questionType: string;
	questionAnswers?: {
		answer?: string;
		isCorrect?: boolean;
	}[];
}

export interface OrganizationRegisterPayload {
	organization: Organization;
	organizationAdmin: Admin;
}

export interface Organization {
	name: string;
	type: string;
	emailDomain: string;
	subdomain: string;
	officialPhoneNumber: string;
	country: string;
	address: string;
}

export interface Admin {
	email: string;
	password: string;
	firstName: string;
	lastName: string;
	phoneNumber: string;
}

export interface RegisterOrganizationResponse {
	status: string;
	data: Data;
}

export interface Data {
	name: string;
	type: string;
	emailDomain: string;
	subdomain: string;
	officialPhoneNumber: string;
	country: string;
	address: string;
	createdAt: string;
	updatedAt: string;
}

export interface RegisterUserByOrgIdPayload {
	email: string;
	password: string;
	firstName: string;
	lastName: string;
	phoneNumber: string;
}

export type RegisterUserByOrgIdResponse = AxiosResponse<RegisterUserByOrgId>;

export interface RegisterUserByOrgId {
	status: string;
	token: string;
}

export interface CourseItem {
	name: string;
	description: string;
	code: string;
	category: string;
	isActive: boolean;
	prerequisites?: string[];
	createdAt?: string;
	updatedAt?: string;
}

export interface CourseResponse {
	status: string;
	data: CourseItem[];
}

export interface Comment {
	id: string;
	content: string;
}

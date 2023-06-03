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
	id?: number;
	title: string;
	course: OutputBlockData[];
};

export interface CoursePayload {
	id?: number;
	title?: string;
	course: OutputBlockData[];
}

export interface InitialStateType {
	courses: {
		id?: number;
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
	prerequisites?: CourseCode[];
	createdAt?: string;
	updatedAt?: string;
}

export interface UpdateCoursePayload {
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
	page: number;
	pagesCount: number;
	data: CourseItem[];
}

export interface Comment {
	id: string;
	content: string;
}

export interface CourseSectionsResponse {
	status: string;
	data: CourseSections[];
}

export interface CourseSections {
	title: string;
	order: number;
}

export interface AddCourseSectionPayload {
	title: string;
}

export interface AddCourseSectionResponse {
	status: string;
	data: {
		title: string;
		order: number;
	};
}

export interface CourseContentResponse {
	status: string;
	data: {
		title: string;
		order: number;
		content: OutputBlockData[] | null;
		ownerEmail: string;
	};
}

export interface UpdateCourseSectionPayload {
	title: string;
	content: OutputBlockData[];
}

export interface UpdateCourseSectionResponse {
	status: string;
	data: {
		title: string;
		content: OutputBlockData[];
	};
}

export interface DeleteCommentResponse {
	status: string;
	message: string;
}

export interface AddCommentPayload {
	content: string;
}

export interface AddCommentResponse {
	status: string;
	data: CommentInfo;
}

export interface CommentInfo {
	id: string;
	createdAt: string;
	updatedAt: string;
	content: string;
	user: UserDetails;
}

export interface UserDetails {
	id: string;
	firstName: string;
	lastName: string;
	email: string;
}

export interface CourseCodesListResponse {
	status: string;
	data: CourseCode[];
}

export interface CourseCode {
	code: string;
	name: string;
}

export interface UsersResponse {
	status: string;
	page: number;
	pagesCount: number;
	data: UserItem[];
}

export type UserRoles = 'ADMIN' | 'TEACHER' | 'LEARNER' | 'TEACHER' | 'STUDENT';

export interface UserItem {
	id?: string;
	firstName: string;
	lastName: string;
	email: string;
	phoneNumber: string;
	role: UserRoles;
	courses: CourseCode[];
}

export interface EditUserPayload {
	firstName: string;
	lastName: string;
	phoneNumber: string;
	role: UserRoles;
	courses: string[];
}

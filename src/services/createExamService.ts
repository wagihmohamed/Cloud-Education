/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { createExamByCourseCodeEndpoint } from 'api/apiURL';
import { api } from 'api';

export interface CreateExamPayload {
	name: string;
	description: string;
	duration: number;
	startTime: string;
	endTime: string;
	questions: ExamQuestionType[];
}

export interface ExamQuestionType {
	questionText: string;
	questionType: 'essay' | 'mcq';
	questionAnswer?: string;
	questionChoices?: MCQAnswerType[];
}

export interface MCQAnswerType {
	choiceText: string;
	isCorrect: boolean;
}

export const createExamService = async (
	orgId: string,
	courseCode: string,
	payload: CreateExamPayload
) => {
	const response = await api.post<CreateExamPayload, any>(
		createExamByCourseCodeEndpoint(orgId, courseCode),
		payload
	);
	return response.data;
};

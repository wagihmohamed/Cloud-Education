import { getExamByExamIdEndpoint } from 'api/apiURL';
import { api } from 'api';
import {} from 'models';

export interface ExamItemResponse {
	status: string;
	data: {
		id: string;
		name: string;
		description: string;
		duration: number;
		startTime: string;
		endTime: string;
		questions: ExamItemQuestionType[];
		remainingMinutes: number;
	};
}

export interface ExamItemQuestionType {
	questionText: string;
	questionType: 'essay' | 'mcq';
	questionChoices?: MCQItemAnswerType[];
}

export interface MCQItemAnswerType {
	choiceText: string;
}

export const getExamByIdService = async (orgId: string, examId: string) => {
	const response = await api.get<ExamItemResponse>(
		getExamByExamIdEndpoint(orgId, examId)
	);
	return response.data;
};

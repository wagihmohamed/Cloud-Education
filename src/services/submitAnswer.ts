import { submitExamByExamIdEndpoint } from 'api/apiURL';
import { api } from 'api';
import { AxiosResponse } from 'axios';

export interface Answer {
	questionText: string;
	questionType: string;
	questionAnswer: string;
	isCorrect?: boolean;
}

export const submitAnswer = async ({
	examId,
	answers,
}: {
	examId: string;
	answers: Answer[];
}) => {
	const orgnizationId = localStorage.getItem('organizationId') || '';
	const response = await api.post<Answer[], AxiosResponse<Answer[]>>(
		submitExamByExamIdEndpoint(orgnizationId, examId),
		answers.map((answer) => ({
			questionText: answer.questionText,
			questionType: answer.questionType,
			questionAnswer: answer.questionAnswer,
		}))
	);
	return response.data;
};

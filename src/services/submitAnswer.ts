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
	organizationId,
	examId,
	answers,
}: {
	organizationId: string;
	examId: string;
	answers: Answer[];
}) => {
	const response = await api.post<Answer[], AxiosResponse<Answer[]>>(
		submitExamByExamIdEndpoint(organizationId, examId),
		answers.map((answer) => ({
			questionText: answer.questionText,
			questionType: answer.questionType,
			questionAnswer: answer.questionAnswer,
		}))
	);
	return response.data;
};

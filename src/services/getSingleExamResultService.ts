import { getSingleExamResultEndpoint } from 'api/apiURL';
import { api } from 'api';

interface GetSingleExamResultResponse {
	status: string;
	data: {
		id: string;
		score: number;
		exam: {
			id: string;
			name: string;
			description: string;
		};
		answers: ExamAnswerType[];
	};
}

interface ExamAnswerType {
	questionText: string;
	questionType: string;
	questionAnswer: string;
	isCorrect: boolean;
}

export const getSingleExamResultService = async ({
	orgnizationId,
	examId,
}: {
	orgnizationId: string;
	examId: string;
}) => {
	const endpoint = getSingleExamResultEndpoint(orgnizationId, examId);
	const response = await api.get<GetSingleExamResultResponse>(endpoint);
	return response.data;
};

import { getAnsweredExamsEndpoint } from 'api/apiURL';
import { api } from 'api';

interface ExamResultResponse {
	status: string;
	data: ExamResultItem[];
}

interface ExamResultItem {
	id: string;
	score: number;
	exam: Exam;
}

interface Exam {
	id: string;
	name: string;
	description: string;
}

export const getExamsResults = async (orgId: string) => {
	const response = await api.get<ExamResultResponse>(
		getAnsweredExamsEndpoint(orgId)
	);
	return response.data;
};

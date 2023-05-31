import { api } from 'api';
import { getCommentsByCourseCodeEndpoint } from 'api/apiURL';

export interface CommentResponse {
	status: string;
	data: Comment[];
}

export interface Comment {
	id: string;
	createdAt: string;
	updatedAt: string;
	content: string;
	user: User;
}

export interface User {
	id: string;
	firstName: string;
	lastName: string;
	email: string;
}

export const getCommentsBySectioId = async (
	orgnizationId: string,
	courseCode: string,
	sectionOrder: number
) => {
	const response = await api.get<CommentResponse>(
		getCommentsByCourseCodeEndpoint(orgnizationId, courseCode, sectionOrder)
	);
	return response.data;
};

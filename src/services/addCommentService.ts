/* eslint-disable no-console */
import { api } from 'api';
import { addCommentByCourseCodeEndpoint } from 'api/apiURL';

interface AddCommentPayload {
	content: string;
}

interface AddCommentResponse {
	status: string;
	data: CommentInfo;
}

interface CommentInfo {
	id: string;
	createdAt: string;
	updatedAt: string;
	content: string;
	user: User;
}

interface User {
	id: string;
	firstName: string;
	lastName: string;
	email: string;
}

export const addCommentByCourseCode = async ({
	courseCode,
	sectionOrder,
	content,
}: {
	courseCode: string;
	sectionOrder: number;
	content: string;
}) => {
	const response = await api.post<AddCommentPayload, AddCommentResponse>(
		addCommentByCourseCodeEndpoint(
			localStorage.getItem('organizationId') || '',
			courseCode,
			sectionOrder
		),
		{
			content,
		}
	);
	return response.data;
};

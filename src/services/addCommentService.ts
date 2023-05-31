import { api } from 'api';
import { addCommentByCourseCodeEndpoint } from 'api/apiURL';
import { AddCommentPayload, AddCommentResponse } from 'models';

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

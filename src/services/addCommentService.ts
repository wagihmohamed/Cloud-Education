import { api } from 'api';
import { addCommentByCourseCodeEndpoint } from 'api/apiURL';
import { AddCommentPayload, AddCommentResponse } from 'models';

export const addCommentByCourseCode = async ({
	orgId,
	courseCode,
	sectionOrder,
	content,
}: {
	orgId: string;
	courseCode: string;
	sectionOrder: number;
	content: string;
}) => {
	const response = await api.post<AddCommentPayload, AddCommentResponse>(
		addCommentByCourseCodeEndpoint(orgId, courseCode, sectionOrder),
		{
			content,
		}
	);
	return response.data;
};

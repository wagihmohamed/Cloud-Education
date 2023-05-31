import { api } from 'api';
import { deleteCommentByCourseCodeEndpoint } from 'api/apiURL';
import { DeleteCommentResponse } from 'models';

export const deleteCommentService = async (
	orgnizationId: string,
	courseCode: string,
	sectionOrder: number,
	commentId: string
) => {
	const response = await api.delete<DeleteCommentResponse>(
		deleteCommentByCourseCodeEndpoint(
			orgnizationId,
			courseCode,
			sectionOrder,
			commentId
		)
	);
	return response.data;
};

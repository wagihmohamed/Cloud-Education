import { api } from 'api';
import { editCourseSectionBySectionIdEndpoint } from 'api/apiURL';

interface DeleteResponse {
	status: string;
	message: string;
}

export const deleteCourseSectionService = async ({
	courseCode,
	orgnizationId,
	sectionOrder,
}: {
	orgnizationId: string;
	courseCode: string;
	sectionOrder: number;
}) => {
	const response = await api.delete<DeleteResponse>(
		editCourseSectionBySectionIdEndpoint(
			orgnizationId,
			courseCode,
			sectionOrder
		)
	);
	return response.data;
};

import { api } from 'api';
import { deleteCourseByCodeEndpoint } from 'api/apiURL';

interface DeleteResponse {
	status: string;
	message: string;
}

export const deleteCourseByCode = async ({
	courseCode,
	orgnizationId,
}: {
	orgnizationId: string;
	courseCode: string;
}) => {
	const response = await api.delete<DeleteResponse>(
		deleteCourseByCodeEndpoint(orgnizationId, courseCode)
	);
	return response.data;
};

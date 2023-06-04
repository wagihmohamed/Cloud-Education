import { api } from 'api';
import { deleteUserByIdEndpoint } from 'api/apiURL';

interface DeleteResponse {
	status: string;
}

export const deleteUserByIdService = async ({
	orgnizationId,
	userId,
}: {
	orgnizationId: string;
	userId: string;
}) => {
	const response = await api.delete<DeleteResponse>(
		deleteUserByIdEndpoint({
			orgnizationId,
			userId,
		})
	);
	return response.data;
};

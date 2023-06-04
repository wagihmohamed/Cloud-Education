import { UserByIdResponse } from 'models';
import { getUserByIdEndpoint } from '../api/apiURL';
import { api } from 'api';

export const getUserById = async ({
	orgnizationId,
	userId,
}: {
	orgnizationId: string;
	userId: string;
}) => {
	const response = await api.get<UserByIdResponse>(
		getUserByIdEndpoint({ orgnizationId, userId })
	);
	return response.data;
};

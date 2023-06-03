import { api } from 'api';
import { getUsersByOrgIdEndpoint } from 'api/apiURL';
import { UsersResponse } from 'models';

export const getUsersList = async ({
	orgnizationId,
	page,
}: {
	orgnizationId: string;
	page: number;
}) => {
	const response = await api.get<UsersResponse>(
		getUsersByOrgIdEndpoint({ orgnizationId, page })
	);

	return response.data;
};

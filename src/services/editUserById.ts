import { api } from 'api';
import { editUserByIdEndpoint } from 'api/apiURL';
import { AxiosResponse } from 'axios';
import { UserItem, EditUserPayload } from 'models';

export const editUserById = async ({
	orgnizationId,
	userId,
	user,
}: {
	orgnizationId: string;
	userId: string;
	user: EditUserPayload;
}) => {
	const response = await api.patch<EditUserPayload, AxiosResponse<UserItem>>(
		editUserByIdEndpoint({ orgnizationId, userId }),
		{
			...user,
		}
	);
	return response.data;
};

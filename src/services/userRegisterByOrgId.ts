import { api } from 'api';
import { userRegisterByOrgIdEndpoint } from 'api/apiURL';
import {
	RegisterUserByOrgIdPayload,
	RegisterUserByOrgIdResponse,
} from 'models';

export const registerUserByOrgIdService = async ({
	orgId,
	userDataPayload,
}: {
	orgId: string;
	userDataPayload: RegisterUserByOrgIdPayload;
}) => {
	const response = await api.post<
		RegisterUserByOrgIdPayload,
		RegisterUserByOrgIdResponse
	>(userRegisterByOrgIdEndpoint(orgId), userDataPayload);
	return response;
};

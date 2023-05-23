import { api } from 'api';
import { orgnizationRegisterEndpoint } from 'api/apiURL';
import { AxiosResponse } from 'axios';
import {
	OrganizationRegisterPayload,
	RegisterOrganizationResponse,
} from 'models';

export const registerOrganizationService = async (
	orgdataPayload: OrganizationRegisterPayload
) => {
	const response = await api.post<
		OrganizationRegisterPayload,
		AxiosResponse<RegisterOrganizationResponse>
	>(orgnizationRegisterEndpoint(), { ...orgdataPayload });
	return response;
};

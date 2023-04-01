/* eslint-disable @typescript-eslint/no-unsafe-return */
import { api } from 'api';
import { orgnizationLoginEndpoint } from 'api/apiURL';
import { LoginResponse } from 'models';

export const orginizationLogin = async (
	orgnizationId: string,
	{
		email,
		password,
	}: {
		email: string;
		password: string;
	}
) => {
	const response = await api.post<LoginResponse>(
		orgnizationLoginEndpoint(orgnizationId),
		{
			email,
			password,
		}
	);
	return response.data;
};

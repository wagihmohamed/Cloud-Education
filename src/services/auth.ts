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

export const checkTokenValidity = (token: string) => {
	if (!token) return;
	// throw new Error('Token is not valid');
	return Promise.resolve(true);
};

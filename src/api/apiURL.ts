export const orgnizationLoginEndpoint = (orgnizationId: string) => {
	return `/api/${orgnizationId}/auth/login`;
};

export const orgnizationRegisterEndpoint = () => {
	return '/api/organization/create';
};

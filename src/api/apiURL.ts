export const orgnizationLoginEndpoint = (orgnizationId: string) => {
	return `/api/${orgnizationId}/auth/login`;
};

export const orgnizationRegisterEndpoint = () => {
	return '/api/organization/create';
};

export const userRegisterByOrgIdEndpoint = (orgnizationId: string) => {
	return `/api/${orgnizationId}/auth/signup`;
};

export const getCoursesByOrgIdEndpoint = (orgnizationId: string) => {
	return `/api/${orgnizationId}/courses`;
};

export const addCourseByOrgIdEndpoint = (orgnizationId: string) => {
	return `/api/${orgnizationId}/courses`;
};

export const editCourseByCodeEndpoint = (
	orgnizationId: string,
	courseCode: string
) => {
	return `/api/${orgnizationId}/courses/${courseCode}`;
};

export const deleteCourseByCodeEndpoint = (
	orgnizationId: string,
	courseCode: string
) => {
	return `/api/${orgnizationId}/courses/${courseCode}`;
};

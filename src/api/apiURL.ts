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

export const getCourseSectionsByCourseCodeEndpoint = (
	orgnizationId: string,
	courseCode: string
) => {
	return `/api/${orgnizationId}/courses/${courseCode}/sections`;
};

export const addCourseSectionByCourseCodeEndpoint = (
	orgnizationId: string,
	courseCode: string
) => {
	return `/api/${orgnizationId}/courses/${courseCode}/sections`;
};

export const editCourseSectionBySectionIdEndpoint = (
	orgnizationId: string,
	courseCode: string,
	sectionOrder: number
) => {
	return `/api/${orgnizationId}/courses/${courseCode}/sections/${sectionOrder}`;
};

export const getCourseByCourseCode = (
	orgnizationId: string,
	courseCode: string,
	sectionOrder = 1
) => {
	return `/api/${orgnizationId}/courses/${courseCode}/sections/${sectionOrder}`;
};

export const updateCourseSectionBySectionIdEndpoint = (
	orgnizationId: string,
	courseCode: string,
	sectionOrder: number
) => {
	return `/api/${orgnizationId}/courses/${courseCode}/sections/${sectionOrder}`;
};

export const getCommentsByCourseCodeEndpoint = (
	orgnizationId: string,
	courseCode: string,
	sectionOrder: number
) => {
	return `/api/${orgnizationId}/courses/${courseCode}/sections/${sectionOrder}/comments`;
};

export const addCommentByCourseCodeEndpoint = (
	orgnizationId: string,
	courseCode: string,
	sectionOrder: number
) => {
	return `/api/${orgnizationId}/courses/${courseCode}/sections/${sectionOrder}/comments`;
};

export const deleteCommentByCourseCodeEndpoint = (
	orgnizationId: string,
	courseCode: string,
	sectionOrder: number,
	commentId: string
) => {
	return `/api/${orgnizationId}/courses/${courseCode}/sections/${sectionOrder}/comments/${commentId}`;
};

export const getCoursesCodesByOrgIdEndpoint = ({
	orgnizationId,
	exclude,
}: {
	orgnizationId: string;
	exclude?: string;
}) => {
	return `/api/${orgnizationId}/coursesCodes?exclude=${exclude}`;
};

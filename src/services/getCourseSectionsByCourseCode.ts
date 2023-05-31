import { api } from 'api';
import { getCourseSectionsByCourseCodeEndpoint } from 'api/apiURL';
import { CourseSectionsResponse } from 'models';

export const getCourseSectionsByCourseCode = async (
	orgnizationId: string,
	courseCode: string
) => {
	const response = await api.get<CourseSectionsResponse>(
		getCourseSectionsByCourseCodeEndpoint(orgnizationId, courseCode)
	);
	return response.data;
};

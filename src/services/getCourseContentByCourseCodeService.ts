import { api } from 'api';
import { getCourseByCourseCode } from 'api/apiURL';
import { CourseContentResponse } from 'models';

export const getCourseContentByCourseCodeService = async (
	orgnizationId: string,
	courseCode: string,
	sectionOrder = 1
) => {
	const response = await api.get<CourseContentResponse>(
		getCourseByCourseCode(orgnizationId, courseCode, sectionOrder)
	);
	return response.data;
};

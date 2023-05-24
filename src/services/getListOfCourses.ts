import { api } from 'api';
import { getCoursesByOrgIdEndpoint } from 'api/apiURL';
import { CourseResponse } from 'models';

export const getListOfCourses = async (orgnizationId: string) => {
	const response = await api.get<CourseResponse>(
		getCoursesByOrgIdEndpoint(orgnizationId)
	);
	return response.data;
};

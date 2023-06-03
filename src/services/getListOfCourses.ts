import { api } from 'api';
import { getCoursesByOrgIdEndpoint } from 'api/apiURL';
import { CourseResponse } from 'models';

export const getListOfCourses = async ({
	orgnizationId,
	page,
}: {
	orgnizationId: string;
	page: number;
}) => {
	const response = await api.get<CourseResponse>(
		getCoursesByOrgIdEndpoint({
			orgnizationId,
			page,
		})
	);
	return response.data;
};

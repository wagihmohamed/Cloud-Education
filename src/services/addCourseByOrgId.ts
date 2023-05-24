import { api } from 'api';
import { CourseItem } from 'models';
import { addCourseByOrgIdEndpoint } from 'api/apiURL';
import { AxiosResponse } from 'axios';

export const addCourseByOrgId = async ({
	course,
	orgnizationId,
}: {
	orgnizationId: string;
	course: CourseItem;
}) => {
	const response = await api.post<CourseItem, AxiosResponse<CourseItem>>(
		addCourseByOrgIdEndpoint(orgnizationId),
		course
	);
	return response.data;
};

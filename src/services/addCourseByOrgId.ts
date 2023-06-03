import { api } from 'api';
import { CourseItem, UpdateCoursePayload } from 'models';
import { addCourseByOrgIdEndpoint } from 'api/apiURL';
import { AxiosResponse } from 'axios';

export const addCourseByOrgId = async ({
	course,
	orgnizationId,
}: {
	orgnizationId: string;
	course: UpdateCoursePayload;
}) => {
	const response = await api.post<
		UpdateCoursePayload,
		AxiosResponse<CourseItem>
	>(addCourseByOrgIdEndpoint(orgnizationId), course);
	return response.data;
};

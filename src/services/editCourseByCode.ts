import { api } from 'api';
import { CourseItem, UpdateCoursePayload } from 'models';
import { AxiosResponse } from 'axios';
import { editCourseByCodeEndpoint } from 'api/apiURL';

export const editCourseByCode = async ({
	course,
	orgnizationId,
	courseCode,
}: {
	orgnizationId: string;
	course: UpdateCoursePayload;
	courseCode: string;
}) => {
	const response = await api.patch<
		UpdateCoursePayload,
		AxiosResponse<CourseItem>
	>(editCourseByCodeEndpoint(orgnizationId, courseCode), course);
	return response.data;
};

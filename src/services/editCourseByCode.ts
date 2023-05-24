import { api } from 'api';
import { CourseItem } from 'models';
import { AxiosResponse } from 'axios';
import { editCourseByCodeEndpoint } from 'api/apiURL';

export const editCourseByCode = async ({
	course,
	orgnizationId,
	courseCode,
}: {
	orgnizationId: string;
	course: CourseItem;
	courseCode: string;
}) => {
	const response = await api.patch<CourseItem, AxiosResponse<CourseItem>>(
		editCourseByCodeEndpoint(orgnizationId, courseCode),
		course
	);
	return response.data;
};

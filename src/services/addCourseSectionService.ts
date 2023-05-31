import { api } from 'api';
import { AddCourseSectionPayload, AddCourseSectionResponse } from 'models';
import { addCourseSectionByCourseCodeEndpoint } from 'api/apiURL';
import { AxiosResponse } from 'axios';

export const addCourseSectionService = async ({
	orgnizationId,
	courseCode,
	title,
}: {
	orgnizationId: string;
	courseCode: string;
	title: string;
}) => {
	const response = await api.post<
		AddCourseSectionPayload,
		AxiosResponse<AddCourseSectionResponse>
	>(addCourseSectionByCourseCodeEndpoint(orgnizationId, courseCode), {
		title,
	});
	return response.data;
};

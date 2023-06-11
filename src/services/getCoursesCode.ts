import { api } from 'api';
import { CourseCodesListResponse } from 'models';
import { getCoursesCodesByOrgIdEndpoint } from 'api/apiURL';

export const getCoursesCodesByOrgId = async (
	orgnizationId: string,
	exclude?: string
) => {
	const response = await api.get<CourseCodesListResponse>(
		getCoursesCodesByOrgIdEndpoint({
			orgnizationId,
			exclude,
		})
	);
	return response.data;
};

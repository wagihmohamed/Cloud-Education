import { api } from 'api';
import { CourseCodesListResponse } from 'models';
import { getCoursesCodesByOrgIdEndpoint } from 'api/apiURL';

export const getCoursesCodesByOrgId = async (exclude?: string) => {
	const response = await api.get<CourseCodesListResponse>(
		getCoursesCodesByOrgIdEndpoint({
			orgnizationId: localStorage.getItem('organizationId') || '',
			exclude,
		})
	);
	return response.data;
};

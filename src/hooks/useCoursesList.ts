import { useQuery } from '@tanstack/react-query';
import { getListOfCourses } from 'services/getListOfCourses';

export const useCoursesList = () => {
	const organizationId = localStorage.getItem('organizationId') || '';
	return useQuery({
		queryKey: ['courses'],
		queryFn: () => {
			return getListOfCourses(organizationId);
		},
	});
};

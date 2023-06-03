import { useQuery } from '@tanstack/react-query';
import { getListOfCourses } from 'services/getListOfCourses';

export const useCoursesList = ({ page }: { page: number }) => {
	const organizationId = localStorage.getItem('organizationId') || '';
	return useQuery({
		queryKey: ['courses', organizationId, page],
		queryFn: () => {
			return getListOfCourses({
				orgnizationId: organizationId,
				page,
			});
		},
	});
};

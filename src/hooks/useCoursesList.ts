import { useQuery } from '@tanstack/react-query';
import { getListOfCourses } from 'services/getListOfCourses';
import { useAuth } from 'zustandStore';

export const useCoursesList = ({ page }: { page: number }) => {
	const { subDomain } = useAuth();
	return useQuery({
		queryKey: ['courses', subDomain, page],
		queryFn: () => {
			return getListOfCourses({
				orgnizationId: subDomain,
				page,
			});
		},
	});
};

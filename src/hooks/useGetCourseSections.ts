import { useQuery } from '@tanstack/react-query';
import { getCourseSectionsByCourseCode } from 'services';
import { useAuth } from 'zustandStore';

export const useGetCourseSections = ({
	courseCode,
}: {
	courseCode: string;
}) => {
	const { subDomain } = useAuth();
	return useQuery({
		queryKey: ['courseSections'],
		queryFn: () => {
			return getCourseSectionsByCourseCode(subDomain, courseCode);
		},
	});
};

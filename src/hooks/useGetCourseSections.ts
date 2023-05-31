import { useQuery } from '@tanstack/react-query';
import { getCourseSectionsByCourseCode } from 'services';

export const useGetCourseSections = ({
	courseCode,
}: {
	courseCode: string;
}) => {
	const organizationId = localStorage.getItem('organizationId') || '';
	return useQuery({
		queryKey: ['courseSections'],
		queryFn: () => {
			return getCourseSectionsByCourseCode(organizationId, courseCode);
		},
	});
};

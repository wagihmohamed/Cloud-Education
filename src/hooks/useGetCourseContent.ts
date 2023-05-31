import { useQuery } from '@tanstack/react-query';
import { getCourseContentByCourseCodeService } from 'services';

export const useGetCourseContent = ({
	courseCode,
	sectionOrder,
	isReady,
}: {
	courseCode: string;
	sectionOrder: number;
	isReady?: boolean;
}) => {
	return useQuery({
		queryKey: ['courseContent', courseCode, sectionOrder],
		queryFn: () => {
			return getCourseContentByCourseCodeService(
				localStorage.getItem('organizationId') || '',
				courseCode,
				sectionOrder
			);
		},
		enabled: !!courseCode && !!sectionOrder && isReady,
	});
};

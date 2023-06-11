import { useQuery } from '@tanstack/react-query';
import { getCourseContentByCourseCodeService } from 'services';
import { useAuth } from 'zustandStore';

export const useGetCourseContent = ({
	courseCode,
	sectionOrder,
	isReady,
}: {
	courseCode: string;
	sectionOrder: number;
	isReady?: boolean;
}) => {
	const { subDomain } = useAuth();
	return useQuery({
		queryKey: ['courseContent', courseCode, sectionOrder],
		queryFn: () => {
			return getCourseContentByCourseCodeService(
				subDomain,
				courseCode,
				sectionOrder
			);
		},
		enabled: !!courseCode && !!sectionOrder && isReady,
	});
};

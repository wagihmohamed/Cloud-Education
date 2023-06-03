import { useQuery } from '@tanstack/react-query';
import { getCoursesCodesByOrgId } from 'services';

export const useGetCoursesCode = (exclude?: string) => {
	return useQuery({
		queryKey: ['coursesCodes', exclude],
		queryFn: () => getCoursesCodesByOrgId(exclude),
	});
};

import { useQuery } from '@tanstack/react-query';
import { getCoursesCodesByOrgId } from 'services';
import { useAuth } from 'zustandStore';

export const useGetCoursesCode = (exclude?: string) => {
	const { subDomain } = useAuth();
	return useQuery({
		queryKey: ['coursesCodes', exclude],
		queryFn: () => getCoursesCodesByOrgId(subDomain, exclude),
	});
};

import { useQuery } from '@tanstack/react-query';
import { getExamsListService } from 'services';
import { useAuth } from 'zustandStore';

export const useExamsList = () => {
	const { subDomain } = useAuth();
	return useQuery({
		queryKey: ['exams'],
		queryFn: async () => {
			return getExamsListService(subDomain);
		},
	});
};

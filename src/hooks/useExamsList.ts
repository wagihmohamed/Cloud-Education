import { useQuery } from '@tanstack/react-query';
import { getExamsListService } from 'services';

export const useExamsList = () => {
	const orgName = localStorage.getItem('organizationId') || '';
	return useQuery({
		queryKey: ['exams'],
		queryFn: async () => {
			return getExamsListService(orgName);
		},
	});
};

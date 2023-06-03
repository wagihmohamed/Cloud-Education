import { useQuery } from '@tanstack/react-query';
import { getUsersList } from 'services';

export const useUsersList = (page = 1) => {
	return useQuery({
		queryKey: ['users', localStorage.getItem('organizationId') || '', page],
		queryFn: async () => {
			return getUsersList({
				orgnizationId: localStorage.getItem('organizationId') || '',
				page: 1,
			});
		},
	});
};

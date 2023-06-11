import { useQuery } from '@tanstack/react-query';
import { getUsersList } from 'services';
import { useAuth } from 'zustandStore';

export const useUsersList = (page = 1) => {
	const { subDomain } = useAuth();
	return useQuery({
		queryKey: ['users', subDomain || '', page],
		queryFn: async () => {
			return getUsersList({
				orgnizationId: subDomain,
				page: 1,
			});
		},
	});
};

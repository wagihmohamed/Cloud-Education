import { useQuery } from '@tanstack/react-query';
import { usersData } from 'mockup';
import { sleep } from 'utlis';

export const useUsersList = () => {
	return useQuery({
		queryKey: ['users'],
		queryFn: async () => {
			await sleep(1500);
			return usersData;
		},
	});
};

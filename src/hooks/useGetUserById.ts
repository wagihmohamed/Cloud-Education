import { useQuery } from '@tanstack/react-query';
import { getUserById } from 'services';
import { useAuth } from 'zustandStore';

export const useGetUserById = ({ userId }: { userId: string }) => {
	const { subDomain } = useAuth();

	return useQuery({
		queryKey: ['getUserById', userId],
		queryFn: () =>
			getUserById({
				orgnizationId: subDomain,
				userId,
			}),
	});
};

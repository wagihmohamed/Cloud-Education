/* eslint-disable no-console */
import { useQuery } from '@tanstack/react-query';
import { getUserById } from 'services';

export const useGetUserById = ({ userId }: { userId: string }) => {
	const orgnizationId = localStorage.getItem('organizationId') || '';

	return useQuery({
		queryKey: ['getUserById', userId],
		queryFn: () =>
			getUserById({
				orgnizationId,
				userId,
			}),
	});
};

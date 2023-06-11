import { useQuery } from '@tanstack/react-query';
import { getLeaderboardData } from 'services';

export const useGetLeaderboard = () => {
	const orgnizationId = localStorage.getItem('organizationId') || '';
	return useQuery({
		queryKey: ['leaderboard', orgnizationId],
		queryFn: () => getLeaderboardData(orgnizationId),
	});
};

import { useQuery } from '@tanstack/react-query';
import { getLeaderboardData } from 'services';
import { useAuth } from 'zustandStore';

export const useGetLeaderboard = () => {
	const { subDomain } = useAuth();
	return useQuery({
		queryKey: ['leaderboard', subDomain],
		queryFn: () => getLeaderboardData(subDomain),
	});
};

import { getLeaderboardDataEndpoint } from 'api/apiURL';
import { api } from 'api/';

interface Leaderboard {
	status: string;
	data: {
		points: number;
		user: {
			firstName: string;
			lastName: string;
			email: string;
		};
	}[];
}

export const getLeaderboardData = async (orgnizationId: string) => {
	const response = await api.get<Leaderboard>(
		getLeaderboardDataEndpoint(orgnizationId)
	);
	return response.data;
};

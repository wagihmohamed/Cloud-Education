import { Typography, Box } from '@mui/material';
import { CustomLayout, LeaderboardTable } from 'components';

export const LeaderboardScreen = () => {
	return (
		<CustomLayout>
			<Box
				sx={{
					mt: 4,
					mx: 5,
				}}
			>
				<Typography fontWeight="bold" variant="h4">
					Leaderboard
				</Typography>
				<Typography mt={2} variant="h5">
					Here are the top 10 students with the highest score
				</Typography>
				<LeaderboardTable />
			</Box>
		</CustomLayout>
	);
};

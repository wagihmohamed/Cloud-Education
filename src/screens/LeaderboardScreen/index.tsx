import { Typography, Box } from '@mui/material';
import { CustomLayout } from 'components';

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
					LeaderboardScreen
				</Typography>
			</Box>
		</CustomLayout>
	);
};

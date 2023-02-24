import { Box, Typography } from '@mui/material';
import { CustomLayout } from 'components';

export const ProfileScreen = () => {
	return (
		<CustomLayout>
			<Box
				sx={{
					mt: 4,
					mx: 5,
				}}
			>
				<Typography fontWeight="bold" variant="h4">
					ProfileScreen
				</Typography>
			</Box>
		</CustomLayout>
	);
};

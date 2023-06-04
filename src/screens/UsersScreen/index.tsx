import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import { CustomLayout, UsersTable } from 'components';
import { theme } from 'theme';

export const UsersScreen = () => {
	return (
		<CustomLayout>
			<Box
				sx={{
					mt: 4,
					mx: 5,
					padding: '1rem',
					[theme.breakpoints.down('md')]: {
						mx: 0,
					},
				}}
			>
				<Box
					mt={2}
					display="flex"
					alignItems={'space-betwenn'}
					paddingX={'10px'}
				>
					<Typography fontWeight="bold" variant="h4" flexGrow={'1'}>
						All Users
					</Typography>
				</Box>
				<UsersTable />
			</Box>
		</CustomLayout>
	);
};

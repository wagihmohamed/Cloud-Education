import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import { CustomButton, CustomLayout, UsersTable } from 'components';
import AddIcon from '@mui/icons-material/Add';

export const UsersScreen = () => {
	return (
		<CustomLayout>
			<Box
				sx={{
					mt: 4,
					mx: 5,
				}}
			>
				<Typography fontWeight="bold" variant="h4">
					All Users
				</Typography>
				<Box my={4} display="flex" justifyContent="flex-end">
					<CustomButton px={3} startIcon={<AddIcon />}>
						Add User
					</CustomButton>
				</Box>
				<UsersTable />
			</Box>
		</CustomLayout>
	);
};

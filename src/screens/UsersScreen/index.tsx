import { useState } from 'react';
import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import {
	AddUserModal,
	CustomButton,
	CustomLayout,
	UsersTable,
} from 'components';
import AddIcon from '@mui/icons-material/Add';
import { theme } from 'theme';

export const UsersScreen = () => {
	const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);
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
					<CustomButton
						onClick={() => setIsAddUserModalOpen(true)}
						px={3}
						startIcon={<AddIcon />}
					>
						Add User
					</CustomButton>
				</Box>
				<UsersTable />
			</Box>
			<AddUserModal
				open={isAddUserModalOpen}
				handleClose={() => setIsAddUserModalOpen(false)}
			/>
		</CustomLayout>
	);
};

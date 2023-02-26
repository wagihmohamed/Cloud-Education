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
import { usersData } from 'mockup';

export const UsersScreen = () => {
	const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);
	const [userData, setUserData] = useState(usersData);
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
					<CustomButton
						onClick={() => setIsAddUserModalOpen(true)}
						px={3}
						startIcon={<AddIcon />}
					>
						Add User
					</CustomButton>
				</Box>
				<UsersTable setUsersBodyData={setUserData} usersBodyData={userData} />
			</Box>
			<AddUserModal
				open={isAddUserModalOpen}
				handleClose={() => setIsAddUserModalOpen(false)}
				handleSave={setUserData}
			/>
		</CustomLayout>
	);
};

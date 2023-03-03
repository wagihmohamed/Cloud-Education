/* eslint-disable no-console */
import { useState } from 'react';
import { Avatar, Box, Typography } from '@mui/material';
import { CustomButton, CustomLayout, EditProfileModal } from 'components';
import { Stack, styled } from '@mui/system';
import { ProfileImg } from 'assets';
import { UserInfo } from 'models';

const InfoLabel = styled(Typography)(() => ({
	fontWeight: 'bold',
	fontSize: '1.5rem',
	marginTop: 5,
	marginBottom: 5,
}));

export const ProfileScreen = () => {
	const [isEditProfileShown, setIsEditProfileShown] = useState(false);
	const [userIfo, setUserInfo] = useState<UserInfo>({
		firstName: 'Ali',
		lastName: 'Kehel',
		phoneNumber: '01026266262',
		email: 'ali.kehel.27.2@gmail.com',
		GPA: 3.63,
		role: 'Student',
		currentLevel: 'Level 4 CS',
		creditHours: '119/141',
	});
	return (
		<CustomLayout>
			<Box
				sx={{
					my: 4,
					mx: 5,
					height: '100%',
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					justifyContent: 'center',
				}}
			>
				<Box
					sx={{
						display: 'flex',
						flexDirection: 'column',
						justifyContent: 'center',
						height: '50%',
						border: '3px solid #000',
						px: 6,
						py: 3,
					}}
				>
					<Stack
						flexDirection="row"
						justifyContent="space-between"
						alignItems="flex-start"
						gap="300px"
					>
						<Box>
							<InfoLabel>First Name : {userIfo.firstName}.</InfoLabel>
							<InfoLabel>Last Name : {userIfo.lastName}.</InfoLabel>
							<InfoLabel>Phone Number : {userIfo.phoneNumber}.</InfoLabel>
							<InfoLabel>Email : {userIfo.email}.</InfoLabel>
							<InfoLabel>GPA : {userIfo.GPA}.</InfoLabel>
							<InfoLabel>Role : {userIfo.role}.</InfoLabel>
							<InfoLabel>Current Level : {userIfo.currentLevel}.</InfoLabel>
							<InfoLabel>Credit Hours : {userIfo.creditHours}.</InfoLabel>
						</Box>
						<Avatar
							src={ProfileImg as string}
							sx={{ width: 170, height: 170, border: '3px solid #000' }}
						/>
					</Stack>
					<CustomButton
						onClick={() => {
							setIsEditProfileShown(true);
						}}
						mt="auto"
					>
						Edit Profile
					</CustomButton>
				</Box>
			</Box>
			<EditProfileModal
				open={isEditProfileShown}
				handleClose={() => setIsEditProfileShown(false)}
				handleSave={setUserInfo}
				editedProfile={userIfo}
			/>
		</CustomLayout>
	);
};

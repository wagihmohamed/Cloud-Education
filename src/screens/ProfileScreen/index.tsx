import { useState } from 'react';
import { Avatar, Box, Typography, styled, useMediaQuery } from '@mui/material';
import {
	CustomButton,
	CustomLayout,
	EditProfileModal,
	LoadingErrorPlaceholder,
	SettingsModal,
} from 'components';
import { ProfileImg } from 'assets';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import { theme } from 'theme';
import { useAuth } from 'zustandStore';
import { profileStyles } from './styles';
import { useGetUserById } from 'hooks';
import { UserItem } from 'models';

const InfoLabel = styled(Typography)(() => ({
	fontWeight: 'bold',
	fontSize: '1.5rem',
	marginTop: 5,
	marginBottom: 5,
}));

export const ProfileScreen = () => {
	const { logout, id: loggedUserId } = useAuth();
	const mdScreen = useMediaQuery(theme.breakpoints.down('md'));
	const {
		isLoading,
		isError,
		data: profileData = {
			data: {} as UserItem,
		},
	} = useGetUserById({
		userId: loggedUserId,
	});
	const [isEditProfileShown, setIsEditProfileShown] = useState(false);
	const [isSettingsShown, setIsSettingsShown] = useState(false);

	return (
		<CustomLayout>
			<LoadingErrorPlaceholder isLoading={isLoading} isError={isError}>
				<Box
					sx={{
						display: 'flex',
						flexDirection: 'column',
						mx: '10px',
					}}
				>
					<Box
						sx={{
							...profileStyles.settingButton,
							display: 'flex',
							flexDirection: 'row',
							alignItems: 'center',
							gap: '1rem',
						}}
					>
						<CustomButton
							onClick={() => {
								setIsSettingsShown(true);
							}}
							px={5}
							startIcon={<SettingsIcon />}
						>
							Settings
						</CustomButton>
						<CustomButton
							onClick={() => {
								logout();
							}}
							px={5}
							startIcon={<LogoutIcon />}
						>
							Logout
						</CustomButton>
					</Box>
					<Box sx={profileStyles.infoProfileContainer}>
						<Box
							sx={[
								profileStyles.infoProfil,
								mdScreen
									? profileStyles.infoProfileFull
									: profileStyles.infoProfileMd,
							]}
						>
							<Box sx={mdScreen ? { order: 2 } : { order: 1 }}>
								<InfoLabel>
									First Name : {profileData.data.firstName}.
								</InfoLabel>
								<InfoLabel>Last Name : {profileData.data.lastName}.</InfoLabel>
								<InfoLabel>
									Phone Number : {profileData.data.phoneNumber}.
								</InfoLabel>
								<InfoLabel>Email : {profileData.data.email}.</InfoLabel>
								<InfoLabel>Role : {profileData.data.role}.</InfoLabel>
							</Box>
							<Avatar
								src={ProfileImg as string}
								sx={profileStyles.avatarStyle}
							/>
							<CustomButton
								onClick={() => {
									setIsEditProfileShown(true);
								}}
								m="1rem"
							>
								Edit Profile
							</CustomButton>
						</Box>
					</Box>
					<EditProfileModal
						open={isEditProfileShown}
						handleClose={() => setIsEditProfileShown(false)}
						editedProfile={profileData.data}
					/>
					<SettingsModal
						handleClose={() => {
							setIsSettingsShown(false);
						}}
						open={isSettingsShown}
					/>
				</Box>
			</LoadingErrorPlaceholder>
		</CustomLayout>
	);
};

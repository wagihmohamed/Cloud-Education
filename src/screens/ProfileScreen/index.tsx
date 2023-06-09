import { useState } from 'react';
import { Avatar, Box, Stack, Typography, styled, Button } from '@mui/material';
import {
	CustomButton,
	CustomLayout,
	EditProfileModal,
	LoadingErrorPlaceholder,
	SettingsModal,
} from 'components';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import { useAuth } from 'zustandStore';
import { useGetUserById, useUpdateProfileImage } from 'hooks';
import { UserItem } from 'models';
import { profileStyles } from './utils';

const InfoLabel = styled(Typography)(() => ({
	fontWeight: '700',
	display: 'flex',
	borderRadius: '10px',
	padding: '.5rem',
	flexDirection: 'row',
	alignItems: 'center',
	fontSize: '1.5rem',
	gap: '1rem',
	marginTop: 5,
	marginBottom: 5,
}));

export const ProfileScreen = () => {
	const { logout, id: loggedUserId } = useAuth();
	const {
		isLoading,
		isError,
		data: profileData = {
			data: {} as UserItem,
		},
	} = useGetUserById({
		userId: loggedUserId,
	});

	const { mutate: updateUserImage, isLoading: isUpdateLoading } =
		useUpdateProfileImage(loggedUserId);
	const [isEditProfileShown, setIsEditProfileShown] = useState(false);
	const [isSettingsShown, setIsSettingsShown] = useState(false);

	return (
		<CustomLayout
			sx={{
				opacity: isUpdateLoading ? 0.5 : 1,
			}}
		>
			<LoadingErrorPlaceholder isLoading={isLoading} isError={isError}>
				<Box
					sx={{
						display: 'flex',
						flexDirection: 'column',
					}}
				>
					<Box sx={profileStyles.heading}>
						<Box sx={profileStyles.settingButton}>
							<CustomButton
								onClick={() => {
									setIsSettingsShown(true);
								}}
								px={5}
								bgColor="whitesmoke"
								textcolor="text.main"
								startIcon={<SettingsIcon />}
							>
								Settings
							</CustomButton>
							<CustomButton
								onClick={() => {
									logout();
								}}
								px={5}
								bgColor="whitesmoke"
								textcolor="text.main"
								startIcon={<LogoutIcon />}
							>
								Logout
							</CustomButton>
						</Box>
						<Avatar
							src={profileData.data.profilePicture || ''}
							sx={profileStyles.avatarStyle}
						/>
						<input
							accept="image/*"
							style={{ display: 'none' }}
							id="raised-button-file"
							multiple
							type="file"
							onChange={(e) => {
								updateUserImage({
									image: e.target.files?.[0] as File,
									userId: loggedUserId,
								});
							}}
						/>
						<label htmlFor="raised-button-file">
							<Button
								sx={{
									position: 'absolute',
									bottom: '-24%',
									left: '10%',
								}}
								component="span"
								variant="contained"
							>
								Upload
							</Button>
						</label>
						<input
							accept="image/*"
							style={{ display: 'none' }}
							id="raised-button-file"
							multiple
							type="file"
						/>
					</Box>
					<Box sx={profileStyles.infoProfileContainer}>
						<Stack sx={profileStyles.infoProfileRow}>
							<InfoLabel>
								First Name :
								<Typography sx={profileStyles.infoLabelData}>
									{profileData.data.firstName}
								</Typography>
							</InfoLabel>
							<InfoLabel>
								Last Name:
								<Typography sx={profileStyles.infoLabelData}>
									{profileData.data.lastName}
								</Typography>
							</InfoLabel>
						</Stack>
						<Box>
							<Stack sx={profileStyles.infoProfileRow}>
								<InfoLabel>
									Phone Number :
									<Typography sx={profileStyles.infoLabelData}>
										{profileData.data.phoneNumber}
									</Typography>
								</InfoLabel>
								<InfoLabel>
									Email :{' '}
									<Typography sx={profileStyles.infoLabelData}>
										{profileData.data.email}
									</Typography>
									.
								</InfoLabel>
							</Stack>
							<InfoLabel>
								Role :
								<Typography sx={profileStyles.infoLabelData}>
									{profileData.data.role}
								</Typography>
							</InfoLabel>
						</Box>
						<CustomButton
							onClick={() => {
								setIsEditProfileShown(true);
							}}
							m="1rem"
							width="200px"
						>
							Edit Profile
						</CustomButton>
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

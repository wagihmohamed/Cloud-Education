/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { useState } from 'react';
import { Avatar, Box, Stack, Typography, styled } from '@mui/material';
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
import { useGetUserById } from 'hooks';
import { UserItem } from 'models';

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
const styles = {
	avatarStyle: {
		width: 200,
		height: 200,
		position: 'absolute',
		top: '50%',
		left: '6%',
		border: 'solid 10px white',
	},
	infoProfileContainer: {
		display: 'flex',
		padding: '1rem',
		width: '70%',
		[theme.breakpoints.down('md')]: {
			width: '90%',
		},
		gap: '1rem',
		bgcolor: '#e9ecef',
		margin: '2rem auto',
		borderRadius: '10px',
		flexDirection: 'column',
	},
	settingButton: {
		display: 'flex',
		flexDirection: 'row-reverse',
		gap: '1rem',
		margin: '2rem',
	},
	infoLabelData: {
		fontSize: '1.4rem',
		color: '#382d8b',
		fontWeight: '500',
	},
	infoProfileRow: {
		justifyContent: 'space-between',
		flexDirection: 'row',
		[theme.breakpoints.down('lg')]: { flexDirection: 'column' },
	},
	heading: {
		position: 'relative',
		background: ' linear-gradient(90deg,#219ebc,#03045e)',
		marginBottom: '4rem',
		width: '100%',
		height: '30vh',
	},
};
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
	const [isEditProfileShown, setIsEditProfileShown] = useState(false);
	const [isSettingsShown, setIsSettingsShown] = useState(false);

	return (
		<CustomLayout>
			<LoadingErrorPlaceholder isLoading={isLoading} isError={isError}>
				<Box
					sx={{
						display: 'flex',
						flexDirection: 'column',
					}}
				>
					<Box sx={styles.heading}>
						<Box sx={styles.settingButton}>
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
						<Avatar src={ProfileImg as string} sx={styles.avatarStyle} />
					</Box>
					<Box sx={styles.infoProfileContainer}>
						<Stack sx={styles.infoProfileRow}>
							<InfoLabel>
								First Name :
								<Typography sx={styles.infoLabelData}>
									{profileData.data.firstName}
								</Typography>
							</InfoLabel>
							<InfoLabel>
								Last Name:
								<Typography sx={styles.infoLabelData}>
									{profileData.data.lastName}
								</Typography>
							</InfoLabel>
						</Stack>
						<Box>
							<Stack sx={styles.infoProfileRow}>
								<InfoLabel>
									Phone Number :
									<Typography sx={styles.infoLabelData}>
										{profileData.data.phoneNumber}
									</Typography>
								</InfoLabel>
								<InfoLabel>
									Email :{' '}
									<Typography sx={styles.infoLabelData}>
										{profileData.data.email}
									</Typography>
									.
								</InfoLabel>
							</Stack>
							<InfoLabel>
								Role :
								<Typography sx={styles.infoLabelData}>
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

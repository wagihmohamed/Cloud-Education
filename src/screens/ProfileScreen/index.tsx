import { useState } from 'react';
import { Avatar, Box, Typography, styled, useMediaQuery } from '@mui/material';
import {
	CustomButton,
	CustomLayout,
	EditProfileModal,
	SettingsModal,
} from 'components';
import { ProfileImg } from 'assets';
import { UserInfo } from 'models';
import SettingsIcon from '@mui/icons-material/Settings';
import { theme } from 'theme';
const InfoLabel = styled(Typography)(() => ({
	fontWeight: 'bold',
	fontSize: '1.5rem',
	marginTop: 5,
	marginBottom: 5,
}));
const styles = {
	settingButton: {
		mt: 3,
		mr: 5,
		width: '150',
		marginLeft: 'auto',
		marginTop: '2rem',
		alignSelf: 'flex-end',
	},
	infoProfileContainer: {
		p: '1rem',
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center',
	},
	infoProfil: {
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		border: '3px solid #000',
		borderRadius: '1rem',
		width: '80%',
		alignItems: 'center',
		px: '1rem',
	},
	infoProfileFull: {
		width: '100%',
		py: 1.5,
	},
	infoProfileMd: {
		width: '40%',
		py: 3,
	},
	avatarStyle: { width: 170, height: 170, border: '3px solid #000' },
};
export const ProfileScreen = () => {
	const [isEditProfileShown, setIsEditProfileShown] = useState(false);
	const [isSettingsShown, setIsSettingsShown] = useState(false);
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
	const mdScreen = useMediaQuery(theme.breakpoints.down('md'));
	return (
		<CustomLayout>
			<Box
				sx={{
					display: 'flex',
					flexDirection: 'column',
					mx: '10px',
				}}
			>
				<Box sx={styles.settingButton}>
					<CustomButton
						onClick={() => {
							setIsSettingsShown(true);
						}}
						px={5}
						startIcon={<SettingsIcon />}
					>
						Settings
					</CustomButton>
				</Box>
				<Box sx={styles.infoProfileContainer}>
					<Box
						sx={[
							styles.infoProfil,
							mdScreen ? styles.infoProfileFull : styles.infoProfileMd,
						]}
					>
						<Box sx={mdScreen ? { order: 2 } : { order: 1 }}>
							<InfoLabel>First Name : {userIfo.firstName}.</InfoLabel>
							<InfoLabel>Last Name : {userIfo.lastName}.</InfoLabel>
							<InfoLabel>Phone Number : {userIfo.phoneNumber}.</InfoLabel>
							<InfoLabel>Email : {userIfo.email}.</InfoLabel>
							<InfoLabel>GPA : {userIfo.GPA}.</InfoLabel>
							<InfoLabel>Role : {userIfo.role}.</InfoLabel>
							<InfoLabel>Current Level : {userIfo.currentLevel}.</InfoLabel>
							<InfoLabel>Credit Hours : {userIfo.creditHours}.</InfoLabel>
						</Box>
						<Avatar src={ProfileImg as string} sx={styles.avatarStyle} />
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
					handleSave={setUserInfo}
					editedProfile={userIfo}
				/>
				<SettingsModal
					handleClose={() => {
						setIsSettingsShown(false);
					}}
					open={isSettingsShown}
				/>
			</Box>
		</CustomLayout>
	);
};

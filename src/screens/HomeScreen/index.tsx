import { Avatar, Box, Stack, Typography } from '@mui/material';
import {
	CustomLayout,
	LoadingErrorPlaceholder,
	NotificationList,
} from 'components';
import { useGetUserById } from 'hooks';
import { UserItem } from 'models';
import { useAuth } from 'zustandStore';

export const HomeScreen = () => {
	const { id: loggedUserId } = useAuth();

	const {
		isLoading,
		isError,
		data: profileData = {
			data: {} as UserItem,
		},
	} = useGetUserById({
		userId: loggedUserId,
	});
	return (
		<CustomLayout>
			<LoadingErrorPlaceholder isLoading={isLoading} isError={isError}>
				<Stack
					sx={{
						flexDirection: 'row',
						alignItems: 'center',
						justifyContent: 'space-between',
						bgcolor: '#ebf3ff',
						padding: '4rem',
						borderTop: '10px solid #382d8b',
					}}
				>
					<Typography fontWeight="bold" variant="h4" color="#382d8b">
						Welcome, {profileData.data.firstName}.
					</Typography>
					<Avatar
						src={profileData.data.profilePicture || ''}
						sx={{
							width: '130px',
							height: '130px',
							border: '1px solid #382d8b',
							transition: 'background-color 0.3s ease-in-out',
						}}
					/>
				</Stack>
				<Box
					sx={{
						pt: 4,
						px: 8,
						bgcolor: '#f8f9fa',
					}}
				>
					<NotificationList />
				</Box>
			</LoadingErrorPlaceholder>
		</CustomLayout>
	);
};

import { Avatar, Box, Stack, Typography } from '@mui/material';
import { ProfileImg } from 'assets';
import { CustomLayout, NotificationList } from 'components';
import { messagesList, notificationList } from 'mockup';

export const HomeScreen = () => {
	return (
		<CustomLayout>
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
					Welcome, Wagih.
				</Typography>
				<Avatar
					src={ProfileImg as string}
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
				<NotificationList
					title="Notifications"
					messagesList={notificationList}
				/>
				<NotificationList title="Messages" messagesList={messagesList} />
			</Box>
		</CustomLayout>
	);
};

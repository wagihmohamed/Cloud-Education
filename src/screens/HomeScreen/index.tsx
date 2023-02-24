import { Box, Typography } from '@mui/material';
import { CustomLayout, NotificationList } from 'components';
import { messagesList, notificationList } from 'mockup';

export const HomeScreen = () => {
	return (
		<CustomLayout>
			<Box
				sx={{
					mt: 4,
					mx: 5,
					bgcolor: 'white',
				}}
			>
				<Typography fontWeight="bold" variant="h4">
					Welcome, Wagih.
				</Typography>
				<NotificationList
					title="Notifications"
					messagesList={notificationList}
				/>
				<NotificationList title="Messages" messagesList={messagesList} />
			</Box>
		</CustomLayout>
	);
};

import { Box, Typography } from '@mui/material';
import { LoadingErrorPlaceholder } from 'components/LoadingErrorPlaceholder';
import { useGetNotifications } from 'hooks';
import { handleFormateDate } from 'utlis';
import { useNavigate } from 'react-router-dom';
import { useAuth } from 'zustandStore';
import { EmptyNotifications } from 'assets';

export const NotificationList = () => {
	const { subDomain } = useAuth();
	const navigate = useNavigate();
	const {
		data: notifications = {
			status: '',
			data: [],
		},
		isLoading: isNotificationsLoading,
		isError: isNotificationsError,
	} = useGetNotifications();
	return (
		<>
			<Typography
				sx={{
					my: '20px',
					px: '20px',
				}}
				variant="h4"
				fontWeight="bold"
			>
				Notifications
			</Typography>
			<LoadingErrorPlaceholder
				isLoading={isNotificationsLoading}
				isError={isNotificationsError}
				height="50vh"
				isEmpty={notifications.data.length === 0}
				emptyImg={EmptyNotifications as string}
				imgHeight="200px"
				imgWidth="200px"
				emptyText={
					<>
						<Typography variant="h5" fontWeight="bold">
							No Notifications
						</Typography>
						<Typography variant="h6">
							We will let you know when you have new notifications
						</Typography>
					</>
				}
			>
				<Box mt={9}>
					{notifications.data.map((message) => (
						<Box
							sx={{
								my: '20px',
								py: '20px',
								bgcolor: 'white',
								border: '3px solid #382d8b',
								cursor: 'pointer',
								'&:hover': {
									bgcolor: '#eaf4fe',
									color: 'text.primary',
								},
							}}
							onClick={() =>
								navigate(`/${subDomain}/exams`, {
									state: {
										examId: message.extra,
									},
								})
							}
							key={message.id}
						>
							<Typography
								key={message.id}
								textAlign="center"
								variant="body1"
								fontSize="19px"
							>
								{message.message}{' '}
								<Typography
									component="span"
									fontWeight="bold"
									color="primary.main"
								>
									{handleFormateDate(message.createdAt)}
								</Typography>{' '}
							</Typography>
						</Box>
					))}
				</Box>
			</LoadingErrorPlaceholder>
		</>
	);
};

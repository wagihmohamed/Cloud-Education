import { Box, Typography } from '@mui/material';
import { LoadingErrorPlaceholder } from 'components/LoadingErrorPlaceholder';
import { useGetNotifications } from 'hooks';
import { handleFormateDate } from 'utlis';
import { useNavigate } from 'react-router-dom';
import { useAuth } from 'zustandStore';

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
		<LoadingErrorPlaceholder
			isLoading={isNotificationsLoading}
			isError={isNotificationsError}
			height="60vh"
		>
			<Box mt={9}>
				<Typography variant="h4" fontWeight="bold">
					Notifications
				</Typography>
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
	);
};

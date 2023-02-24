import { Box, Typography } from '@mui/material';

interface NotificationListProps {
	title: string;
	messagesList: { id: number; message: string }[];
}

export const NotificationList = ({
	messagesList,
	title,
}: NotificationListProps) => {
	return (
		<Box mt={9}>
			<Typography variant="h4" fontWeight="bold">
				{title}
			</Typography>
			{messagesList.map((message) => (
				<Box
					sx={{
						my: '20px',
						py: '20px',
						bgcolor: 'white',
						border: '3px solid #000',
					}}
					key={message.id}
				>
					<Typography
						key={message.id}
						textAlign="center"
						variant="body1"
						fontSize="19px"
					>
						{message.message}
					</Typography>
				</Box>
			))}
		</Box>
	);
};

import { Stack } from '@mui/material';
import { Message } from 'models';
interface MessageContainerProps {
	message: Message;
	userId: string;
}
export const MessageContainer = ({
	message,
	userId,
}: MessageContainerProps) => {
	return (
		<Stack
			alignSelf={userId == message.id ? 'flex-end' : 'flex-start'}
			sx={{
				color: 'white',
				width: '40%',
				bgcolor: '#000',
				padding: '1rem 2rem',
				margin: '1rem .5rem',
			}}
		>
			{message.message}
		</Stack>
	);
};

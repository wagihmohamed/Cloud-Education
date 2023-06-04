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
				color: 'text.main',
				bgcolor: '#ebf3ff',
				width: '40%',
				padding: '1rem 2rem',
				margin: '1rem .5rem',
				borderRadius: '5px',
				border: 'solid 2px green',
			}}
		>
			{message.message}
		</Stack>
	);
};

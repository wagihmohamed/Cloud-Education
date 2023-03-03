/*eslint-disable*/
import { Box, Stack, Typography, useTheme } from '@mui/material';
import { CustomInputField } from '../CustomInputField';
import { ContactDetails } from 'models';
import { MessageContainer } from 'components/MessageContainer';
interface ChatScreenProps {
	selectedChat: ContactDetails | null;
	setSelectedChat: any;
	setMessages: any;
	messges: ContactDetails[];
}
export const ChatScreen = ({
	selectedChat,
	setSelectedChat,
	messges,
	setMessages,
}: ChatScreenProps) => {
	const messageHandler = (message: string) => {
		const newChat = selectedChat?.chat?.map((s) => s);
		newChat?.push({
			id: selectedChat ? selectedChat.userId : '',
			message,
			date: new Date(),
		});
		const oldMess = messges.filter((m) => m.userId !== selectedChat?.userId);
		setSelectedChat({ ...selectedChat, chat: newChat });
		setMessages([
			{
				userId: selectedChat?.userId,
				contactName: selectedChat?.contactName,
				chat: newChat,
			},
			...oldMess,
		]);
	};
	console.log(selectedChat);
	const theme = useTheme();
	if (selectedChat) {
		return (
			<Stack flexGrow={1} direction={'column'}>
				<Box
					py={'1rem'}
					px={'2rem'}
					sx={{ bgcolor: `${theme.palette.primary.main}` }}
				>
					<Typography variant="h3" sx={{ color: 'white' }}>
						{selectedChat.contactName}
					</Typography>
				</Box>
				<Stack
					flexGrow={1}
					direction={'column'}
					sx={{ overflowY: 'scroll' }}
					height={'300px'}
				>
					{selectedChat.chat.map((s) => {
						return (
							<MessageContainer
								userId={selectedChat.userId}
								key={`${s.date.getSeconds()}+ ${s.message[7]}`}
								message={s}
							></MessageContainer>
						);
					})}
				</Stack>
				<Box>
					<CustomInputField messageHandler={messageHandler}></CustomInputField>
				</Box>
			</Stack>
		);
	} else {
		return (
			<Stack flexGrow={1} direction={'column'}>
				<Box
					py={'1rem'}
					px={'2rem'}
					sx={{ bgcolor: `${theme.palette.primary.main}` }}
				>
					<Typography variant="h3" sx={{ color: 'white' }} textAlign={'center'}>
						Messages
					</Typography>
				</Box>
				<Box flexGrow={1}></Box>
			</Stack>
		);
	}
};

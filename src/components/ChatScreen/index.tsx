import { Dispatch } from 'react';
import { Box, Stack, Typography } from '@mui/material';
import { CustomInputField } from '../CustomInputField';
import { ContactDetails } from 'models';
import { MessageContainer } from 'components/MessageContainer';
interface ChatScreenProps {
	selectedChat: ContactDetails;
	setSelectedChat: Dispatch<React.SetStateAction<ContactDetails>>;
	setMessages: Dispatch<React.SetStateAction<ContactDetails[]>>;
	messges: ContactDetails[];
}
export const ChatScreen = ({
	selectedChat,
	setSelectedChat,
	messges,
	setMessages,
}: ChatScreenProps) => {
	const messageHandler = (message: string) => {
		const newChat = selectedChat.chat.map((s) => s);
		newChat.push({
			id: selectedChat ? selectedChat.userId : '',
			message,
			date: new Date(),
		});
		const oldMess = messges.filter((m) => m.userId !== selectedChat?.userId);
		setSelectedChat({
			...selectedChat,
			chat: newChat,
		});
		setMessages([
			{
				userId: selectedChat?.userId,
				contactName: selectedChat?.contactName,
				chat: newChat,
			},
			...oldMess,
		]);
	};

	if (selectedChat) {
		return (
			<Stack flexGrow={1} direction={'column'}>
				<Box py={'1rem'} px={'2rem'} sx={{ bgcolor: 'primary.main' }}>
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
					{selectedChat?.chat.map((s) => {
						return (
							<MessageContainer
								userId={selectedChat.userId}
								key={`${s.date.getSeconds()}+ ${s.message[7]}`}
								message={s}
							/>
						);
					})}
				</Stack>
				<Box p={2}>
					<CustomInputField messageHandler={messageHandler} />
				</Box>
			</Stack>
		);
	} else {
		return (
			<Stack flexGrow={1} direction={'column'}>
				<Box py={'1rem'} px={'2rem'} sx={{ bgcolor: 'primary.main' }}>
					<Typography variant="h3" sx={{ color: 'white' }} textAlign={'center'}>
						Messages
					</Typography>
				</Box>
				<Box flexGrow={1} />
			</Stack>
		);
	}
};

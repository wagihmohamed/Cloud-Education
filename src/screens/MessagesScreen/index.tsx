import { ContactsContainer, CustomLayout, ChatScreen } from 'components';
import { Stack } from '@mui/material';
import { messages } from 'mockup';
import { useState } from 'react';
import { ContactDetails } from 'models';

export const MessagesScreen = () => {
	const [selectedChat, setSelectedChat] = useState<ContactDetails>({
		userId: '1',
		contactName: 'John Doe',
		chat: [
			{
				id: '1',
				message: 'Hello',
				date: new Date(),
			},
		],
	} as ContactDetails);
	const [messageData, setMessagesData] = useState(messages);

	return (
		<CustomLayout>
			<Stack direction="row">
				<ContactsContainer
					active={selectedChat?.userId}
					messages={messageData}
					setSelectedChat={setSelectedChat}
				/>
				<ChatScreen
					selectedChat={selectedChat}
					setSelectedChat={setSelectedChat}
					setMessages={setMessagesData}
					messges={messageData}
				/>
			</Stack>
		</CustomLayout>
	);
};

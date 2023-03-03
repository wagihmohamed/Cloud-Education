import { ContactsContainer, CustomLayout, ChatScreen } from 'components';
import { Stack } from '@mui/material';
import { messages } from 'mockup';
import { useState } from 'react';
import { ContactDetails } from 'models';
export const MessagesScreen = () => {
	const [selectedChat, setSelectedChat] = useState<null | ContactDetails>(null);
	const [mess, setMessages] = useState<ContactDetails[]>(messages);

	return (
		<CustomLayout>
			<Stack direction="row">
				<ContactsContainer
					active={selectedChat?.userId}
					messages={mess}
					setSelectedChat={setSelectedChat}
				></ContactsContainer>
				<ChatScreen
					selectedChat={selectedChat}
					setSelectedChat={setSelectedChat}
					setMessages={setMessages}
					messges={mess}
				></ChatScreen>
			</Stack>
		</CustomLayout>
	);
};

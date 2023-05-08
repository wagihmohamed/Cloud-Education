import {
	ContactsContainer,
	CustomLayout,
	ChatScreen,
	CustomDrawer,
} from 'components';
import { Stack, useMediaQuery } from '@mui/material';
import { messages } from 'mockup';
import { useState } from 'react';
import { ContactDetails } from 'models';
import { theme } from 'theme';
export const MessagesScreen = () => {
	const mdScreen = useMediaQuery(theme.breakpoints.down('md'));
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
	const contactsContainer = mdScreen ? (
		<CustomDrawer iconName={'contactContainer'}>
			<ContactsContainer
				active={selectedChat?.userId}
				messages={messageData}
				setSelectedChat={setSelectedChat}
			/>
		</CustomDrawer>
	) : (
		<ContactsContainer
			active={selectedChat?.userId}
			messages={messageData}
			setSelectedChat={setSelectedChat}
		/>
	);
	return (
		<CustomLayout>
			<Stack direction="row" height={'100vh'}>
				{contactsContainer}
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

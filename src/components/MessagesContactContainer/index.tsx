import { Box } from '@mui/material';
import { Contact } from 'components';
import { ContactDetails } from 'models';

interface ContactContainer {
	messages: ContactDetails[];
	setSelectedChat: React.Dispatch<React.SetStateAction<ContactDetails>>;
	active: string | undefined;
}
export const ContactsContainer = ({
	messages,
	setSelectedChat,
	active,
}: ContactContainer) => {
	return (
		<Box
			width={'25rem'}
			sx={{
				bgcolor: 'white',
				height: '100vh',
				border: '2px solid black',
				overflowY: 'scroll',
			}}
		>
			{messages.map((contactDetails) => {
				return (
					<Contact
						key={contactDetails.userId}
						contactDetails={contactDetails}
						setSelectedChat={setSelectedChat}
						active={active}
					/>
				);
			})}
		</Box>
	);
};

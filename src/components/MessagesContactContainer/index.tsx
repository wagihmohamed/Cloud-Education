/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
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
	// const mdScreen = useMediaQuery(theme.breakpoints.down('md'));
	const contacts = messages.map((contactDetails) => {
		return (
			<Contact
				key={contactDetails.userId}
				contactDetails={contactDetails}
				setSelectedChat={setSelectedChat}
				active={active}
			/>
		);
	});
	return (
		<Box
			sx={[
				{
					bgcolor: 'background.default',
					height: '100vh',
					border: '2px solid black',
					overflowY: 'scroll',
				},
			]}
		>
			{contacts}
		</Box>
	);
};

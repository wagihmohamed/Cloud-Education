import { Box, Stack, Typography } from '@mui/material';
import { ContactDetails } from 'models';
interface ContactProps {
	contactDetails: ContactDetails;
	active: string | undefined;
	setSelectedChat: React.Dispatch<React.SetStateAction<ContactDetails>>;
}
export const Contact = ({
	contactDetails,
	active,
	setSelectedChat,
}: ContactProps) => {
	const getFullDate = (dateObj: Date | undefined) => {
		const month = dateObj?.getUTCMonth() ? dateObj?.getUTCMonth() + 1 : '';
		const day = dateObj?.getUTCDate();
		const year = dateObj?.getUTCFullYear();
		const fullDate = `${day}/${month}/${year}`;
		return fullDate;
	};
	return (
		<Stack
			onClick={() => {
				setSelectedChat(contactDetails);
			}}
			direction={'row'}
			alignItems={'start'}
			justifyContent={'space-between'}
			py={'1rem'}
			px={'1rem'}
			sx={{
				cursor: 'pointer',
				border: '2px solid black',
				bgcolor: contactDetails.userId === active ? '#000' : '#fff',
				color: contactDetails.userId === active ? '#fff' : '#000',
				fontSize: '20px',
				'&:hover': {
					bgcolor: '#323232',
					color: 'white',
				},
			}}
		>
			<Box>
				<Typography variant="h5">{contactDetails.contactName}</Typography>
				<Typography variant="body1">
					{contactDetails.chat.at(-1)?.message}
				</Typography>
			</Box>
			<Box>
				<Typography variant="body2">
					{getFullDate(contactDetails.chat.at(-1)?.date)}
				</Typography>
			</Box>
		</Stack>
	);
};

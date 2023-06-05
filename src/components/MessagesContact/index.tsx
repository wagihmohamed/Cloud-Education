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
				width: '100%',
				cursor: 'pointer',
				borderBlock: '1px solid black',
				bgcolor: contactDetails.userId === active ? '#d8f3dc' : '#fff',
				color: contactDetails.userId === active ? '#fff' : '#000',
				fontSize: '20px',
				'&:hover': {
					bgcolor: '#ebf3ff',
					color: 'text.primary',
				},
			}}
		>
			<Box>
				<Typography variant="h5" sx={{ fontWeight: '500', color: '#382d8b' }}>
					{contactDetails.contactName}
				</Typography>
				<Typography variant="body1">
					{contactDetails.chat.at(-1)?.message}
				</Typography>
			</Box>
			<Box>
				<Typography
					variant="body2"
					sx={{ fontWeight: '500', color: '#2d6a4f' }}
				>
					{getFullDate(contactDetails.chat.at(-1)?.date)}
				</Typography>
			</Box>
		</Stack>
	);
};

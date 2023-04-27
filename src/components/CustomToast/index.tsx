import { Box, Typography } from '@mui/material';

interface CustomToastProps {
	title: string;
	message?: string;
}

export const CustomToast = ({ title, message }: CustomToastProps) => (
	<Box
		sx={{
			display: 'flex',
			flexDirection: 'column',
			justifyContent: 'start',
			alignItems: 'start',
			ml: 1,
			gap: 0.5,
		}}
	>
		<Typography>{title}</Typography>
		<Typography> {message} </Typography>
	</Box>
);

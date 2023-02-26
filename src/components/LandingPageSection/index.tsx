import { Typography } from '@mui/material';
import { Stack } from '@mui/system';
import { CustomButton } from 'components';
interface SectionProps {
	image: string;
	heading: string;
	txt: string;
	buttonLabel: string;
	stackDirection: string;
	bgcolor: string;
}

export const LandingPageSection = ({
	image,
	heading,
	txt,
	buttonLabel,
	stackDirection,
	bgcolor,
}: SectionProps) => {
	return (
		<Stack
			sx={{
				padding: '4rem',
				flexDirection: `${stackDirection}`,
				bgcolor: `${bgcolor}`,
			}}
			alignItems="center"
			justifyContent="space-between"
		>
			<Stack direction="column" spacing="1rem" justifyContent="space-evenly">
				<Typography variant="h1" sx={{ fontSize: '3.5rem' }}>
					{heading}
				</Typography>
				<Typography variant="body1" sx={{ fontSize: '1rem' }}>
					{txt}
				</Typography>
				<CustomButton>{buttonLabel}</CustomButton>
			</Stack>
			<img
				src={image}
				alt="Logo"
				style={{ width: '570px', borderRadius: '1rem' }}
			/>
		</Stack>
	);
};

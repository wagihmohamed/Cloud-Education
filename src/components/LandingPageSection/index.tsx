import { Typography, useMediaQuery } from '@mui/material';
import { Stack } from '@mui/system';
import { CustomButton } from 'components';
import { theme } from 'theme';
interface SectionProps {
	image: string;
	heading: string;
	txt: string;
	buttonLabel: string;
	sectionDirection: string;
}
const styles = {
	section: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'space-evenly',
		padding: '4rem 0rem',
	},
	sectionMd: {
		flexDirection: 'column',
		padding: '2rem 0rem',
		gap: '2rem',
	},
	sectionFull: {
		flexDirection: 'row',
	},
	imgMd: {
		width: '85%',
	},
};
export const LandingPageSection = ({
	image,
	heading,
	txt,
	buttonLabel,
	sectionDirection,
}: SectionProps) => {
	const mdScreen = useMediaQuery(theme.breakpoints.down(950));
	return (
		<Stack
			sx={[
				{ flexDirection: sectionDirection },
				styles.section,
				mdScreen ? styles.sectionMd : styles.sectionFull,
			]}
		>
			<Stack
				direction="column"
				spacing="1rem"
				justifyContent="space-evenly"
				sx={{ maxWidth: '400px' }}
			>
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
				style={
					mdScreen ? styles.imgMd : { width: '570px', borderRadius: '1rem' }
				}
			/>
		</Stack>
	);
};

import { Stack } from '@mui/system';
import { Typography, Grid, Box } from '@mui/material';
import { CustomLink } from 'components';
const footerHeading = {
	fontSize: '1.8rem',
	textAlign: 'center',
};
export const Footer = () => {
	return (
		<Box sx={{ backgroundColor: '#02040f' }}>
			<Grid
				bgcolor={'#02040f'}
				color="whitesmoke"
				width={'auto'}
				maxWidth={'xl'}
				container
				margin="auto"
				spacing={2}
				sx={{ padding: '3rem', borderBottom: '1px solid black' }}
			>
				<Grid item xs={2} color="white">
					<Typography textAlign="start" variant="h3">
						Cloud Education
					</Typography>
				</Grid>
				<Grid item xs={2}>
					<Stack spacing={2} alignItems={'center'}>
						<Typography sx={footerHeading}>Products</Typography>
						<CustomLink href="#">Feature</CustomLink>
						<CustomLink href="#">Pricing</CustomLink>
						<CustomLink href="#">Comparison</CustomLink>
						<CustomLink href="#">Updates</CustomLink>
					</Stack>
				</Grid>
				<Grid item xs={2}>
					<Stack spacing={2} alignItems={'center'}>
						<Typography sx={footerHeading}>Solutions</Typography>
						<CustomLink href="#">Overview</CustomLink>
						<CustomLink href="#">Tech</CustomLink>
						<CustomLink href="#">Government</CustomLink>
						<CustomLink href="#">Non-Profit</CustomLink>
						<CustomLink href="#">Financial Services</CustomLink>
					</Stack>
				</Grid>
				<Grid item xs={2}>
					<Stack spacing={2} alignItems={'center'}>
						<Typography sx={footerHeading}>Customers</Typography>
						<CustomLink href="#">Highlights</CustomLink>
						<CustomLink href="#">Case Studies</CustomLink>
					</Stack>
				</Grid>
				<Grid item xs={2}>
					<Stack spacing={2} alignItems={'center'}>
						<Typography sx={footerHeading}>Resources</Typography>
						<CustomLink href="#">Documentation</CustomLink>
						<CustomLink href="#">eBooks</CustomLink>
						<CustomLink href="#">Podcast</CustomLink>
						<CustomLink href="#">Blog</CustomLink>
						<CustomLink href="#">Resources</CustomLink>
					</Stack>
				</Grid>
				<Grid item xs={2}>
					<Stack spacing={2} alignItems={'center'}>
						<Typography sx={footerHeading}>About Us</Typography>
						<CustomLink href="#">Our Company</CustomLink>
						<CustomLink href="#">Careers</CustomLink>
						<CustomLink href="#">Contact Us</CustomLink>
						<CustomLink href="#">News</CustomLink>
					</Stack>
				</Grid>
			</Grid>
		</Box>
	);
};

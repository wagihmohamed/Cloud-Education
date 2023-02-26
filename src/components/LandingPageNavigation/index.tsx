import {
	AppBar,
	Toolbar,
	IconButton,
	Typography,
	Container,
	Stack,
} from '@mui/material';
import SchoolIcon from '@mui/icons-material/School';
import { CustomNavLink } from 'components';
export const LandingPageNavigation = () => {
	return (
		<AppBar
			position="static"
			sx={{
				backgroundColor: 'black',
				paddingY: '.75rem',
				bgcolor: '#000814',
			}}
		>
			<Container maxWidth="xl">
				<Toolbar disableGutters>
					<IconButton size="large" edge="start" aria-label="logo">
						<SchoolIcon
							sx={{
								color: 'white',
								fontSize: '3rem',
							}}
						></SchoolIcon>
					</IconButton>
					<Typography variant="h4" sx={{ letterSpacing: '3px', flexGrow: 0.8 }}>
						Cloud Education
					</Typography>
					<Stack direction="row" spacing={2}>
						<CustomNavLink to="/" sx={{ px: '3rem', py: '.5rem' }}>
							Log in
						</CustomNavLink>
						<CustomNavLink to="/register" sx={{ px: '3rem', py: '.5rem' }}>
							Sign Up
						</CustomNavLink>
					</Stack>
				</Toolbar>
			</Container>
		</AppBar>
	);
};

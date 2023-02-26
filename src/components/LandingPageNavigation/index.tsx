import { AppBar, Toolbar, Typography, Container, Stack } from '@mui/material';
import SchoolIcon from '@mui/icons-material/School';
import { CustomNavLink } from 'components';
import { Link } from 'react-router-dom';
import './styles.css';
export const LandingPageNavigation = () => {
	return (
		<AppBar
			position="sticky"
			sx={{
				backgroundColor: 'black',
				paddingY: '.75rem',
				bgcolor: '#000814',
				mb: 4,
			}}
		>
			<Container maxWidth="xl">
				<Toolbar disableGutters>
					<Link className="landing-nav-link" to="/">
						<SchoolIcon
							sx={{
								color: 'white',
								fontSize: '3rem',
							}}
						></SchoolIcon>
						<Typography
							variant="h4"
							sx={{ letterSpacing: '3px', flexGrow: 0.8 }}
						>
							Cloud Education
						</Typography>
					</Link>
					<Stack direction="row" spacing={2}>
						<CustomNavLink to="/login" sx={{ px: '3rem', py: '.5rem' }}>
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

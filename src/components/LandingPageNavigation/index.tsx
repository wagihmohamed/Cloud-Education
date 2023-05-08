import {
	AppBar,
	Toolbar,
	Typography,
	Container,
	Stack,
	Button,
} from '@mui/material';
import SchoolIcon from '@mui/icons-material/School';
import { Link, Link as RouterLink } from 'react-router-dom';
const styles = {
	linkStyle: {
		textDecoration: 'none',
		color: 'white',
		display: 'flex',
		alignItems: 'center',
		marginRight: 'auto',
		gap: '1rem',
		flex: '1',
	},
};

export const LandingPageNavigation = () => {
	const navItems = [
		{ text: 'Sign Up', path: '/register' },
		{ text: 'Log in', path: '/login' },
	];

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
					<Link style={styles.linkStyle} to="/">
						<SchoolIcon
							sx={{
								color: 'white',
								fontSize: '3rem',
							}}
						></SchoolIcon>
						<Typography
							variant="h6"
							sx={{ letterSpacing: '3px', flexGrow: 0.8, color: 'white' }}
						>
							Cloud Education
						</Typography>
					</Link>
					<Stack direction="row" spacing={2}>
						{navItems.map((item) => {
							return (
								<Button
									sx={{ p: '0', fontSize: '1.2rem' }}
									key={item.text}
									color="inherit"
									component={RouterLink}
									to={item.path}
								>
									{item.text}
								</Button>
							);
						})}
					</Stack>
				</Toolbar>
			</Container>
		</AppBar>
	);
};

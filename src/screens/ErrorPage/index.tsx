import { Box, Container, Typography } from '@mui/material';
import { CustomNavLink } from 'components';

export const ErrorPage = () => {
	return (
		<Box
			sx={{
				display: 'flex',
				alignItems: 'center',
				height: '100%',
				padding: 16,
				backgroundColor: 'gray.900',
				color: 'gray.100',
			}}
		>
			<Container
				sx={{
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					justifyContent: 'center',
					padding: 5,
					maxWidth: 'md',
					textAlign: 'center',
				}}
			>
				<Typography
					component="h2"
					variant="h1"
					sx={{
						marginBottom: 8,
						fontWeight: 'extrabold',
						fontSize: { xs: '9xl', md: '9xl' },
						color: 'gray.600',
					}}
				>
					<span className="sr-only">Error</span>
					404
				</Typography>
				<Typography
					component="p"
					variant="h4"
					sx={{
						fontWeight: 'semibold',
						fontSize: { xs: '2xl', md: '3xl' },
					}}
				>
					Sorry, we couldn't find this page.
				</Typography>
				<Typography
					component="p"
					variant="body1"
					sx={{
						marginTop: 4,
						marginBottom: 8,
						color: 'gray.400',
					}}
				>
					But don't worry, you can find plenty of other things on our homepage.
				</Typography>
				<CustomNavLink
					to="/"
					sx={{
						bgcolor: 'black',
						color: 'white',
						px: 8,
						py: 3,
						fontWeight: 'semibold',
						borderRadius: 4,
						'&:hover': {
							backgroundColor: 'black',
						},
					}}
				>
					Back to homepage
				</CustomNavLink>
			</Container>
		</Box>
	);
};

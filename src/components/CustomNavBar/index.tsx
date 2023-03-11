import { Box } from '@mui/material';
import { CustomNavLink } from 'components';

export const CustomNavBar = () => {
	return (
		<Box
			sx={{
				display: 'flex',
				flexDirection: 'column',
				width: '100px',
				height: '100%',
				borderRight: '2px solid #000',
				bgcolor: 'white',
				position: 'fixed',
				top: 0,
				left: 0,
				overflowY: 'auto',
				'::-webkit-scrollbar': {
					width: '0.4em',
					bgcolor: 'primary.main',
				},
				'::-webkit-scrollbar-track': {
					background: '#f1f1f1',
				},
				'::-webkit-scrollbar-thumb': {
					background: '#888',
					bgcolor: 'primary.main',
				},
			}}
		>
			<CustomNavLink to="/home">Home</CustomNavLink>
			<CustomNavLink to="/courses">Courses</CustomNavLink>
			<CustomNavLink to="/leaderboard">Leaderboard</CustomNavLink>
			<CustomNavLink to="/messages">Messages</CustomNavLink>
			<CustomNavLink to="/users">Users</CustomNavLink>
			<CustomNavLink isLast to="/students-data">
				Download Students Data
			</CustomNavLink>
			<Box mt="auto">
				<CustomNavLink isLast to="/profile">
					Profile
				</CustomNavLink>
			</Box>
		</Box>
	);
};

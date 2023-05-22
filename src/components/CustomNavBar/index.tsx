import { Box } from '@mui/material';
import { CustomNavLink } from 'components';
import { useParams } from 'react-router-dom';

export const CustomNavBar = () => {
	const { organizationId } = useParams();
	return (
		<Box
			sx={[
				{
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
				},
			]}
		>
			<CustomNavLink to={`/${organizationId}/home`}>Home</CustomNavLink>
			<CustomNavLink to={`/${organizationId}/courses`}>Courses</CustomNavLink>
			<CustomNavLink to={`/${organizationId}/leaderboard`}>
				Leaderboard
			</CustomNavLink>
			<CustomNavLink to={`/${organizationId}/messages`}>Messages</CustomNavLink>
			<CustomNavLink to={`/${organizationId}/users`}>Users</CustomNavLink>
			<CustomNavLink to={`/${organizationId}/exams`}>Exams</CustomNavLink>
			<CustomNavLink to={`/${organizationId}/create-exam`}>
				Create Exam
			</CustomNavLink>
			<CustomNavLink isLast to={`/${organizationId}/students-data`}>
				Download Students Data
			</CustomNavLink>
			<Box mt="auto">
				<CustomNavLink isLast to={`/${organizationId}/profile`}>
					Profile
				</CustomNavLink>
			</Box>
		</Box>
	);
};

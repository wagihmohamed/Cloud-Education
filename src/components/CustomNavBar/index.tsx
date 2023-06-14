import { Box } from '@mui/material';
import { CustomNavLink } from 'components';
import { useParams } from 'react-router-dom';
import { useAuth } from 'zustandStore';

export const CustomNavBar = () => {
	const { isAdmin, isStudent, isTeacher } = useAuth();
	const { organizationId } = useParams();
	const isTeacherOrAdmin = isAdmin || isTeacher;
	return (
		<Box
			sx={[
				{
					display: 'flex',
					flexDirection: 'column',
					width: '130px',
					height: '100%',
					borderRight: '2px solid #202033',
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
			{!isStudent && (
				<CustomNavLink to={`/${organizationId}/courses`}>Courses</CustomNavLink>
			)}
			{!isTeacherOrAdmin && (
				<CustomNavLink to={`/${organizationId}/learning-courses`}>
					Learning Courses
				</CustomNavLink>
			)}
			<CustomNavLink to={`/${organizationId}/leaderboard`}>
				Leaderboard
			</CustomNavLink>
			<CustomNavLink to={`/${organizationId}/messages`}>Messages</CustomNavLink>
			{!isStudent && (
				<CustomNavLink to={`/${organizationId}/users`}>Users</CustomNavLink>
			)}
			<CustomNavLink to={`/${organizationId}/exams`}>Exams</CustomNavLink>
			<CustomNavLink to={`/${organizationId}/summarize`}>
				Summarize
			</CustomNavLink>
			{!isStudent && (
				<CustomNavLink to={`/${organizationId}/create-exam`}>
					Create Exam
				</CustomNavLink>
			)}
			<CustomNavLink
				to={`/${organizationId}/answered-exams`}
				isLast={isStudent}
			>
				Exams Results
			</CustomNavLink>
			{!isStudent && (
				<CustomNavLink isLast to={`/${organizationId}/students-data`}>
					Download Students Data
				</CustomNavLink>
			)}
			<Box mt="auto">
				<CustomNavLink isLast to={`/${organizationId}/profile`}>
					Profile
				</CustomNavLink>
			</Box>
		</Box>
	);
};

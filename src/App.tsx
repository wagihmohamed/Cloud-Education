import { NoAuth, RequireAuth } from 'components';
import { useGetOrganizationName, useValidateToken } from 'hooks';
import { Routes, Route, Navigate } from 'react-router-dom';
import {
	HomeScreen,
	LoginScreen,
	OrganizationRegisterScreen,
	RegisterScreen,
	CoursesScreen,
	LeaderboardScreen,
	MessagesScreen,
	ProfileScreen,
	CourseScreen,
	UsersScreen,
	LandingPage,
	StudentsData,
	ExamScreen,
	ErrorPage,
	ExamsScreen,
	CreateExamScreen,
} from 'screens';
import { setAppColor } from 'utlis';
import { CircularProgress, Box } from '@mui/material';
import { useAuth } from 'zustandStore';

function App() {
	const { isLoading } = useValidateToken();
	const { token } = useAuth();
	const { organizationName } = useGetOrganizationName();
	const withPrimatyColor = localStorage.getItem('primaryColor');
	const withTextColor = localStorage.getItem('textColor');
	setAppColor(withPrimatyColor, withTextColor);

	if (isLoading && !!token) {
		return (
			<Box
				sx={{
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
					padding: '4rem ',
				}}
			>
				<CircularProgress />
			</Box>
		);
	}

	return (
		<Routes>
			<Route element={<NoAuth />}>
				<Route path="/:organizationId/login" element={<LoginScreen />} />
				<Route path="/register" element={<RegisterScreen />} />
				<Route
					path="/organization-register"
					element={<OrganizationRegisterScreen />}
				/>
				<Route path="/" element={<LandingPage />} />
				<Route path="*" element={<ErrorPage />} />
			</Route>

			<Route element={<RequireAuth />}>
				<Route
					path="/:organizationId"
					element={<Navigate to={`/${organizationName}/home`} replace />}
				/>
				<Route path="/:organizationId/home" element={<HomeScreen />} />
				<Route path="/:organizationId/courses" element={<CoursesScreen />} />
				<Route
					path="/:organizationId/courses/:courseId"
					element={<CourseScreen />}
				/>
				<Route
					path="/:organizationId/leaderboard"
					element={<LeaderboardScreen />}
				/>
				<Route path="/:organizationId/messages" element={<MessagesScreen />} />
				<Route path="/:organizationId/users" element={<UsersScreen />} />
				<Route path="/:organizationId/profile" element={<ProfileScreen />} />
				<Route
					path="/:organizationId/students-data"
					element={<StudentsData />}
				/>
				<Route path="/:organizationId/exams" element={<ExamsScreen />} />
				<Route path="/:organizationId/exam/:examId" element={<ExamScreen />} />
				<Route
					path="/:organizationId/create-exam"
					element={<CreateExamScreen />}
				/>
				<Route path="*/404" element={<ErrorPage />} />
				<Route path="*" element={<ErrorPage />} />
			</Route>
			<Route path="*" element={<ErrorPage />} />
		</Routes>
	);
}

export default App;

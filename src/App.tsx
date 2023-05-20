import { NoAuth, RequireAuth } from 'components';
import { useValidateToken } from 'hooks';
import { Routes, Route } from 'react-router-dom';
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
} from 'screens';
import { setAppColor } from 'utlis';
import { CircularProgress, Box } from '@mui/material';
import { useAuth } from 'zustandStore';

function App() {
	const { isLoading } = useValidateToken();
	const { token } = useAuth();
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
		<div className="App">
			<Routes>
				<Route element={<NoAuth />}>
					<Route path="/login" element={<LoginScreen />} />
					<Route path="/register" element={<RegisterScreen />} />
					<Route
						path="/organization-register"
						element={<OrganizationRegisterScreen />}
					/>
					<Route path="/" element={<LandingPage />} />
					<Route path="*" element={<ErrorPage />} />
				</Route>
				<Route element={<RequireAuth />}>
					<Route path="/home" element={<HomeScreen />} />
					<Route path="/courses" element={<CoursesScreen />} />
					<Route path="/courses/:courseId" element={<CourseScreen />} />
					<Route path="/leaderboard" element={<LeaderboardScreen />} />
					<Route path="/messages" element={<MessagesScreen />} />
					<Route path="/users" element={<UsersScreen />} />
					<Route path="/profile" element={<ProfileScreen />} />
					<Route path="/students-data" element={<StudentsData />} />
					<Route path="/exams" element={<ExamsScreen />} />
					<Route path="/exam/:examId" element={<ExamScreen />} />
					<Route path="*" element={<ErrorPage />} />
				</Route>
			</Routes>
		</div>
	);
}

export default App;

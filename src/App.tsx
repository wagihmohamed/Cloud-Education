import { BrowserRouter, Routes, Route } from 'react-router-dom';
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
} from './screens';

function App() {
	return (
		<div className="App">
			<BrowserRouter>
				<Routes>
					<Route path="/login" element={<LoginScreen />} />
					<Route path="/register" element={<RegisterScreen />} />
					<Route
						path="/organization-register"
						element={<OrganizationRegisterScreen />}
					/>
					<Route path="/home" element={<HomeScreen />} />
					<Route path="/courses" element={<CoursesScreen />} />
					<Route path="/courses/:courseId" element={<CourseScreen />} />
					<Route path="/leaderboard" element={<LeaderboardScreen />} />
					<Route path="/messages" element={<MessagesScreen />} />
					<Route path="/users" element={<UsersScreen />} />
					<Route path="/profile" element={<ProfileScreen />} />
					<Route path="/students-data" element={<StudentsData />} />
					<Route path="/exam/:examId" element={<ExamScreen />} />
					<Route path="/" element={<LandingPage />} />
				</Routes>
			</BrowserRouter>
		</div>
	);
}

export default App;

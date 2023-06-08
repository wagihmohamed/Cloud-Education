import { CustomButton, CustomLayout } from 'components';
import { Box, Stack } from '@mui/system';
import {
	Card,
	CardMedia,
	CardContent,
	Typography,
	CardActions,
} from '@mui/material';
import { learningCourses } from 'mockup/learningCourses';
import { theme } from 'theme';
export const LearningCoursesScreen = () => {
	const staticBackgourndImg =
		'https://images.unsplash.com/photo-1532619187608-e5375cab36aa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80';
	return (
		<CustomLayout>
			<Box
				sx={{
					mt: '32px',
					p: '1rem',
					bgcolor: 'background.default',
					[theme.breakpoints.down('md')]: {
						mx: '0px',
					},
				}}
			>
				<Typography fontWeight="bold" variant="h4" flexGrow={'1'}>
					Learning Courses
				</Typography>
				<Stack gap={2} mt={4}>
					{learningCourses.map((course) => (
						<Card
							key={course.id}
							sx={{
								padding: '1rem',
								display: 'flex',
								direction: 'row',
								alignItems: 'center',
							}}
						>
							<CardMedia
								sx={{
									width: '10rem',
									height: '10rem',
									borderRadius: ' 50%',
									[theme.breakpoints.down('md')]: {
										display: 'none',
									},
								}}
								image={staticBackgourndImg}
							/>
							<CardContent
								sx={{
									flexGrow: '1',
									margin: '1rem',
									display: 'flex',
									flexDirection: 'row',
									gap: '1rem',
									[theme.breakpoints.down('md')]: {
										flexDirection: 'column',
									},
								}}
							>
								<Box sx={{ flexGrow: '1' }}>
									<Typography
										gutterBottom
										variant="h4"
										sx={{
											fontWeight: 'bold',
											direction: 'column',
										}}
									>
										{course.courseName}
										<Typography
											variant="body2"
											sx={{
												fontWeight: 'bold',
												mt: '1rem',
												color: course.status ? '#25a244' : 'red',
											}}
										>
											Active
										</Typography>
									</Typography>
									<Typography variant="body2" color="text.secondary">
										{course.description}
									</Typography>
								</Box>
								<Typography
									sx={{
										color: '#25a244',
										fontWeight: 'bold',
										alignSelf: 'center',
										[theme.breakpoints.down('md')]: {
											alignSelf: 'start',
										},
									}}
								>
									{course.category}
								</Typography>
								<CardActions>
									<CustomButton size="medium">Continue Learning</CustomButton>
								</CardActions>
							</CardContent>
						</Card>
					))}
				</Stack>
			</Box>
		</CustomLayout>
	);
};

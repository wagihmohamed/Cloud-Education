/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from 'react';
import {
	CustomButton,
	CustomLayout,
	LoadingErrorPlaceholder,
} from 'components';
import { Box, Stack } from '@mui/system';
import {
	Card,
	CardMedia,
	CardContent,
	Typography,
	CardActions,
	Pagination,
	Rating,
} from '@mui/material';
import { theme } from 'theme';
import { useCoursesList } from 'hooks';
import { EmptyCourses } from 'assets';
import { useNavigate, Link } from 'react-router-dom';
import { handleFormateDate } from 'utlis';

const staticBackgourndImg =
	'https://images.unsplash.com/photo-1532619187608-e5375cab36aa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80';

export const LearningCoursesScreen = () => {
	const navigate = useNavigate();
	const [currentPage, setCurrentPage] = useState(1);
	const organizationId = localStorage.getItem('organizationId') || '';
	const {
		data: courses = {
			data: [],
			status: '',
			page: 1,
			pagesCount: 1,
		},
		isLoading,
		isError,
	} = useCoursesList({
		page: currentPage,
	});

	return (
		<CustomLayout>
			<LoadingErrorPlaceholder
				isLoading={isLoading}
				isError={isError}
				isEmpty={courses.data.length === 0}
				emptyImg={EmptyCourses as string}
				emptyText={
					<Typography variant="h4" fontWeight="bold">
						No Courses Found
					</Typography>
				}
			>
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
						{courses.data.map((course) => (
							<Card
								key={course.code}
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
											{course.name}
											<Rating
												sx={{
													ml: 2,
												}}
												value={course.rating / 2}
												readOnly
											/>
											<Typography
												variant="body2"
												sx={{
													fontWeight: 'bold',
													mt: '1rem',
													color: course.isActive ? '#25a244' : 'red',
												}}
											>
												{course.isActive ? 'Active' : 'Not Active'}
											</Typography>
										</Typography>
										<Typography variant="body2" color="text.secondary">
											{course.description}
										</Typography>
										<Typography variant="body1" mt={2} color="text.secondary">
											Created At: {handleFormateDate(course.createdAt)}
											<Typography
												variant="body1"
												component="span"
												ml={2}
												color="text.secondary"
											>
												Last Updated At: {handleFormateDate(course.updatedAt)}
											</Typography>
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
										<CustomButton
											disabled={!course.isActive}
											onClick={() => {
												navigate(`/${organizationId}/courses/${course.code}`);
											}}
											size="medium"
										>
											Continue Learning
										</CustomButton>
									</CardActions>
								</CardContent>
							</Card>
						))}
					</Stack>
				</Box>
				{courses.data?.length > 0 && (
					<Pagination
						page={currentPage}
						count={courses.pagesCount}
						onChange={(_, value) => {
							setCurrentPage(value);
						}}
						sx={{
							mt: 4,
							display: 'flex',
							justifyContent: 'center',
							pb: '2rem',
						}}
					/>
				)}
			</LoadingErrorPlaceholder>
		</CustomLayout>
	);
};

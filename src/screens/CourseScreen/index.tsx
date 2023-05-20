/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { useState, useMemo } from 'react';
import { Box, Grid, Typography } from '@mui/material';
import {
	CustomButton,
	CustomEditor,
	CustomLayout,
	CustomTextField,
} from 'components';
import { useParams } from 'react-router-dom';
import { useCourses } from 'zustandStore';

export const CourseScreen = () => {
	const { courseId } = useParams();
	const { addCourse, courses } = useCourses();
	const [courseTitle, setCourseTitle] = useState('');
	const [selectedCourseId, setSelectedCourseId] = useState(courses[0].id);

	const editorJs = useMemo(() => {
		return <CustomEditor id={selectedCourseId} />;
	}, [selectedCourseId]);

	const getSelectedCourse = () => {
		return courses.find((course) => course.id === selectedCourseId);
	};

	return (
		<CustomLayout>
			<Box
				sx={{
					mt: 4,
					ml: 3,
					mr: 2,
				}}
			>
				<Grid columnSpacing="10px" container spacing={4}>
					<Grid
						mt={3}
						sx={{
							border: '3px solid #000',
							height: 'max-content',
							borderRadius: '10px',
							p: 2,
							pb: 8,
						}}
						item
						xs={12}
						md={2}
					>
						<Box>
							<Typography
								textAlign="center"
								mt={2}
								sx={{
									textDecoration: 'underline',
								}}
								fontWeight="bold"
								fontSize={25}
								variant="h5"
							>
								Course Subjects
							</Typography>
							<CustomTextField
								placeholder="Subject Name"
								value={courseTitle}
								onChange={(e) => setCourseTitle(e.target.value)}
								mt={2}
							/>
							<CustomButton
								mt={2}
								fullWidth
								onClick={() => {
									if (courseTitle) {
										addCourse({
											id: (courses.length + 1).toString(),
											course: [
												{
													id: new Date().getTime().toString(),
													type: 'paragraph',
													data: {
														blocks: [
															{
																type: 'header',
																data: {
																	text: 'Header',
																	level: 2,
																},
															},
														],
														version: '2.22.2',
													},
												},
											],
											title: courseTitle,
										});

										setCourseTitle('');
									}
								}}
							>
								Adde Subject
							</CustomButton>
							{courses.map((course) => (
								<Typography
									onClick={() => setSelectedCourseId(course.id)}
									fontWeight={
										course.id === selectedCourseId ? 'bold' : 'normal'
									}
									mt={2}
									my={2}
									sx={{
										width: '100%',
										cursor: 'pointer',
										fontSize: '1.2rem',
									}}
									key={course.id}
								>
									&#x2022; {course.title}
								</Typography>
							))}
						</Box>
					</Grid>
					<Grid mt={2} item xs={12} md={8}>
						{editorJs}
					</Grid>
					<Grid
						mt={3}
						sx={{
							border: '3px solid #000',
							borderRadius: '10px',
							height: 'max-content',
							p: 2,
							pb: 8,
						}}
						item
						xs={12}
						md={2}
					>
						<Box>
							<Typography
								textAlign="center"
								mt={2}
								sx={{
									textDecoration: 'underline',
								}}
								fontWeight="bold"
								fontSize={25}
								variant="h5"
							>
								Course Contnet
							</Typography>
							{getSelectedCourse()?.course.map(
								(course) =>
									course.type === 'header' && (
										<Typography
											my={2}
											fontWeight="bold"
											fontSize={20}
											key={course.id}
											pl={1}
										>
											&#x2022;
											{course.data.text}.
										</Typography>
									)
							)}
						</Box>
					</Grid>
				</Grid>
			</Box>
		</CustomLayout>
	);
};

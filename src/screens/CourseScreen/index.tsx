/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useMemo } from 'react';
import { Box, Grid, Typography } from '@mui/material';
import {
	CustomButton,
	CustomEditor,
	CustomLayout,
	CustomTextField,
} from 'components';
import { useParams } from 'react-router-dom';
import { addCourse } from 'redux/Slices/courseSlice';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'redux/store';

export const CourseScreen = () => {
	const { courseId } = useParams();
	const dispatch = useDispatch();
	const { courses } = useSelector((state: RootState) => state.courseReducer);
	const [courseTitle, setCourseTitle] = useState('');
	const [selectedCourse, setSelectedCourse] = useState(courses[0].id);

	const editorJs = useMemo(() => {
		return <CustomEditor id={selectedCourse} />;
	}, [selectedCourse]);

	return (
		<CustomLayout>
			<Box
				sx={{
					mt: 4,
					ml: 2,
					mr: 2,
				}}
			>
				<Grid columnSpacing="10px" container>
					<Grid
						spacing={4}
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
							<Typography variant="h5">Course Subjects</Typography>
							<CustomTextField
								value={courseTitle}
								onChange={(e) => setCourseTitle(e.target.value)}
							/>
							<CustomButton
								mt={2}
								fullWidth
								onClick={() => {
									if (courseTitle) {
										dispatch(
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
											})
										);
										setCourseTitle('');
									}
								}}
							>
								Adde Subject
							</CustomButton>
							{courses.map((course) => (
								<Typography
									onClick={() => setSelectedCourse(course.id)}
									fontWeight={course.id === selectedCourse ? 'bold' : 'normal'}
									mt={2}
									sx={{
										width: '100%',
										cursor: 'pointer',
										fontSize: '1.2rem',
									}}
									key={course.id}
								>
									{course.title}
								</Typography>
							))}
						</Box>
					</Grid>
					<Grid spacing={4} item xs={12} md={8}>
						{/* <CustomEditor id={selectedCourse} /> */}
						{editorJs}
					</Grid>
					<Grid
						spacing={4}
						sx={{
							mt: 4,
							border: '1px solid #000',
						}}
						item
						xs={12}
						md={2}
					>
						<Box>
							<Typography variant="h5">Course Contnet</Typography>
						</Box>
					</Grid>
				</Grid>
			</Box>
		</CustomLayout>
	);
};

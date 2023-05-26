/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useMemo } from 'react';

import AddIcon from '@mui/icons-material/Add';
import { Box, Button, Grid, Input, Stack, TextField } from '@mui/material';
import { CourseTab, CustomEditor, CustomLayout } from 'components';
import { useParams } from 'react-router-dom';
import { useCourses } from 'zustandStore';

export const CourseScreen = () => {
	const [triggerAddButton, setTriggerButton] = useState(false);
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
	const addSubjects = () => {
		setTriggerButton((prev) => !prev);
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
	};
	return (
		<CustomLayout>
			<Box sx={{ padding: '1' }}>
				<Stack direction={'row'}>
					<Stack
						flexGrow={'1'}
						direction={'row'}
						sx={{
							bgcolor: '#ced4da',
							maxWidth: '100%',
							overflowX: 'scroll',
							'&::-webkit-scrollbar': {
								height: '2px',
							},
						}}
					>
						{courses.map((course) => (
							<CourseTab
								key={course.id}
								title={course.title}
								id={course.id}
								selectedCourseId={selectedCourseId}
								setSelectedCourseId={setSelectedCourseId}
							/>
						))}
					</Stack>
					<Button
						sx={{ bgcolor: '#dee2e6', borderRadius: '0px' }}
						onClick={addSubjects}
					>
						<AddIcon></AddIcon>
					</Button>
					{triggerAddButton && (
						<TextField
							variant="filled"
							size="medium"
							sx={{ padding: '0px', fontSize: '2rem' }}
							value={courseTitle}
							onChange={(e) => setCourseTitle(e.target.value)}
							onKeyDown={(e) => {
								if (e.key === 'Enter') {
									addSubjects();
								}
							}}
						></TextField>
					)}
				</Stack>
				<Grid columnSpacing="10px" container spacing={4}>
					<Grid mt={2} item xs={12} md={12}>
						{editorJs}
					</Grid>
					{/* <Grid
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
					</Grid> */}
				</Grid>
			</Box>
		</CustomLayout>
	);
};

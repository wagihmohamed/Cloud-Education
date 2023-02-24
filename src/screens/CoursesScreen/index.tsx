import { useState } from 'react';
import { Box, Typography } from '@mui/material';
import {
	AddCourseModal,
	CoursesTable,
	CustomButton,
	CustomLayout,
} from 'components';
import AddIcon from '@mui/icons-material/Add';
import { coursesBodyData } from 'mockup';
import { CoursesBody } from 'models';

export const CoursesScreen = () => {
	const [isAddCourseOpen, setIsAddCourseOpen] = useState(false);
	const [coursesData, setCoursesData] =
		useState<CoursesBody[]>(coursesBodyData);
	const [selectedCourse, setSelectedCourse] = useState<CoursesBody>(
		{} as CoursesBody
	);
	return (
		<>
			<CustomLayout>
				<Box
					sx={{
						mt: 4,
						mx: 5,
					}}
				>
					<Typography fontWeight="bold" variant="h4">
						All Courses
					</Typography>
					<Box my={4} display="flex" justifyContent="flex-end">
						<CustomButton
							px={3}
							onClick={() => {
								setIsAddCourseOpen(true);
							}}
							startIcon={<AddIcon />}
						>
							Add Course
						</CustomButton>
					</Box>
					<CoursesTable
						coursesData={coursesData}
						setCoursesData={setCoursesData}
						selectedCourse={selectedCourse}
						setSelectedCourse={setSelectedCourse}
					/>
				</Box>
			</CustomLayout>
			<AddCourseModal
				open={isAddCourseOpen}
				handleClose={() => setIsAddCourseOpen(false)}
				setCourses={setCoursesData}
			/>
		</>
	);
};

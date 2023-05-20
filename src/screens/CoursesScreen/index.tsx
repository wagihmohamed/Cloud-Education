import { useState } from 'react';
import { Box, Typography } from '@mui/material';
import {
	AddCourseModal,
	CoursesTable,
	CustomButton,
	CustomLayout,
} from 'components';
import AddIcon from '@mui/icons-material/Add';
import { CoursesBody } from 'models';
import { theme } from 'theme';

export const CoursesScreen = () => {
	const [isAddCourseOpen, setIsAddCourseOpen] = useState(false);
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
						padding: '1rem',
						[theme.breakpoints.down('md')]: {
							mx: 0,
						},
					}}
				>
					<Box
						mt={2}
						display="flex"
						alignItems={'space-betwenn'}
						paddingX={'10px'}
					>
						<Typography fontWeight="bold" variant="h4" flexGrow={'1'}>
							All Courses
						</Typography>
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
						selectedCourse={selectedCourse}
						setSelectedCourse={setSelectedCourse}
					/>
				</Box>
			</CustomLayout>
			<AddCourseModal
				open={isAddCourseOpen}
				handleClose={() => setIsAddCourseOpen(false)}
			/>
		</>
	);
};

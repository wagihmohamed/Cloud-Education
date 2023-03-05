/* eslint-disable @typescript-eslint/no-unused-vars */
import { Box } from '@mui/material';
import { CustomEditor, CustomLayout } from 'components';
import { useParams } from 'react-router-dom';

export const CourseScreen = () => {
	const { courseId } = useParams();
	return (
		<CustomLayout>
			<Box
				sx={{
					mt: 4,
					mx: 5,
				}}
			>
				<Box>
					<CustomEditor />
				</Box>
			</Box>
		</CustomLayout>
	);
};

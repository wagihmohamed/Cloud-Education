import { Box } from '@mui/material';
import { CustomLayout } from 'components';
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
				Hello {courseId}
			</Box>
		</CustomLayout>
	);
};

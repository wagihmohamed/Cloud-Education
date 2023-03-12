import { useParams } from 'react-router-dom';
import { Typography, Box } from '@mui/material';
import { CustomLayout, ExamList } from 'components';
import { examDummyData } from 'mockup';

export const ExamScreen = () => {
	const { examId } = useParams();
	return (
		<CustomLayout>
			<Box
				sx={{
					mt: 4,
					mx: 5,
				}}
			>
				<Typography fontWeight="bold" variant="h4">
					Exam Screen {examId}
				</Typography>
				<ExamList examData={examDummyData} />
			</Box>
		</CustomLayout>
	);
};

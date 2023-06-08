import { useParams } from 'react-router-dom';
import { Typography, Box, Chip, CircularProgress } from '@mui/material';
import { CustomLayout, ExamList, LoadingErrorPlaceholder } from 'components';
import Countdown from 'react-countdown';
import { pink } from '@mui/material/colors';
import { useGetExamItem } from 'hooks';
import { theme } from 'theme';

export const ExamScreen = () => {
	const { examId } = useParams();
	const {
		isError,
		data: examData = {
			data: {
				description: '',
				duration: 0,
				endTime: '',
				id: '',
				name: '',
				questions: [],
				startTime: '',
			},
		},
		isLoading,
	} = useGetExamItem(examId || '');
	const renderer = ({
		hours,
		minutes,
		seconds,
		completed,
	}: {
		hours: number;
		minutes: number;
		seconds: number;
		completed: boolean;
	}) => {
		if (!completed && !isLoading) {
			return (
				<>
					<Chip
						label={`${hours}:${minutes}:${seconds}`}
						sx={{
							position: 'absolute',
							top: 50,
							right: 50,
							px: 2,
							fontSize: '1.1rem',
							bgcolor: pink[600],
							color: 'white',
						}}
					/>
					<ExamList />
				</>
			);
		} else {
			return (
				<Box height="60vh">
					<Typography textAlign="center" color={pink[600]} variant="h2">
						Exam Ended.
					</Typography>
				</Box>
			);
		}
	};

	return (
		<LoadingErrorPlaceholder isLoading={isLoading} isError={isError}>
			<CustomLayout>
				<Box
					sx={{
						bgcolor: 'background.default',
						mx: '4rem',
						my: '3rem',
						[theme.breakpoints.down('md')]: {
							m: '0rem',
						},
					}}
				>
					{isLoading && (
						<Box
							width="100%"
							height="100vh"
							display="flex"
							justifyContent="center"
							alignItems="center"
						>
							<CircularProgress />
						</Box>
					)}
					<Typography
						fontWeight="bold"
						variant="h4"
						sx={{ width: '90%', margin: ' 1rem auto' }}
					>
						{examData.data.name} Exam Screen
					</Typography>
					<Countdown
						date={Date.now() + examData.data.duration * 60 * 1000}
						autoStart={true}
						renderer={renderer}
					>
						<>
							<Chip
								label={`
								${examData.data.duration / 60}:
								${examData.data.duration % 60}:
								
								`}
								sx={{
									position: 'absolute',
									top: 50,
									right: 50,
									px: 2,
									fontSize: '1.1rem',
									bgcolor: pink[600],
									color: 'white',
								}}
							/>
							<ExamList />
						</>
					</Countdown>
				</Box>
			</CustomLayout>
		</LoadingErrorPlaceholder>
	);
};

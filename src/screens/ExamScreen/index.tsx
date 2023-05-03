/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { Typography, Box, Chip, CircularProgress } from '@mui/material';
import { CustomLayout, ExamList } from 'components';
import Countdown from 'react-countdown';
import { pink } from '@mui/material/colors';
import { useGetExam } from 'hooks';

export const ExamScreen = () => {
	const { examId } = useParams();
	const {
		data: examData = {
			examDurationInMinutes: 10,
		},
		isLoading,
	} = useGetExam(examId || '');

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
						Exam is finished
					</Typography>
				</Box>
			);
		}
	};
	const renderTimer = useMemo(() => {
		return (
			<Countdown
				date={Date.now() + examData.examDurationInMinutes * 60 * 1000}
				intervalDelay={1000}
				renderer={renderer}
				autoStart={true}
			/>
		);
	}, [examData.examDurationInMinutes]);

	return (
		<CustomLayout>
			<Box
				sx={{
					mt: 4,
					mx: 5,
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
				<Typography fontWeight="bold" variant="h4">
					{examId} Exam Screen
				</Typography>
				{renderTimer}
			</Box>
		</CustomLayout>
	);
};

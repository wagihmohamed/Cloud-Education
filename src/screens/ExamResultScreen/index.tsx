import { Box, Stack, Typography } from '@mui/material';
import {
	CustomLayout,
	CustomTextField,
	LoadingErrorPlaceholder,
} from 'components';
import { useGetExamAnswer } from 'hooks';
import { useParams } from 'react-router-dom';
import { theme } from 'theme';

export const ExamResultScreen = () => {
	const { examId } = useParams();
	const {
		data: examResult = {
			data: {
				answers: [],
				exam: {},
				id: '',
				score: 0,
			},
		},
		isLoading,
		isError,
	} = useGetExamAnswer({
		examId: examId || '',
	});
	return (
		<LoadingErrorPlaceholder isError={isError} isLoading={isLoading}>
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
					<Box
						mt={2}
						display="flex"
						alignItems="space-betwenn"
						paddingX="10px"
						flexDirection="column"
					>
						<Typography fontWeight="bold" variant="h4" flexGrow="1">
							IOT Exam
						</Typography>
						<Typography mt={2} variant="h5" flexGrow="1">
							YOUR SCORE: {examResult.data.score} / 100
						</Typography>
					</Box>
					{examResult.data.answers.map((answer, index) => (
						<Box
							sx={{
								my: 2,
								pt: 2,
								px: 2,
								pb: 4,
								mb: 2,
								borderRadius: '15px',
								bgcolor: 'white',
								border: answer.isCorrect ? '3px solid green' : '3px solid red',
								boxShadow:
									'rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px',
							}}
							key={answer.questionText}
						>
							<Stack justifyContent="space-between" position="relative">
								<CustomTextField
									value={answer.questionText}
									type="text"
									withLabel
									label={`Question ${index + 1}`}
									multiline
									rows={5}
									disabled
								/>
								<CustomTextField
									value={answer.questionType}
									type="text"
									withLabel
									label="Question Type"
									disabled
								/>
								<CustomTextField
									value={answer.questionAnswer}
									type="text"
									withLabel
									multiline
									rows={5}
									label="Your Answer"
									disabled
								/>
								<CustomTextField
									value={answer.modelAnswer}
									type="text"
									withLabel
									label="Model Answer"
									multiline
									rows={5}
									disabled
								/>
							</Stack>
						</Box>
					))}
				</Box>
			</CustomLayout>
		</LoadingErrorPlaceholder>
	);
};

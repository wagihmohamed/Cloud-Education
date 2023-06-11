/* eslint-disable no-console */
import {
	Box,
	FormControlLabel,
	Radio,
	RadioGroup,
	Typography,
} from '@mui/material';
import {
	CustomTextField,
	CustomButton,
	LoadingErrorPlaceholder,
} from 'components';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { pink } from '@mui/material/colors';
import { useGetExamItem, useSubmitAnswer } from 'hooks';
import { useParams, useNavigate } from 'react-router-dom';
import { ExamError } from 'models';
import { theme } from 'theme';
import { Answer } from 'services';
import { toast } from 'react-toastify';

export const ExamList = () => {
	const navigate = useNavigate();
	const { examId } = useParams();
	const { mutate: submitAnswers, isLoading: isSubmitLoading } = useSubmitAnswer(
		{
			onSuccess: () => {
				navigate('/exams');
				toast.success('Your answers submitted successfully');
			},
		}
	);

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
				remainingMinutes: 0,
			},
		},
		isLoading,
	} = useGetExamItem(examId || '');

	const examQuestions: Answer[] = examData.data.questions.map((question) => {
		return {
			questionText: question.questionText,
			questionType: question.questionType,
			questionAnswer: '',
		};
	});
	const formik = useFormik({
		initialValues: {
			examQuestions,
		},
		validationSchema: Yup.object({
			examQuestions: Yup.array().of(
				Yup.object()
					.shape({
						questionText: Yup.string().required('This field is required'),
						questionType: Yup.string().required('This field is required'),
						questionAnswer: Yup.string().required('Your answer is required'),
					})
					.required('Your answer is required')
			),
		}),
		onSubmit: (values) => {
			submitAnswers({
				examId: examId || '',
				answers: values.examQuestions,
			});
		},
	});

	const updateArrayItem = (index: number, value: string) => {
		const newArray = [...formik.values.examQuestions];
		newArray[index] = {
			...newArray[index],
			questionAnswer: value,
		};
		formik.setFieldValue('examQuestions', newArray);
	};

	return (
		<LoadingErrorPlaceholder isError={isError} isLoading={isLoading}>
			<Box
				sx={{
					mt: 4,
					mx: 5,
					pb: 5,
				}}
			>
				<Typography
					sx={{
						textDecoration: 'underline',
					}}
					fontWeight="bold"
					variant="h4"
				>
					{examData.data.name}
				</Typography>
				<Typography my={2} fontWeight="bold" variant="h5">
					{examData.data.description}
				</Typography>
				<Typography my={2} fontWeight="bold" variant="h6">
					Exam Duration: {examData.data.duration} minutes.
				</Typography>
				<Typography my={2} fontWeight="bold" variant="h6">
					Remaining Time: {Math.round(examData.data.remainingMinutes || 0)}{' '}
					minutes.
				</Typography>
				<Box>
					{examData.data.questions.map((question, idx) => {
						return (
							<Box
								key={question.questionText}
								sx={{
									mt: 2,
									mx: 5,
									width: '100%',
									pr: 5,
									[theme.breakpoints.down('md')]: {
										m: 0,
										p: 0,
									},
								}}
							>
								<Box my={3}>
									{question.questionType === 'mcq' ? (
										<Box width="max-content">
											<Typography fontWeight="bold" variant="h6">
												{idx + 1} - {question.questionText}
											</Typography>
											{question.questionChoices?.map((choise) => {
												return (
													<Box
														key={choise.choiceText}
														sx={{
															mt: 2,
															mx: 5,
															width: '100%',
														}}
													>
														<RadioGroup
															aria-labelledby="demo-controlled-radio-buttons-group"
															name={question.questionText}
															value={
																formik.values.examQuestions[idx]?.questionAnswer
															}
															onChange={(e) =>
																updateArrayItem(idx, e.target.value)
															}
														>
															<FormControlLabel
																value={choise.choiceText}
																control={
																	<Radio
																		sx={{
																			color:
																				formik.touched.examQuestions &&
																				Boolean(
																					(
																						formik.errors.examQuestions?.[
																							idx
																						] as ExamError
																					)?.answer
																				)
																					? pink[600]
																					: '',
																		}}
																	/>
																}
																label={
																	<Typography
																		sx={{
																			color:
																				formik.touched.examQuestions &&
																				Boolean(
																					(
																						formik.errors.examQuestions?.[
																							idx
																						] as ExamError
																					)?.answer
																				)
																					? pink[600]
																					: '',
																		}}
																	>
																		{choise.choiceText}
																	</Typography>
																}
															/>
														</RadioGroup>
													</Box>
												);
											})}
										</Box>
									) : (
										<Box key={question.questionText}>
											<Typography fontWeight="bold" variant="h6">
												{idx + 1} - {question.questionText}
											</Typography>
											<CustomTextField
												multiline
												rows={4}
												placeholder="Enter your answer"
												fullWidth
												value={formik.values.examQuestions[idx]?.questionAnswer}
												error={
													formik.touched.examQuestions &&
													Boolean(
														(formik.errors.examQuestions?.[idx] as ExamError)
															?.answer
													)
												}
												helperText={
													formik.touched.examQuestions &&
													(formik.errors.examQuestions?.[idx] as ExamError)
														?.answer
												}
												onChange={(e) => updateArrayItem(idx, e.target.value)}
											/>
										</Box>
									)}
								</Box>
							</Box>
						);
					})}
					<CustomButton
						fullWidth
						py={2}
						mt={4}
						loading={isSubmitLoading}
						loadingButton
						onClick={() => {
							formik.handleSubmit();
						}}
					>
						Submit
					</CustomButton>
				</Box>
			</Box>
		</LoadingErrorPlaceholder>
	);
};

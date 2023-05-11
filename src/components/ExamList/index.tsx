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
import { useGetExam } from 'hooks';
import { useParams } from 'react-router-dom';
import { ExamError } from 'models';

export const ExamList = () => {
	const { examId } = useParams();
	const {
		data: examData = {
			examQuestions: [],
			examDescription: '',
			examId: '',
			examName: '',
			examDurationInMinutes: 100,
		},
		isLoading,
		isError,
	} = useGetExam(examId || '');
	const examQuestions = examData.examQuestions.map((question) => {
		return {
			questionId: question.questionId,
			answer: '',
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
						questionId: Yup.string().required('This field is required'),
						answer: Yup.string().required('Your answer is required'),
					})
					.required('Your answer is required')
			),
		}),
		onSubmit: () => {},
	});

	const updateArrayItem = (index: number, value: string) => {
		const newArray = [...formik.values.examQuestions];
		newArray[index] = {
			...newArray[index],
			answer: value,
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
					{examData.examName}
				</Typography>
				<Typography my={2} fontWeight="bold" variant="h5">
					{examData.examDescription}
				</Typography>
				<Typography my={2} fontWeight="bold" variant="h6">
					Exam Duration: {examData.examDurationInMinutes} minutes.
				</Typography>
				<Box>
					{examData.examQuestions.map((question, idx) => {
						return (
							<Box
								key={question.questionId}
								sx={{
									mt: 2,
									mx: 5,
									width: '100%',
									pr: 5,
								}}
							>
								<Box my={3}>
									{question.questionType === 'choice' ? (
										<Box>
											<Typography fontWeight="bold" variant="h6">
												{idx + 1} - {question.questionText}
											</Typography>
											{question.questionChoices?.map((choise) => {
												return (
													<Box
														key={choise.choiceId}
														sx={{
															mt: 2,
															mx: 5,
															width: '100%',
														}}
													>
														<RadioGroup
															aria-labelledby="demo-controlled-radio-buttons-group"
															name={question.questionId}
															value={
																formik.values.examQuestions[
																	parseInt(question.questionId) - 1
																]?.answer
															}
															onChange={(e) =>
																updateArrayItem(
																	parseInt(question.questionId) - 1,
																	e.target.value
																)
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
																							parseInt(question.questionId) - 1
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
																							parseInt(question.questionId) - 1
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
										<Box key={question.questionId}>
											<Typography fontWeight="bold" variant="h6">
												{idx + 1} - {question.questionText}
											</Typography>
											<CustomTextField
												multiline
												rows={4}
												placeholder="Enter your answer"
												fullWidth
												value={
													formik.values.examQuestions[
														parseInt(question.questionId) - 1
													]?.answer
												}
												error={
													formik.touched.examQuestions &&
													Boolean(
														(
															formik.errors.examQuestions?.[
																parseInt(question.questionId) - 1
															] as ExamError
														)?.answer
													)
												}
												helperText={
													formik.touched.examQuestions &&
													(
														formik.errors.examQuestions?.[
															parseInt(question.questionId) - 1
														] as ExamError
													)?.answer
												}
												onChange={(e) =>
													updateArrayItem(
														parseInt(question.questionId) - 1,
														e.target.value
													)
												}
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

import { useState, useRef } from 'react';
import {
	CustomButton,
	CustomLayout,
	CustomSelect,
	CustomTextField,
} from 'components';
import { Box, Grid, Stack, Typography } from '@mui/material';
import { Formik, Form, FieldArray } from 'formik';
import {
	CheckCircleOutlineOutlined,
	CloseOutlined,
	DoDisturbOnOutlined,
} from '@mui/icons-material';
import { addExamInitialValues, addExamValidationSchema } from './formikUtils';
import { ExamErrorType } from 'models';
import { toast } from 'react-toastify';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { DateRangePicker } from 'react-date-range';
import { useCoursesList, useCreateExam } from 'hooks';
import { format } from 'date-fns';

export const CreateExamScreen = () => {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const formikRef = useRef<any>(null);
	const {
		data: coursesCodes = {
			data: [],
			page: 0,
			pagesCount: 0,
			status: '',
		},
	} = useCoursesList({
		page: 1,
	});
	const { mutate: createExam, isLoading } = useCreateExam({
		onSuccess: () => {
			toast.success('Exam Created Successfully');
			// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
			formikRef.current.resetForm();
		},
		onError: (error) => {
			toast.error(error.response?.data?.message || 'Something went wrong');
		},
	});
	const [state, setState] = useState([
		{
			startDate: new Date(),
			endDate: new Date(new Date().setDate(new Date().getDate() + 7)),
			key: 'selection',
		},
	]);

	const handleChangeRange = (item: {
		selection: { startDate: Date; endDate: Date; key: string };
	}) => {
		setState([item.selection]);
	};

	return (
		<CustomLayout>
			<Box
				sx={{
					mt: 4,
					mx: 5,
				}}
			>
				<h1>Add Exam Screen</h1>
				<Formik
					initialValues={addExamInitialValues}
					validationSchema={addExamValidationSchema}
					onSubmit={() => {}}
					validateOnMount={true}
					validateOnChange={true}
					innerRef={formikRef}
				>
					{({
						values,
						handleChange,
						touched,
						errors,
						setFieldValue,
						isValid,
						isSubmitting,
					}) => (
						<Form>
							<Grid container spacing={2} mb={2}>
								<Grid item sm={12} md={6}>
									<CustomTextField
										name="name"
										value={values.name}
										placeholder="Exam Name"
										type="text"
										withLabel
										label="Exam Name"
										onChange={handleChange}
										error={touched.name && Boolean(errors.name)}
										helperText={touched.name && errors.name}
									/>
								</Grid>
								<Grid item sm={12} md={6}>
									<CustomTextField
										name="duration"
										value={values.duration === 0 ? '' : values.duration}
										placeholder="Duration in minutes"
										type="number"
										withLabel
										label="Duration (in minutes)"
										onChange={handleChange}
										error={touched.duration && Boolean(errors.duration)}
										helperText={touched.duration && errors.duration}
									/>
								</Grid>
								<Grid
									item
									sm={7}
									sx={{
										display: 'flex',
										flexDirection: 'column',
										alignItems: 'center',
										justifyContent: 'center',
									}}
								>
									<Typography variant="h6" mb={1}>
										Exam Available Period
									</Typography>
									<DateRangePicker
										editableDateInputs={true}
										moveRangeOnFirstSelection={false}
										ranges={state}
										dateDisplayFormat="yyyy-MM-dd"
										className="filter-rangeee"
										onChange={(item: {
											selection: {
												startDate: Date;
												endDate: Date;
												key: string;
											};
										}) => {
											handleChangeRange(item);
											setFieldValue('startTime', item.selection.startDate);
											setFieldValue('endTime', item.selection.endDate);
										}}
									/>
									{touched.startTime &&
										touched.endTime &&
										errors.startTime &&
										errors.endTime && (
											<Typography
												mt={1}
												variant="body2"
												sx={{
													color: '#d32f2f',
													ml: 2,
												}}
											>
												{errors.startTime}
											</Typography>
										)}
								</Grid>
								<Grid item sm={5}>
									<CustomTextField
										name="description"
										value={values.description}
										placeholder="Exam Description"
										type="text"
										multiline
										rows={6}
										withLabel
										label="Description"
										onChange={handleChange}
										error={touched.description && Boolean(errors.description)}
										helperText={touched.description && errors.description}
									/>
									<CustomSelect
										options={coursesCodes.data.map((course) => ({
											value: course.code,
											label: course.name,
										}))}
										name="courseCode"
										value={
											values.courseCode.value === ''
												? undefined
												: values.courseCode
										}
										placeholder="Course Code"
										withLabel
										label="Course Code"
										onChange={(e: { label: string; value: string }) => {
											setFieldValue('courseCode', e);
										}}
										error={touched.courseCode && Boolean(errors.courseCode)}
										helperText={touched.courseCode && errors.courseCode?.label}
									/>
								</Grid>
							</Grid>
							<FieldArray name="questions">
								{({ remove, push }) => (
									<div>
										{values.questions.length > 0 &&
											values.questions.map((_, index) => (
												<Box
													sx={{
														mt: 2,
														border: '1px solid rgba(0, 0, 0, 0.1)',
														pt: 2,
														px: 2,
														pb: 4,
														mb: 2,
														borderRadius: '15px',
														bgcolor: 'white',
														boxShadow:
															'rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px',
													}}
													key={index}
												>
													<Stack
														justifyContent="space-between"
														position="relative"
													>
														<Box
															sx={{
																position: 'absolute',
																right: '10px',
																top: '0px',
															}}
														>
															<CloseOutlined
																onClick={() => remove(index)}
																sx={{
																	width: '30px',
																	height: '30px',
																	cursor: 'pointer',
																	display:
																		values.questions.length === 1
																			? 'none'
																			: 'block',
																}}
															/>
														</Box>
														<CustomTextField
															name={`questions.${index}.questionText`}
															value={values.questions[index].questionText}
															placeholder="Question Title"
															type="text"
															withLabel
															label={`Question ${index + 1}`}
															onChange={handleChange}
															error={
																touched.questions?.[index]?.questionText &&
																Boolean(
																	(errors.questions?.[index] as ExamErrorType)
																		?.questionText
																)
															}
															helperText={
																touched.questions?.[index]?.questionText &&
																(errors.questions?.[index] as ExamErrorType)
																	?.questionText
															}
														/>
														<div>
															<CustomSelect
																options={[
																	{ value: 'essay', label: 'Essay' },
																	{ value: 'mcq', label: 'MCQ' },
																]}
																withLabel
																label="Question Type"
																value={{
																	value: values.questions[index].questionType,
																	label: values.questions[index].questionType,
																}}
																name={`questions.${index}.questionType`}
																placeholder="Question Type"
																onChange={(e: {
																	label: string;
																	value: string;
																}) => {
																	if (e.value === 'mcq') {
																		setFieldValue(
																			`questions.${index}.questionAnswer`,
																			undefined
																		);
																		setFieldValue(
																			`questions.${index}.questionChoices`,
																			[
																				{
																					choiceText: '',
																					isCorrect: false,
																				},
																				{
																					choiceText: '',
																					isCorrect: false,
																				},
																				{
																					choiceText: '',
																					isCorrect: false,
																				},
																			]
																		);
																		setFieldValue(
																			`questions.${index}.questionType`,
																			e.value
																		);
																	} else if (e.value === 'essay') {
																		setFieldValue(
																			`questions.${index}.questionType`,
																			e.value
																		);
																		setFieldValue(
																			`questions.${index}.questionChoices`,
																			undefined
																		);
																		setFieldValue(
																			`questions.${index}.questionAnswer`,
																			''
																		);
																	}
																}}
															/>
														</div>
														{values.questions[index].questionType ===
															'essay' && (
															<CustomTextField
																name={`questions.${index}.questionAnswer`}
																value={values.questions[index].questionAnswer}
																placeholder="Essay Answer"
																type="text"
																withLabel
																label={`Essay Answer ${index + 1}`}
																onChange={handleChange}
																error={
																	touched.questions?.[index]?.questionAnswer &&
																	Boolean(
																		(errors.questions?.[index] as ExamErrorType)
																			?.questionAnswer
																	)
																}
																helperText={
																	touched.questions?.[index]?.questionAnswer &&
																	(errors.questions?.[index] as ExamErrorType)
																		?.questionAnswer
																}
															/>
														)}
													</Stack>
													{values.questions[index].questionType === 'mcq' && (
														<>
															<Typography
																sx={{
																	textAlign: 'center',
																	mt: 2,
																	mb: 1,
																	color: '#f44336',
																	fontSize: '1.2rem',
																}}
															>
																{(errors.questions?.[index] as ExamErrorType)
																	?.questionChoices &&
																	touched.questions?.[index]?.questionChoices &&
																	'Please fill all the answers and mark the correct answer'}
															</Typography>
															<Stack>
																<label
																	htmlFor={`questions.${index}.questionChoices`}
																>
																	Question {index + 1} Answers
																</label>
																<FieldArray
																	name={`questions.${index}.questionChoices`}
																>
																	{({
																		remove: removeAnswer,
																		push: pushAnswer,
																	}) => (
																		<Stack display="flex" flexBasis="column">
																			{(
																				values.questions[index]
																					.questionChoices ?? []
																			).length > 0 &&
																				(
																					values.questions[index]
																						.questionChoices ?? []
																				).map((__, answerIndex) => (
																					<Box
																						sx={{
																							display: 'flex',
																							justifyContent: 'space-between',
																							alignItems: 'center',
																							mb: 2,
																						}}
																						key={answerIndex}
																					>
																						<Box width="99%">
																							<CustomTextField
																								name={`questions.${index}.questionChoices.${answerIndex}`}
																								placeholder={`Answer ${
																									answerIndex + 1
																								}`}
																								type="text"
																								withLabel
																								label={`Answer ${
																									answerIndex + 1
																								}`}
																								onChange={(e) => {
																									setFieldValue(
																										`questions.${index}.questionChoices.${answerIndex}.choiceText`,
																										e.target.value
																									);
																								}}
																								fullWidth
																								error={
																									touched.questions?.[index]
																										?.questionChoices &&
																									Boolean(
																										(
																											errors.questions?.[
																												index
																											] as ExamErrorType
																										)?.questionChoices?.[
																											answerIndex
																										]?.choiceText ||
																											(
																												errors.questions?.[
																													index
																												] as ExamErrorType
																											)?.questionChoices?.[
																												answerIndex
																											]?.isCorrect
																									)
																								}
																								helperText={
																									(touched.questions?.[index]
																										?.questionChoices &&
																										(
																											errors.questions?.[
																												index
																											] as ExamErrorType
																										)?.questionChoices?.[
																											answerIndex
																										]?.choiceText) ||
																									(
																										errors.questions?.[
																											index
																										] as ExamErrorType
																									)?.questionChoices?.[
																										answerIndex
																									]?.isCorrect
																								}
																							/>
																						</Box>
																						{values.questions[index]
																							?.questionChoices?.[answerIndex]
																							.isCorrect ? (
																							<DoDisturbOnOutlined
																								onClick={() => {
																									setFieldValue(
																										`questions.${index}.questionChoices.${answerIndex}.isCorrect`,
																										false
																									);
																								}}
																								sx={{
																									width: '30px',
																									height: '30px',
																									cursor: 'pointer',
																									mt: 3,
																									ml: 1,
																								}}
																							/>
																						) : (
																							<CheckCircleOutlineOutlined
																								onClick={() => {
																									setFieldValue(
																										'questions',
																										values.questions.map(
																											(
																												question,
																												questionIndex
																											) => {
																												if (
																													questionIndex ===
																													index
																												) {
																													return {
																														...question,
																														questionChoices:
																															question.questionChoices?.map(
																																(
																																	ans,
																																	ansIdx
																																) => {
																																	if (
																																		ansIdx ===
																																		answerIndex
																																	) {
																																		return {
																																			...ans,
																																			isCorrect:
																																				true,
																																		};
																																	}
																																	return {
																																		...ans,
																																		isCorrect:
																																			false,
																																	};
																																}
																															),
																													};
																												}
																												return question;
																											}
																										)
																									);
																								}}
																								sx={{
																									width: '30px',
																									height: '30px',
																									cursor: 'pointer',
																									mt: 3,
																									ml: 1,
																								}}
																							/>
																						)}
																						<CloseOutlined
																							onClick={() =>
																								removeAnswer(answerIndex)
																							}
																							sx={{
																								width: '30px',
																								height: '30px',
																								cursor: 'pointer',
																								mt: 3,
																								ml: 1,
																							}}
																						/>
																					</Box>
																				))}
																			<CustomButton
																				type="button"
																				onClick={() =>
																					pushAnswer({
																						choiceText: '',
																						isCorrect: false,
																					})
																				}
																				sx={{
																					mx: 'auto',
																					maxWidth: '200px',
																					mt: 3,
																				}}
																				fullWidth={false}
																			>
																				Add Answer
																			</CustomButton>
																		</Stack>
																	)}
																</FieldArray>
															</Stack>
														</>
													)}
												</Box>
											))}
										<CustomButton
											type="button"
											mt={2}
											bgColor="#4CAF50"
											onClick={() => {
												push({
													questionText: '',
													questionAnswer: '',
													questionType: 'essay',
												});
											}}
											disabled={!isValid || !values.questions.length}
										>
											Add Question
										</CustomButton>
									</div>
								)}
							</FieldArray>
							<CustomButton
								loadingButton
								loading={isLoading}
								onClick={() => {
									if (!isValid || !values.questions.length || isSubmitting)
										return;
									const newEndTime = new Date(values.endTime);
									const newStartTime = new Date(values.startTime);
									createExam({
										courseCode: values.courseCode.value,
										exam: {
											description: values.description,
											duration: values.duration,
											endTime: format(newEndTime, 'yyyy-MM-dd'),
											startTime: format(newStartTime, 'yyyy-MM-dd'),
											name: values.name,
											questions: values.questions.map((question) => {
												if (question.questionType === 'essay') {
													return {
														questionText: question.questionText,
														questionType: question.questionType,
														questionAnswer: question.questionAnswer,
													};
												}
												return {
													questionText: question.questionText,
													questionType: question.questionType,
													questionChoices: question.questionChoices?.map(
														(choice) => {
															return {
																choiceText: choice.choiceText,
																isCorrect: choice.isCorrect,
															};
														}
													),
												};
											}),
										},
									});
								}}
								type="submit"
								fullWidth
								mt={2}
								py={2}
								mb={6}
							>
								Submit
							</CustomButton>
						</Form>
					)}
				</Formik>
			</Box>
		</CustomLayout>
	);
};

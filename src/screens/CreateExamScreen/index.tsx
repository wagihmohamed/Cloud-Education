/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-console */
import {
	CustomButton,
	CustomLayout,
	CustomSelect,
	CustomTextField,
} from 'components';
import { Box, Stack, Typography } from '@mui/material';
import { Formik, Form, FieldArray } from 'formik';
import {
	CheckCircleOutlineOutlined,
	CloseOutlined,
	DoDisturbOnOutlined,
} from '@mui/icons-material';
import { addExamInitialValues, addExamValidationSchema } from './formikUtils';
import { ExamErrorType } from 'models';
import { toast } from 'react-toastify';

export const CreateExamScreen = () => {
	return (
		<CustomLayout>
			<Box
				sx={{
					mt: 4,
					mx: 5,
					bgcolor: 'white',
				}}
			>
				<h1>Add Exam Screen</h1>
				<Formik
					initialValues={addExamInitialValues}
					validationSchema={addExamValidationSchema}
					onSubmit={() => {}}
					validateOnMount={true}
					validateOnChange={true}
				>
					{({
						values,
						handleChange,
						touched,
						errors,
						setFieldValue,
						isValid,
						isSubmitting,
						resetForm,
					}) => (
						<Form>
							<FieldArray name="exam">
								{({ remove, push }) => (
									<div>
										{values.exam.length > 0 &&
											values.exam.map((exam, index) => (
												<Box
													sx={{
														border: '1px solid rgba(0, 0, 0, 0.1)',
														pt: 2,
														px: 2,
														pb: 4,
														mb: 2,
														borderRadius: '15px',
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
																		values.exam.length === 1 ? 'none' : 'block',
																}}
															/>
														</Box>
														<CustomTextField
															name={`exam.${index}.questionTitle`}
															value={values.exam[index].questionTitle}
															placeholder="Question Title"
															type="text"
															withLabel
															label={`Question ${index + 1}`}
															onChange={handleChange}
															error={
																touched.exam?.[index]?.questionTitle &&
																Boolean(
																	(errors.exam?.[index] as ExamErrorType)
																		?.questionTitle
																)
															}
															helperText={
																touched.exam?.[index]?.questionTitle &&
																(errors.exam?.[index] as ExamErrorType)
																	?.questionTitle
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
																	value: values.exam[index].questionType,
																	label: values.exam[index].questionType,
																}}
																name={`exam.${index}.questionType`}
																placeholder="Question Type"
																onChange={(e: {
																	label: string;
																	value: string;
																}) => {
																	if (e.value === 'mcq') {
																		setFieldValue(
																			`exam.${index}.essayAnswer`,
																			undefined
																		);
																		setFieldValue(
																			`exam.${index}.questionAnswers`,
																			[
																				{
																					answer: '',
																					isCorrect: false,
																				},
																				{
																					answer: '',
																					isCorrect: false,
																				},
																				{
																					answer: '',
																					isCorrect: false,
																				},
																			]
																		);
																		setFieldValue(
																			`exam.${index}.questionType`,
																			e.value
																		);
																	} else if (e.value === 'essay') {
																		setFieldValue(
																			`exam.${index}.questionType`,
																			e.value
																		);
																		setFieldValue(
																			`exam.${index}.questionAnswers`,
																			undefined
																		);
																		setFieldValue(
																			`exam.${index}.essayAnswer`,
																			''
																		);
																	}
																}}
															/>
														</div>
														{values.exam[index].questionType === 'essay' && (
															<CustomTextField
																name={`exam.${index}.essayAnswer`}
																value={values.exam[index].essayAnswer}
																placeholder="Essay Answer"
																type="text"
																withLabel
																label={`Essay Answer ${index + 1}`}
																onChange={handleChange}
																error={
																	touched.exam?.[index]?.essayAnswer &&
																	Boolean(
																		(errors.exam?.[index] as ExamErrorType)
																			?.essayAnswer
																	)
																}
																helperText={
																	touched.exam?.[index]?.essayAnswer &&
																	(errors.exam?.[index] as ExamErrorType)
																		?.essayAnswer
																}
															/>
														)}
													</Stack>
													{values.exam[index].questionType === 'mcq' && (
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
																{(touched.exam?.[index]?.questionAnswers &&
																	(errors.exam?.[index] as ExamErrorType)
																		?.questionAnswers?.[0]?.answer) ||
																	(
																		errors.exam?.[index] as ExamErrorType
																	)?.questionAnswers?.toString()}
															</Typography>
															<Stack>
																<label
																	htmlFor={`exam.${index}.questionAnswers`}
																>
																	Question {index + 1} Answers
																</label>
																<FieldArray
																	name={`exam.${index}.questionAnswers`}
																>
																	{({
																		remove: removeAnswer,
																		push: pushAnswer,
																	}) => (
																		<Stack display="flex" flexBasis="column">
																			{(
																				values.exam[index].questionAnswers ?? []
																			).length > 0 &&
																				(
																					values.exam[index].questionAnswers ??
																					[]
																				).map((answer, answerIndex) => (
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
																								name={`exam.${index}.questionAnswers.${answerIndex}`}
																								placeholder={`Answer ${
																									answerIndex + 1
																								}`}
																								type="text"
																								withLabel
																								label={`Answer ${
																									answerIndex + 1
																								}`}
																								onChange={(e) => {
																									console.log(errors);

																									setFieldValue(
																										`exam.${index}.questionAnswers.${answerIndex}.answer`,
																										e.target.value
																									);
																								}}
																								fullWidth
																								error={
																									touched.exam?.[index]
																										?.questionAnswers &&
																									Boolean(
																										(
																											errors.exam?.[
																												index
																											] as ExamErrorType
																										)?.questionAnswers?.[
																											answerIndex
																										]?.answer ||
																											(
																												errors.exam?.[
																													index
																												] as ExamErrorType
																											)?.questionAnswers?.[
																												answerIndex
																											]?.isCorrect
																									)
																								}
																								helperText={
																									(touched.exam?.[index]
																										?.questionAnswers &&
																										(
																											errors.exam?.[
																												index
																											] as ExamErrorType
																										)?.questionAnswers?.[
																											answerIndex
																										]?.answer) ||
																									(
																										errors.exam?.[
																											index
																										] as ExamErrorType
																									)?.questionAnswers?.[
																										answerIndex
																									]?.isCorrect
																								}
																							/>
																						</Box>
																						{values.exam[index]
																							?.questionAnswers?.[answerIndex]
																							.isCorrect ? (
																							<DoDisturbOnOutlined
																								onClick={() =>
																									setFieldValue(
																										`exam.${index}.questionAnswers.${answerIndex}.isCorrect`,
																										false
																									)
																								}
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
																								onClick={() =>
																									setFieldValue(
																										'exam',
																										(values.exam ?? []).map(
																											(ans, ansIdx) => ({
																												...ans,
																												questionAnswers:
																													ansIdx === index
																														? ans.questionAnswers?.map(
																																(
																																	mcqAns,
																																	mcaAnsIdx
																																) => ({
																																	...mcqAns,
																																	isCorrect:
																																		mcaAnsIdx ===
																																		answerIndex
																																			? true
																																			: false,
																																})
																														  )
																														: ans.questionAnswers?.map(
																																(mcqAns) => ({
																																	...mcqAns,
																																	isCorrect:
																																		false,
																																})
																														  ),
																											})
																										)
																									)
																								}
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
																						answer: '',
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
											onClick={() =>
												push({
													questionTitle: '',
													essayAnswer: '',
													questionType: 'essay',
												})
											}
											disabled={!isValid || !values.exam.length}
										>
											Add Question
										</CustomButton>
									</div>
								)}
							</FieldArray>
							<CustomButton
								onClick={async () => {
									if (!isValid || !values.exam.length || isSubmitting) return;
									await new Promise((r) => setTimeout(r, 1500));
									toast.success('Exam Added Successfully');
									resetForm();
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

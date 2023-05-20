import {
	CustomButton,
	CustomLayout,
	CustomSelect,
	CustomTextField,
} from 'components';
import { Box, Stack } from '@mui/material';
import { Formik, Form, FieldArray } from 'formik';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { addExamInitialValues, addExamValidationSchema } from './formikUtils';

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
					onSubmit={async () => {
						await new Promise((r) => setTimeout(r, 500));
					}}
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
															<CloseOutlinedIcon
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
															placeholder="Question Title"
															type="text"
															withLabel
															label={`Question ${index + 1}`}
															onChange={handleChange}
															error={Boolean(
																!values.exam[index].questionTitle &&
																	touched.exam &&
																	errors.exam
															)}
															helperText={
																!values.exam[index].questionTitle &&
																touched.exam &&
																errors.exam &&
																'Question Title is required'
															}
														/>
													</Stack>
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
																		`exam.${index}.questionAnswers`,
																		['', '', '']
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
																}
															}}
														/>
													</div>

													{values.exam[index].questionType === 'mcq' && (
														<Stack>
															<label htmlFor={`exam.${index}.questionAnswers`}>
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
																		{(values.exam[index].questionAnswers ?? [])
																			.length > 0 &&
																			(
																				values.exam[index].questionAnswers ?? []
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
																							onChange={handleChange}
																							fullWidth
																							error={Boolean(
																								!values.exam[index]
																									?.questionAnswers?.[
																									answerIndex
																								] &&
																									touched.exam &&
																									errors.exam
																							)}
																							helperText={
																								!values.exam[index]
																									?.questionAnswers?.[
																									answerIndex
																								] &&
																								touched.exam &&
																								errors.exam &&
																								'Answer is required'
																							}
																						/>
																					</Box>
																					<CloseOutlinedIcon
																						onClick={() =>
																							removeAnswer(answerIndex)
																						}
																						sx={{
																							width: '30px',
																							height: '30px',
																							cursor: 'pointer',
																							mt: 4,
																							ml: 1,
																						}}
																					/>
																				</Box>
																			))}
																		<CustomButton
																			type="button"
																			onClick={() => pushAnswer('')}
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
								onClick={() => {}}
								type="submit"
								fullWidth
								mt={2}
								py={2}
								disabled={!isValid || !values.exam.length}
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

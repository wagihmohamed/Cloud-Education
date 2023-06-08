import { ExamInitialValues } from 'models';
import * as Yup from 'yup';

export const addExamInitialValues: ExamInitialValues = {
	name: '',
	description: '',
	duration: 0,
	endTime: '',
	startTime: '',
	courseCode: {
		label: '',
		value: '',
	},
	questions: [
		{
			questionText: '',
			questionAnswer: '',
			questionType: 'essay',
		},
	],
};

export const addExamValidationSchema = Yup.object({
	courseCode: Yup.object({
		value: Yup.string().required('Course Code is required'),
		label: Yup.string().required('Course Code is required'),
	}),
	name: Yup.string()
		.min(6, 'Name must be at least 6 characters')
		.required('Name is required'),
	description: Yup.string()
		.min(6, 'Description must be at least 6 characters')
		.required('Description is required'),
	duration: Yup.number()
		.min(10, 'Duration must be at least 10 minute')
		.required('Duration is required'),
	startTime: Yup.string().required('Start Time is required'),
	endTime: Yup.string().required('End Time is required'),
	questions: Yup.array().of(
		Yup.object({
			questionText: Yup.string()
				.min(6, 'Question Title must be at least 6 characters')
				.required('Question Title is required'),
			questionAnswer: Yup.string().when(
				'questionType',
				(questionType: string[], schema) => {
					if (questionType[0] === 'essay') {
						return Yup.string()
							.min(6, 'Question Title must be at least 6 characters')
							.required('Essay Answer is required');
					}
					return schema.nullable();
				}
			),
			questionType: Yup.string().oneOf(['essay', 'mcq'], 'Required'),
			questionChoices: Yup.array().when(
				'questionType',
				(questionType: string[], schema) => {
					if (questionType[0] === 'mcq') {
						return Yup.array()
							.of(
								Yup.object({
									choiceText: Yup.string()
										.min(2, 'MCQ Answer must be at least 2 characters')
										.required('Answer is required'),
									isCorrect: Yup.boolean().required(
										'Please select the correct answer'
									),
								})
							)
							.test(
								'is-correct',
								'Exactly one answer must be marked as correct',
								(value) => {
									if (!Array.isArray(value)) {
										return false;
									}
									const correctAnswers = value.filter(
										(answer) => answer.isCorrect
									);
									return correctAnswers.length === 1;
								}
							);
					}
					return schema.nullable();
				}
			),
		})
	),
});

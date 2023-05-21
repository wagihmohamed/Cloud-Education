import { ExamInitialValues } from 'models';
import * as Yup from 'yup';

export const addExamInitialValues: ExamInitialValues = {
	exam: [
		{
			questionTitle: '',
			essayAnswer: '',
			questionType: 'essay',
		},
	],
};

export const addExamValidationSchema = Yup.object({
	exam: Yup.array().of(
		Yup.object({
			questionTitle: Yup.string()
				.min(6, 'Question Title must be at least 6 characters')
				.required('Question Title is required'),
			essayAnswer: Yup.string().when(
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
			questionAnswers: Yup.array().when(
				'questionType',
				(questionType: string[], schema) => {
					if (questionType[0] === 'mcq') {
						return Yup.array()
							.of(
								Yup.object({
									answer: Yup.string()
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

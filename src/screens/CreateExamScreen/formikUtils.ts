import { ExamInitialValues } from 'models';
import * as Yup from 'yup';

export const addExamInitialValues: ExamInitialValues = {
	exam: [
		{
			questionTitle: '',
			questionType: 'essay',
		},
	],
};

export const addExamValidationSchema = Yup.object({
	exam: Yup.array().of(
		Yup.object({
			questionTitle: Yup.string().required('Question Title is required'),
			questionType: Yup.string().oneOf(['essay', 'mcq'], 'Required'),
			questionAnswers: Yup.array().when(
				'questionType',
				(questionType: string[], schema) => {
					if (questionType[0] === 'mcq') {
						return Yup.array().of(Yup.string().required('Answer is required'));
					}
					return schema.nullable();
				}
			),
		})
	),
});

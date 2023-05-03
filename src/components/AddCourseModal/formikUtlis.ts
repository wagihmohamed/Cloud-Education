import { CourseStatus } from 'models';
import * as yup from 'yup';

export const addedCourseValidationSchema = yup.object({
	courseName: yup.string().required('Course name is required'),
	category: yup
		.object({
			value: yup.string().required('Category is required'),
			label: yup.string().required('Category is required'),
		})
		.required('Category is required'),
	description: yup.string().required('Description is required'),
	courseStatus: yup
		.object({
			value: yup.string().required('Course status is required'),
			label: yup.string().required('Course status is required'),
		})
		.required('Course status is required'),
	courseCode: yup.string().required('Course code is required'),
	prerequisites: yup.array().of(
		yup.object({
			value: yup.string().required('Prerequisites is required'),
			label: yup.string().required('Prerequisites is required'),
		})
	),
});

export const addCourseInitialValues = {
	courseName: '',
	category: {
		value: '',
		label: '',
	},
	description: '',
	courseStatus: {
		value: '' as CourseStatus,
		label: '' as CourseStatus,
	},
	courseCode: '',
	prerequisites: [
		{
			value: '',
			label: '',
		},
	],
};

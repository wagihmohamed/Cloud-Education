import { allCourses } from 'mockup';
import { CoursesBody } from 'models';
import * as yup from 'yup';

export const editCourseValidationSchema = yup.object({
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
			value: yup.string().required('Prerequisite is required'),
			label: yup.string().required('Prerequisite is required'),
		})
	),
});

export const editCourseInitialValues = (editedCourse: CoursesBody) => {
	const selectedPreequisites = allCourses.filter((course) =>
		editedCourse?.prerequisites?.includes(course.value)
	);
	return {
		courseName: editedCourse?.courseName || '',
		category: {
			value: editedCourse?.category || '',
			label: editedCourse?.category || '',
		},
		description: editedCourse?.description || '',
		courseStatus: {
			value: editedCourse?.status || '',
			label: editedCourse?.status || '',
		},
		courseCode: editedCourse?.courseCode || '',
		prerequisites: selectedPreequisites,
	};
};

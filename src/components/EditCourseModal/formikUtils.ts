import { allCourses } from 'mockup';
import { CourseItem } from 'models';
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

export const editCourseInitialValues = (editedCourse: CourseItem) => {
	const selectedPreequisites = allCourses.filter((course) =>
		editedCourse?.prerequisites?.includes(course.value)
	);
	return {
		courseName: editedCourse?.name || '',
		category: {
			value: editedCourse?.category || '',
			label: editedCourse?.category || '',
		},
		description: editedCourse?.description || '',
		courseStatus: {
			value: editedCourse?.isActive,
			label: editedCourse?.isActive ? 'Active' : 'Inactive' || '',
		},
		courseCode: editedCourse?.code || '',
		prerequisites: selectedPreequisites,
	};
};

export const editCourseStyles = {
	courseModal: {
		position: 'absolute',
		top: '50%',
		left: '50%',
		transform: 'translate(-50%, -50%)',
		border: '3px solid #000',
		bgcolor: 'background.paper',
		borderRadius: '10px',
		boxShadow: 24,
		p: 4,
		width: '800px',
		maxHeight: '100vh',
		maxWidth: '100%',
		'&::-webkit-scrollbar': {
			width: '0.4em',
			background: 'transparent',
		},
	},
	courseModalMd: {
		width: '85%',
		margin: 'auto',
		maxHeight: '88vh',
	},
};

import * as yup from 'yup';

export const addUserInitialValues = {
	firstName: '',
	lastName: '',
	email: '',
	phoneNumber: '',
	role: {
		value: '',
		label: '',
	},
	status: {
		value: '',
		label: '',
	},
};

export const addUserValidationSchema = yup.object({
	firstName: yup.string().required('First name is required'),
	lastName: yup.string().required('Last name is required'),
	email: yup
		.string()
		.email('Invalid E-mail format')
		.required('Email is required'),
	phoneNumber: yup.string().required('Phone number is required'),
	role: yup
		.object({
			value: yup.string().required('Role is required'),
			label: yup.string().required('Role is required'),
		})
		.required('Role is required'),
	status: yup
		.object({
			value: yup.string().required('Status is required'),
			label: yup.string().required('Status is required'),
		})
		.required('Status is required'),
});

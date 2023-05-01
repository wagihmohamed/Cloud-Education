import { usersRoles } from 'mockup';
import { User } from 'models';
import * as yup from 'yup';

export const editUserInitialValues = (editedUser: User) => {
	const userRole = usersRoles.find((role) => role.label === editedUser.role);

	return {
		firstName: editedUser.firstName,
		lastName: editedUser.lastName,
		email: editedUser.email,
		phoneNumber: editedUser.phoneNumber,
		role: userRole || {
			value: '',
			label: '',
		},
		status: {
			value: editedUser.status,
			label: editedUser.status,
		},
	};
};

export const editUserValidationSchema = yup.object({
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

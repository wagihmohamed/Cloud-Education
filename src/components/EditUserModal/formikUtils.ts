import { usersRoles } from 'mockup';
import { UserItem } from 'models';
import * as yup from 'yup';

export const editUserInitialValues = (editedUser: UserItem) => {
	const userRole = usersRoles.find(
		(role) => role.value === editedUser.role
	) || {
		value: '' || '',
		label: '' || '',
	};

	return {
		firstName: editedUser.firstName || '',
		lastName: editedUser.lastName || '',
		email: editedUser.email || '',
		phoneNumber: parseInt(editedUser.phoneNumber.slice(2)) || '',
		role: userRole || {
			value: '' || '',
			label: '' || '',
		},
		// status: {
		// 	value: editedUser.status || '',
		// 	label: editedUser.status || '',
		// },
		status: {
			label: 'Active',
			value: 'Active',
		},
		courses: editedUser.courses.map((course) => ({
			value: course.code,
			label: course.name,
		})) || [{ value: '', label: '' }],
	};
};

export const editUserValidationSchema = yup.object({
	firstName: yup.string().required('First name is required'),
	lastName: yup.string().required('Last name is required'),
	email: yup
		.string()
		.email('Invalid E-mail format')
		.required('Email is required'),
	phoneNumber: yup
		.string()
		.test(
			'length',
			'Must be exactly 10 characters',
			(val) => val?.length === 10
		)
		.required('Required'),
	role: yup
		.object({
			value: yup.string().required('Role is required'),
			label: yup.string().required('Role is required'),
		})
		.required('Role is required'),
	// status: yup
	// 	.object({
	// 		value: yup.string().required('Status is required'),
	// 		label: yup.string().required('Status is required'),
	// 	})
	// 	.required('Status is required'),
});

export const editUserstyles = {
	usersModal: {
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
	usersModalMd: {
		width: '85%',
		margin: 'auto',
		maxHeight: '88vh',
	},
};

import { UserItem } from 'models';
import * as yup from 'yup';

export const editProfileInitialValues = (editedProfile: UserItem) => {
	return {
		firstName: editedProfile.firstName || '',
		lastName: editedProfile.lastName || '',
		phoneNumber: parseInt(editedProfile.phoneNumber?.slice(2)) || '',
		email: editedProfile.email || '',
	};
};

export const editProfileValidationSchema = yup.object({
	firstName: yup.string().required('First name is required'),
	lastName: yup.string().required('Last name is required'),
	phoneNumber: yup
		.string()
		.test(
			'length',
			'Must be exactly 10 characters',
			(val) => val?.length === 10
		)
		.required('Required'),
	email: yup
		.string()
		.email('Invalid E-mail format')
		.required('Email is required'),
});

export const profileStyles = {
	profileForm: {
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
		overflow: 'auto',
		maxWidth: '100%',
		'&::-webkit-scrollbar': {
			width: '0.4em',
			background: 'transparent',
		},
	},
	profileFormMd: {
		width: '85%',
		margin: 'auto',
		maxHeight: '88vh',
	},
};

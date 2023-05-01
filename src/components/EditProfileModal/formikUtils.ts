import { usersRoles } from 'mockup';
import { allLevels } from 'mockup/allLevels';
import { UserInfo } from 'models';
import * as yup from 'yup';

export const editProfileInitialValues = (editedProfile: UserInfo) => {
	const userRole = usersRoles.find((role) => role.label === editedProfile.role);
	const userLevel = allLevels.find(
		(level) => level.label === editedProfile.currentLevel
	);
	return {
		firstName: editedProfile.firstName,
		lastName: editedProfile.lastName,
		phoneNumber: editedProfile.phoneNumber,
		email: editedProfile.email,
		GPA: editedProfile.GPA,
		role: userRole ?? {
			value: '',
			label: '',
		},
		currentLevel: userLevel ?? {
			value: '',
			label: '',
		},
		creditHours: editedProfile.creditHours,
	};
};

export const editProfileValidationSchema = yup.object({
	firstName: yup.string().required('First name is required'),
	lastName: yup.string().required('Last name is required'),
	phoneNumber: yup.string().required('Phone number is required'),
	email: yup
		.string()
		.email('Invalid E-mail format')
		.required('Email is required'),
	GPA: yup
		.number()
		.typeError('GPA must be a number')
		.min(0, 'GPA cant be less than 0')
		.max(4, 'GPA cant be more than 4')
		.positive('GPA cant be negative')
		.required('GPA is required'),
	role: yup
		.object({
			value: yup.string().required('Role is required'),
			label: yup.string().required('Role is required'),
		})
		.required('Role is required'),
	currentLevel: yup
		.object({
			value: yup.string().required('Current level is required'),
			label: yup.string().required('Current level is required'),
		})
		.required('Current level is required'),
	creditHours: yup.string().required('Credit hours is required'),
});

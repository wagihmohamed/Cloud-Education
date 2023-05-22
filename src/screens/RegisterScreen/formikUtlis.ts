import { phoneRegExp } from 'utlis/phoneRegExp';
import * as Yup from 'yup';

export const registerInistialValues = {
	firstName: '',
	lastName: '',
	email: '',
	phoneNumber: '',
	password: '',
	confirmPassword: '',
};

export const registerValidationSchema = Yup.object({
	firstName: Yup.string().required('Required'),
	lastName: Yup.string().required('Required'),
	email: Yup.string().email('Invalid email address').required('Required'),
	phoneNumber: Yup.string()
		.matches(phoneRegExp, 'Phone number is not valid')
		.required('Required'),
	password: Yup.string().min(4, 'Password must be +4').required('Required'),
	confirmPassword: Yup.string()
		.oneOf([Yup.ref('password'), undefined], 'Passwords must match')
		.required('Required'),
});

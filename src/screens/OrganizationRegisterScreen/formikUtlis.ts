/* eslint-disable @typescript-eslint/no-unused-vars */
import { phoneRegExp } from 'utlis/phoneRegExp';
import * as Yup from 'yup';

export const organizationRegisterInitialValues = {
	name: '',
	type: {
		value: '',
		label: '',
	},
	orgDomain: '',
	orgDomainName: '',
	orgPhone: '',
	country: {
		value: '',
		label: '',
	},
	orgAddress: '',
	adminFirstName: '',
	adminLastName: '',
	adminEmail: '',
	adminPhone: '',
	adminPassword: '',
	adminConfirmPassword: '',
};

export const organizationRegisterValidationSchema = Yup.object({
	name: Yup.string().required('Required'),
	type: Yup.object().shape({
		value: Yup.string().required('Required'),
		label: Yup.string().required('Required'),
	}),
	orgDomain: Yup.string().required('Required'),
	orgDomainName: Yup.string().required('Required'),
	orgPhone: Yup.string()
		.test(
			'length',
			'Must be exactly 10 characters',
			(val) => val?.length === 10
		)
		.required('Required'),
	country: Yup.object().shape({
		value: Yup.string().required('Required'),
		label: Yup.string().required('Required'),
	}),
	orgAddress: Yup.string().required('Required'),
	adminFirstName: Yup.string().required('Required'),
	adminLastName: Yup.string().required('Required'),
	adminEmail: Yup.string().email('Invalid email address').required('Required'),
	adminPhone: Yup.string()
		.test(
			'length',
			'Must be exactly 10 characters',
			(val) => val?.length === 10
		)
		.required('Required'),
	adminPassword: Yup.string()
		.min(4, 'Password must be +4')
		.required('Required'),
	adminConfirmPassword: Yup.string()
		.oneOf([Yup.ref('adminPassword'), undefined], 'Passwords must match')
		.required('Required'),
});

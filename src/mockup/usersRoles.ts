import { UserRoles } from 'models';

export const usersRoles: { label: string; value: UserRoles }[] = [
	{
		label: 'Teacher',
		value: 'TEACHER',
	},
	{
		label: 'Student',
		value: 'STUDENT',
	},
	{
		label: 'Admin',
		value: 'ADMIN',
	},
];

export const editUserRoles: { label: string; value: UserRoles }[] = [
	{
		label: 'Teacher',
		value: 'TEACHER',
	},
	{
		label: 'Student',
		value: 'STUDENT',
	},
];

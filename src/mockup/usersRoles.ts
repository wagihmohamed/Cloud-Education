import { UserRoles } from 'models';

export const usersRoles: { label: string; value: UserRoles }[] = [
	{
		label: 'Teacher',
		value: 'TEACHER',
	},
	{
		label: 'Learner',
		value: 'LEARNER',
	},
	{
		label: 'Admin',
		value: 'ADMIN',
	},
];

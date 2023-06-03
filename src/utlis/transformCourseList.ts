import { CourseCode } from 'models';

export const transformCoursesList = (list: CourseCode[]) => {
	return list.map((item) => ({
		label: item.name,
		value: item.code,
	}));
};

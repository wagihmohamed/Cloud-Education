import { ExamListItem } from 'models';

export const isExamDisabled = (exam: ExamListItem) => {
	const today = new Date();
	return exam.startDate > today || exam.endDate < today;
};

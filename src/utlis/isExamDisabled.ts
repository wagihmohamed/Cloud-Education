import { ExamsItem } from 'models';
import { parseISO, isBefore, isAfter } from 'date-fns';

export const isExamDisabled = (exam: ExamsItem) => {
	const today = new Date();
	const start = parseISO(exam.startTime);
	const end = parseISO(exam.endTime);

	return isBefore(today, start) || isAfter(today, end);
};

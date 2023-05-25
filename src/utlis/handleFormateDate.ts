import { format, parseISO } from 'date-fns';

export const handleFormateDate = (date?: string) => {
	return format(parseISO(date || ''), 'dd-MMM-yyyy');
};

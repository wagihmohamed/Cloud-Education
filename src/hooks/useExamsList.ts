import { useQuery } from '@tanstack/react-query';
import { mockExams } from 'mockup';
import { sleep } from 'utlis';

export const useExamsList = () => {
	return useQuery({
		queryKey: ['examsList'],
		queryFn: async () => {
			await sleep(1500);
			return mockExams;
		},
	});
};

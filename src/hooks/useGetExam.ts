import { useQuery } from '@tanstack/react-query';
import { examDummyData } from 'mockup';
import { sleep } from 'utlis';

export const useGetExam = (examId: string) => {
	return useQuery({
		queryKey: ['exam', examId],
		queryFn: async () => {
			await sleep(2500);
			return examDummyData;
		},
	});
};

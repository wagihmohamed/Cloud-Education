import { useQuery } from '@tanstack/react-query';
import { coursesBodyData } from 'mockup';
import { sleep } from 'utlis';

export const useCoursesList = () => {
	return useQuery({
		queryKey: ['courses'],
		queryFn: async () => {
			await sleep(2000);
			return coursesBodyData;
		},
	});
};

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { sleep } from 'utlis';
import { ApiError } from 'models';
import { coursesBodyData } from 'mockup';
import { AxiosError } from 'axios';

export const useDeleteCourse = (data: {
	onSuccess: () => void;
	onError: (error: AxiosError<ApiError>) => void;
}) => {
	const queryClient = useQueryClient();
	const { onSuccess, onError } = data;
	return useMutation({
		mutationFn: async (courseId: string) => {
			await sleep(2000);
			const newa = coursesBodyData.filter((course) => course.id !== courseId);
			return newa;
		},
		onSuccess: () => {
			queryClient.invalidateQueries(['courses']);
			onSuccess();
		},
		onError,
	});
};

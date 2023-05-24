import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ApiError } from 'models';
import { deleteCourseByCode } from 'services';

export const useDeleteCourse = (data: {
	onSuccess: () => void;
	onError: (error: ApiError) => void;
}) => {
	const queryClient = useQueryClient();
	const { onSuccess, onError } = data;
	return useMutation({
		mutationFn: async (courseId: string) => {
			return deleteCourseByCode({
				courseCode: courseId,
				orgnizationId: localStorage.getItem('organizationId') || '',
			});
		},
		onSuccess: () => {
			queryClient.invalidateQueries(['courses']);
			onSuccess();
		},
		onError,
	});
};

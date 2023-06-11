import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ApiError } from 'models';
import { toast } from 'react-toastify';
import { deleteCourseByCode } from 'services';
import { useAuth } from 'zustandStore';

export const useDeleteCourse = (data: {
	onSuccess?: () => void;
	onError: (error: ApiError) => void;
}) => {
	const { subDomain } = useAuth();
	const queryClient = useQueryClient();
	const { onSuccess = () => {}, onError } = data;
	return useMutation({
		mutationFn: async (courseId: string) => {
			return deleteCourseByCode({
				courseCode: courseId,
				orgnizationId: subDomain,
			});
		},
		onSuccess: () => {
			queryClient.invalidateQueries(['courses']);
			toast.success('Course Deleted successfully');
			onSuccess();
		},
		onError,
	});
};

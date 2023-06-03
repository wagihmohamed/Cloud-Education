import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ApiError, UpdateCoursePayload } from 'models';
import { addCourseByOrgId } from 'services';

export const useAddCourse = (data: {
	onSuccess: () => void;
	onError: (error: ApiError) => void;
}) => {
	const { onSuccess, onError } = data;
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (course: UpdateCoursePayload) => {
			return addCourseByOrgId({
				course,
				orgnizationId: localStorage.getItem('organizationId') || '',
			});
		},
		onSuccess: () => {
			queryClient.invalidateQueries(['courses']);
			queryClient.invalidateQueries(['coursesCodes']);
			onSuccess();
		},
		onError,
	});
};

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ApiError, UpdateCoursePayload } from 'models';
import { AxiosError } from 'axios';
import { editCourseByCode } from 'services';
import { toast } from 'react-toastify';
import { useAuth } from 'zustandStore';

export const useEditCourse = (data: {
	onSuccess?: () => void;
	onError: (error: AxiosError<ApiError>) => void;
}) => {
	const { subDomain } = useAuth();
	const { onSuccess = () => {}, onError } = data;
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async (course: UpdateCoursePayload) => {
			return editCourseByCode({
				course,
				orgnizationId: subDomain,
				courseCode: course.code,
			});
		},
		onSuccess: () => {
			queryClient.invalidateQueries(['courses']);
			toast.success('Course updated successfully');
			onSuccess();
		},
		onError,
	});
};

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ApiError, CourseItem } from 'models';
import { AxiosError } from 'axios';
import { editCourseByCode } from 'services';
import { toast } from 'react-toastify';

export const useEditCourse = (data: {
	onSuccess?: () => void;
	onError: (error: AxiosError<ApiError>) => void;
}) => {
	const { onSuccess = () => {}, onError } = data;
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async (course: CourseItem) => {
			return editCourseByCode({
				course,
				orgnizationId: localStorage.getItem('organizationId') || '',
				courseCode: course.code,
			});
		},
		onSuccess: () => {
			queryClient.invalidateQueries(['courses']);
			toast.success('Status Changed successfully');
			onSuccess();
		},
		onError,
	});
};

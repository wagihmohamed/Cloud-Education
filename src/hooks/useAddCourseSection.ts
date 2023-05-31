import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ApiError } from 'models';
import { addCourseSectionService } from 'services';

export const useAddCourseSection = (data: {
	onSuccess: () => void;
	onError: (error: ApiError) => void;
}) => {
	const { onSuccess, onError } = data;
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: ({
			title,
			courseCode,
		}: {
			title: string;
			courseCode: string;
		}) => {
			return addCourseSectionService({
				courseCode,
				orgnizationId: localStorage.getItem('organizationId') || '',
				title,
			});
		},
		onSuccess: () => {
			queryClient.invalidateQueries(['courseSections']);
			onSuccess();
		},
		onError: (error: ApiError) => {
			onError(error);
		},
	});
};

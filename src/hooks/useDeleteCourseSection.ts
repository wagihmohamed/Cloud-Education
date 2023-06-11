import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ApiError } from 'models';
import { toast } from 'react-toastify';
import { deleteCourseSectionService } from 'services';
import { useAuth } from 'zustandStore';

export const useDeleteCourseSection = (data: {
	onSuccess?: () => void;
	onError?: (error: ApiError) => void;
}) => {
	const { subDomain } = useAuth();
	const queryClient = useQueryClient();
	const { onSuccess = () => {}, onError = () => {} } = data;
	return useMutation({
		mutationFn: async ({
			courseCode,
			sectionOrder,
		}: {
			courseCode: string;
			sectionOrder: number;
		}) => {
			return deleteCourseSectionService({
				courseCode,
				orgnizationId: subDomain,
				sectionOrder,
			});
		},
		onSuccess: () => {
			queryClient.invalidateQueries(['courseSections']);
			toast.success('Course Deleted successfully');
			onSuccess();
		},
		onError: (error: ApiError) => {
			toast.error(error.response?.data.message || 'Error Deleting Section');
			onError(error);
		},
	});
};

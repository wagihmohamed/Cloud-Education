import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteCommentService } from 'services';
import { toast } from 'react-toastify';
import { ApiError } from 'models';
import { useAuth } from 'zustandStore';

export const useDeleteComment = (data: {
	onSuccess?: () => void;
	onError?: (error: ApiError) => void;
}) => {
	const { subDomain } = useAuth();
	const queryClient = useQueryClient();
	const { onSuccess = () => {}, onError = () => {} } = data;
	return useMutation({
		mutationFn: async ({
			courseCode,
			commentId,
			sectionOrder,
		}: {
			courseCode: string;
			commentId: string;
			sectionOrder: number;
		}) => {
			return deleteCommentService(
				subDomain,
				courseCode,
				sectionOrder,
				commentId
			);
		},
		onSuccess: () => {
			queryClient.invalidateQueries(['comments']);
			toast.success('Comment Deleted successfully');
			onSuccess();
		},
		onError: (error: ApiError) => {
			toast.error(error.response?.data.message || 'Something went wrong');
			onError(error);
		},
	});
};

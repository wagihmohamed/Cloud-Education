import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addCommentByCourseCode } from 'services';
import { ApiError } from 'models';

export const useAddComment = (data: {
	onSuccess?: () => void;
	onError?: (error: ApiError) => void;
}) => {
	const { onSuccess = () => {}, onError = () => {} } = data;
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: ({
			courseCode,
			content,
			sectionOrder,
		}: {
			courseCode: string;
			content: string;
			sectionOrder: number;
		}) => {
			return addCommentByCourseCode({
				courseCode,
				sectionOrder,
				content,
			});
		},
		onSuccess: () => {
			queryClient.invalidateQueries(['comments']);
			onSuccess();
		},
		onError: (error: ApiError) => {
			onError(error);
		},
	});
};

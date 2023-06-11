import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ApiError } from 'models';
import { addCourseSectionService } from 'services';
import { useAuth } from 'zustandStore';

export const useAddCourseSection = (data: {
	onSuccess: () => void;
	onError: (error: ApiError) => void;
}) => {
	const { subDomain } = useAuth();
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
				orgnizationId: subDomain,
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

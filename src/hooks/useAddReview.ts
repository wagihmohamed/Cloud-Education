import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ApiError } from 'models';
import { submitReviewByCourseCode } from 'services';
import { toast } from 'react-toastify';
import { useAuth } from 'zustandStore';

interface AddReviewPayload {
	courseCode: string;
	review: string;
	rating: number;
}

export const useAddReview = ({
	onSuccess,
	invalidateCourseCode,
	sectionOrder,
}: {
	onSuccess: () => void;
	invalidateCourseCode: string;
	sectionOrder: number;
}) => {
	const { subDomain } = useAuth();
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async ({ courseCode, rating, review }: AddReviewPayload) => {
			return submitReviewByCourseCode({
				orgnizationId: subDomain,
				courseCode,
				rating,
				review,
			});
		},
		onSuccess: () => {
			toast.success('Review added successfully');
			queryClient.invalidateQueries([
				'courseContent',
				invalidateCourseCode,
				sectionOrder,
			]);
			onSuccess();
		},
		onError: (err: ApiError) => {
			toast.error(err.response?.data.message || 'Something went wrong');
		},
	});
};

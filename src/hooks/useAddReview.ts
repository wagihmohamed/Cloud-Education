import { useMutation } from '@tanstack/react-query';
import { ApiError } from 'models';
import { submitReviewByCourseCode } from 'services';
import { toast } from 'react-toastify';

interface AddReviewPayload {
	courseCode: string;
	review: string;
	rating: number;
}

export const useAddReview = ({ onSuccess }: { onSuccess: () => void }) => {
	return useMutation({
		mutationFn: async ({ courseCode, rating, review }: AddReviewPayload) => {
			return submitReviewByCourseCode({
				orgnizationId: localStorage.getItem('organizationId') || '',
				courseCode,
				rating,
				review,
			});
		},
		onSuccess: () => {
			toast.success('Review added successfully');
			onSuccess();
		},
		onError: (err: ApiError) => {
			toast.error(err.response?.data.message || 'Something went wrong');
		},
	});
};

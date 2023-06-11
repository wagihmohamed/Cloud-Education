import { useMutation } from '@tanstack/react-query';
import { ApiError } from 'models';
import { Answer, submitAnswer } from 'services';
import { toast } from 'react-toastify';

export const useSubmitAnswer = ({ onSuccess }: { onSuccess?: () => void }) => {
	return useMutation({
		mutationFn: ({ examId, answers }: { examId: string; answers: Answer[] }) =>
			submitAnswer({
				answers,
				examId,
			}),
		onSuccess,
		onError: (error: ApiError) => {
			toast.error(error.response?.data.message || 'Something went wrong');
		},
	});
};

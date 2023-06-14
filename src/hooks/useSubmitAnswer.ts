import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ApiError } from 'models';
import { Answer, submitAnswer } from 'services';
import { toast } from 'react-toastify';
import { useAuth } from 'zustandStore';

export const useSubmitAnswer = ({ onSuccess }: { onSuccess?: () => void }) => {
	const { subDomain } = useAuth();
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: ({ examId, answers }: { examId: string; answers: Answer[] }) =>
			submitAnswer({
				organizationId: subDomain,
				answers,
				examId,
			}),
		onSuccess: () => {
			queryClient.invalidateQueries(['exams']);
			queryClient.invalidateQueries(['notifications']);
			queryClient.invalidateQueries(['examsResults']);
			onSuccess?.();
		},
		onError: (error: ApiError) => {
			toast.error(error.response?.data.message || 'Something went wrong');
		},
	});
};

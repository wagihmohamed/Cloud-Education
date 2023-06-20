import { useMutation } from '@tanstack/react-query';
import { ApiError } from 'models';
import { summarizeTextService } from 'services';
import { toast } from 'react-toastify';

export const useSummarizeText = ({
	onSuccess,
}: {
	onSuccess: (data: string) => void;
}) => {
	return useMutation({
		mutationFn: ({
			text,
			orgnizationId,
			summarizeType,
		}: {
			text: string;
			orgnizationId: string;
			summarizeType: 'format' | 'summarize';
		}) => summarizeTextService({ text, orgnizationId, summarizeType }),
		onSuccess: (data) => {
			onSuccess(data);
		},
		onError: (error: ApiError) => {
			toast.error(error.response?.data?.message || 'Something went wrong');
		},
	});
};
